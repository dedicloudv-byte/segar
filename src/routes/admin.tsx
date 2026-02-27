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
        <h1 class="text-3xl font-display text-gray-900 mb-8 border-b-4 border-pineapple-500 inline-block">Admin Dashboard</h1>

        <div class="grid md:grid-cols-2 gap-12">
          {/* Products Management */}
          <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <i class="fas fa-box-open mr-2 text-pineapple-600"></i> Kelola Produk
            </h2>
            <form action="/admin/product" method="POST" enctype="multipart/form-data" class="space-y-4 mb-8">
              <input type="text" name="name" placeholder="Nama Produk" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-pineapple-500 outline-none" required />
              <div class="grid grid-cols-2 gap-4">
                <input type="number" name="price" placeholder="Harga" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-pineapple-500 outline-none" required />
                <input type="text" name="type" placeholder="Jenis (misal: Nenas Madu)" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-pineapple-500 outline-none" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <input type="text" name="size" placeholder="Ukuran (misal: Besar / 1kg)" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-pineapple-500 outline-none" />
                <div class="relative">
                    <input type="file" name="image" class="w-full bg-gray-50 border border-gray-200 p-2 rounded-xl text-xs" />
                </div>
              </div>
              <textarea name="description" placeholder="Deskripsi Singkat" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl h-24 focus:ring-2 focus:ring-pineapple-500 outline-none"></textarea>
              <button type="submit" class="w-full bg-pineapple-500 hover:bg-pineapple-600 text-white font-bold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]">
                  <i class="fas fa-plus-circle mr-2"></i> Tambah Produk
              </button>
            </form>

            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Daftar Produk</h3>
              {data.products.map((p) => (
                <div class="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:border-pineapple-200 transition">
                  <span class="font-medium text-gray-700">{p.name}</span>
                  <form action={`/admin/product/delete/${p.id}`} method="POST">
                    <button class="text-gray-400 hover:text-red-500 transition-colors">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>

          {/* Promos & Settings */}
          <div class="space-y-8">
            <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i class="fas fa-bullhorn mr-2 text-pineapple-600"></i> Kelola Promo
              </h2>
              <form action="/admin/promo" method="POST" class="space-y-4 mb-6">
                <input type="text" name="title" placeholder="Judul Promo" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-pineapple-500" required />
                <input type="text" name="discount_text" placeholder="Teks Diskon (misal: Hemat 20%)" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-pineapple-500" />
                <button type="submit" class="w-full border-2 border-pineapple-500 text-pineapple-600 hover:bg-pineapple-500 hover:text-white font-bold py-3 rounded-xl transition">
                    Aktifkan Promo Baru
                </button>
              </form>
               <div class="space-y-2">
                {data.promos.map((p) => (
                  <div class="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span class="text-gray-700">{p.title}</span>
                    <form action={`/admin/promo/delete/${p.id}`} method="POST">
                      <button class="text-red-400 hover:text-red-600 transition"><i class="fas fa-times-circle"></i></button>
                    </form>
                  </div>
                ))}
              </div>
            </div>

            <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i class="fas fa-cog mr-2 text-pineapple-600"></i> Pengaturan Situs
              </h2>
              <form action="/admin/settings" method="POST" class="space-y-4">
                {Object.entries(settings).filter(([key]) => key !== 'admin_password').map(([key, value]) => (
                  <div key={key}>
                    <label class="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{key.replace('_', ' ')}</label>
                    <input type="text" name={key} defaultValue={value} class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-pineapple-500" />
                  </div>
                ))}
                <button type="submit" class="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition shadow-lg">
                    Simpan Perubahan
                </button>
              </form>
            </div>

            <div class="bg-white p-8 rounded-3xl shadow-lg border border-red-50">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <i class="fas fa-lock mr-2 text-red-500"></i> Keamanan
              </h2>
              <form action="/admin/change-password" method="POST" class="space-y-4">
                <input type="password" name="new_password" placeholder="Kata Sandi Admin Baru" class="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500" required />
                <button type="submit" class="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 rounded-xl transition">
                    Perbarui Kata Sandi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
})

// Handlers (remain unchanged for logic)
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
