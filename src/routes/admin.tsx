import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { csrf } from 'hono/csrf'
import { Layout } from '../layouts/Layout'
import { getSiteData, saveSiteData, Product, Promo } from '../lib/data'

type Bindings = {
  BUCKET: R2Bucket
  ADMIN_PASSWORD?: string
}

const admin = new Hono<{ Bindings: Bindings }>()

// CSRF Protection
admin.use('*', csrf())

// Basic Auth Middleware
admin.use('*', async (c, next) => {
  const data = await getSiteData(c.env.BUCKET)
  const password = data.settings.admin_password || c.env.ADMIN_PASSWORD || 'sujudnanaspassword'

  const auth = basicAuth({
    username: 'admin',
    password: password,
  })
  return auth(c, next)
})

// Admin Dashboard
admin.get('/', async (c) => {
  const data = await getSiteData(c.env.BUCKET)
  const settings = data.settings

  return c.html(
    <Layout
      title="Admin Dashboard"
      address={settings.address}
      phone={settings.contact_phone}
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
              {data.products.map((p) => (
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
                {data.promos.map((p) => (
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
                {Object.entries(settings).filter(([key]) => key !== 'admin_password').map(([key, value]) => (
                  <div key={key}>
                    <label class="block text-xs text-gray-500 mb-1">{key}</label>
                    <input type="text" name={key} defaultValue={value} class="w-full bg-black border border-gray-700 p-2 rounded" />
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
  const image = body['image'] as File

  let imageKey = ''
  if (image && image.size > 0) {
    imageKey = `${Date.now()}-${image.name}`
    await c.env.BUCKET.put(imageKey, image)
  }

  const data = await getSiteData(c.env.BUCKET)
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    name: body['name'] as string,
    price: parseFloat(body['price'] as string),
    type: body['type'] as string,
    size: body['size'] as string,
    description: body['description'] as string,
    image_key: imageKey,
    created_at: new Date().toISOString()
  }

  data.products.push(newProduct)
  await saveSiteData(c.env.BUCKET, data)

  return c.redirect('/admin')
})

admin.post('/product/delete/:id', async (c) => {
  const id = c.req.param('id')
  const data = await getSiteData(c.env.BUCKET)

  const productIndex = data.products.findIndex(p => p.id === id)
  if (productIndex !== -1) {
    const product = data.products[productIndex]
    if (product.image_key) {
      await c.env.BUCKET.delete(product.image_key)
    }
    data.products.splice(productIndex, 1)
    await saveSiteData(c.env.BUCKET, data)
  }

  return c.redirect('/admin')
})

admin.post('/promo', async (c) => {
  const body = await c.req.parseBody()
  const data = await getSiteData(c.env.BUCKET)

  const newPromo: Promo = {
    id: Math.random().toString(36).substr(2, 9),
    title: body['title'] as string,
    discount_text: body['discount_text'] as string,
    is_active: true
  }

  data.promos.push(newPromo)
  await saveSiteData(c.env.BUCKET, data)

  return c.redirect('/admin')
})

admin.post('/promo/delete/:id', async (c) => {
  const id = c.req.param('id')
  const data = await getSiteData(c.env.BUCKET)

  data.promos = data.promos.filter(p => p.id !== id)
  await saveSiteData(c.env.BUCKET, data)

  return c.redirect('/admin')
})

admin.post('/settings', async (c) => {
  const body = await c.req.parseBody()
  const data = await getSiteData(c.env.BUCKET)

  for (const key in body) {
    if (key !== 'admin_password') {
      data.settings[key] = body[key] as string
    }
  }

  await saveSiteData(c.env.BUCKET, data)
  return c.redirect('/admin')
})

admin.post('/change-password', async (c) => {
  const body = await c.req.parseBody()
  const newPassword = body['new_password'] as string

  if (newPassword) {
    const data = await getSiteData(c.env.BUCKET)
    data.settings.admin_password = newPassword
    await saveSiteData(c.env.BUCKET, data)
  }

  return c.redirect('/admin')
})

export default admin
