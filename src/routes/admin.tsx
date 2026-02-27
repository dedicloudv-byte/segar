import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { csrf } from 'hono/csrf'
import { Layout } from '../layouts/Layout'

type Bindings = {
  DB: D1Database
  BUCKET: R2Bucket
  ADMIN_PASSWORD?: string
}

const admin = new Hono<{ Bindings: Bindings }>()

// CSRF Protection
admin.use('*', csrf())

// Basic Auth Middleware
admin.use('*', async (c, next) => {
  const dbPassword = await c.env.DB.prepare('SELECT value FROM settings WHERE key = ?')
    .bind('admin_password')
    .first('value') as string | null

  const password = dbPassword || c.env.ADMIN_PASSWORD || 'sujudnanaspassword'

  const auth = basicAuth({
    username: 'admin',
    password: password,
  })
  return auth(c, next)
})

// Admin Dashboard
admin.get('/', async (c) => {
  const { results: products } = await c.env.DB.prepare('SELECT * FROM products').all()
  const { results: promos } = await c.env.DB.prepare('SELECT * FROM promos').all()
  const { results: settings } = await c.env.DB.prepare('SELECT * FROM settings').all()

  const siteSettings = settings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  return c.html(
    <Layout
      title="Admin Dashboard"
      address={siteSettings.address}
      phone={siteSettings.contact_phone}
    >
      <div class="max-w-6xl mx-auto p-6 pt-10">
        <h1 class="text-3xl font-luxury gold-text mb-8">Admin Dashboard</h1>

        <div class="grid md:grid-cols-2 gap-12">
          {/* Products Management */}
          <div class="bg-gray-900 p-6 rounded border border-gray-800">
            <h2 class="text-xl gold-text mb-4 border-b border-gray-800 pb-2">Kelola Produk</h2>
            <form action="/admin/product" method="POST" enctype="multipart/form-data" class="space-y-4 mb-8">
              <input type="text" name="name" placeholder="Nama Produk" class="w-full bg-black border border-gray-700 p-2 rounded" required />
              <div class="grid grid-cols-2 gap-4">
                <input type="number" name="price" placeholder="Harga" class="bg-black border border-gray-700 p-2 rounded" required />
                <input type="text" name="type" placeholder="Jenis (misal: Nenas Madu)" class="bg-black border border-gray-700 p-2 rounded" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <input type="text" name="size" placeholder="Ukuran (misal: Besar / 1kg)" class="bg-black border border-gray-700 p-2 rounded" />
                <input type="file" name="image" class="bg-black border border-gray-700 p-1 rounded text-xs" />
              </div>
              <textarea name="description" placeholder="Deskripsi" class="w-full bg-black border border-gray-700 p-2 rounded h-20"></textarea>
              <button type="submit" class="w-full gold-bg text-black font-bold py-2 rounded">Tambah Produk</button>
            </form>

            <div class="space-y-2">
              {products.map((p: any) => (
                <div class="flex justify-between items-center bg-black p-3 rounded border border-gray-800">
                  <span>{p.name}</span>
                  <form action={`/admin/product/delete/${p.id}`} method="POST">
                    <button class="text-red-500 text-xs hover:underline">Hapus</button>
                  </form>
                </div>
              ))}
            </div>
          </div>

          {/* Promos & Settings */}
          <div class="space-y-8">
            <div class="bg-gray-900 p-6 rounded border border-gray-800">
              <h2 class="text-xl gold-text mb-4 border-b border-gray-800 pb-2">Kelola Promo</h2>
              <form action="/admin/promo" method="POST" class="space-y-4 mb-6">
                <input type="text" name="title" placeholder="Judul Promo" class="w-full bg-black border border-gray-700 p-2 rounded" required />
                <input type="text" name="discount_text" placeholder="Teks Diskon (misal: Hemat 20%)" class="w-full bg-black border border-gray-700 p-2 rounded" />
                <button type="submit" class="w-full border gold-border gold-text py-2 rounded">Tambah Promo</button>
              </form>
               <div class="space-y-2">
                {promos.map((p: any) => (
                  <div class="flex justify-between items-center bg-black p-3 rounded border border-gray-800">
                    <span>{p.title}</span>
                    <form action={`/admin/promo/delete/${p.id}`} method="POST">
                      <button class="text-red-500 text-xs hover:underline">Hapus</button>
                    </form>
                  </div>
                ))}
              </div>
            </div>

            <div class="bg-gray-900 p-6 rounded border border-gray-800">
              <h2 class="text-xl gold-text mb-4 border-b border-gray-800 pb-2">Pengaturan Situs</h2>
              <form action="/admin/settings" method="POST" class="space-y-4">
                {settings.filter((s: any) => s.key !== 'admin_password').map((s: any) => (
                  <div key={s.key}>
                    <label class="block text-xs text-gray-500 mb-1">{s.key}</label>
                    <input type="text" name={s.key} defaultValue={s.value} class="w-full bg-black border border-gray-700 p-2 rounded" />
                  </div>
                ))}
                <button type="submit" class="w-full bg-gray-800 py-2 rounded hover:bg-gray-700 transition">Simpan Pengaturan</button>
              </form>
            </div>

            <div class="bg-gray-900 p-6 rounded border border-gray-800">
              <h2 class="text-xl gold-text mb-4 border-b border-gray-800 pb-2">Ubah Kata Sandi Admin</h2>
              <form action="/admin/change-password" method="POST" class="space-y-4">
                <input type="password" name="new_password" placeholder="Kata Sandi Baru" class="w-full bg-black border border-gray-700 p-2 rounded" required />
                <button type="submit" class="w-full border border-red-900 text-red-500 py-2 rounded hover:bg-red-950 transition">Perbarui Kata Sandi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
})

// Handlers
admin.post('/product', async (c) => {
  const body = await c.req.parseBody()
  const name = body['name'] as string
  const price = parseFloat(body['price'] as string)
  const type = body['type'] as string
  const size = body['size'] as string
  const description = body['description'] as string
  const image = body['image'] as File

  let imageKey = ''
  if (image && image.size > 0) {
    imageKey = `${Date.now()}-${image.name}`
    await c.env.BUCKET.put(imageKey, image)
  }

  await c.env.DB.prepare(
    'INSERT INTO products (name, price, type, size, description, image_key) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(name, price, type, size, description, imageKey).run()

  return c.redirect('/admin')
})

admin.post('/product/delete/:id', async (c) => {
  const id = c.req.param('id')

  // Get image key to delete from R2 as well
  const product = await c.env.DB.prepare('SELECT image_key FROM products WHERE id = ?').bind(id).first() as any
  if (product?.image_key) {
    await c.env.BUCKET.delete(product.image_key)
  }

  await c.env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run()
  return c.redirect('/admin')
})

admin.post('/promo', async (c) => {
  const body = await c.req.parseBody()
  const title = body['title'] as string
  const discount_text = body['discount_text'] as string

  await c.env.DB.prepare(
    'INSERT INTO promos (title, discount_text) VALUES (?, ?)'
  ).bind(title, discount_text).run()

  return c.redirect('/admin')
})

admin.post('/promo/delete/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM promos WHERE id = ?').bind(id).run()
  return c.redirect('/admin')
})

admin.post('/settings', async (c) => {
  const body = await c.req.parseBody()

  for (const key in body) {
    if (key !== 'admin_password') {
      await c.env.DB.prepare('UPDATE settings SET value = ? WHERE key = ?').bind(body[key], key).run()
    }
  }

  return c.redirect('/admin')
})

admin.post('/change-password', async (c) => {
  const body = await c.req.parseBody()
  const newPassword = body['new_password'] as string

  if (newPassword) {
    await c.env.DB.prepare('UPDATE settings SET value = ? WHERE key = ?')
      .bind(newPassword, 'admin_password')
      .run()
  }

  return c.redirect('/admin')
})

export default admin
