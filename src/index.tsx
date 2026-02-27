import { Hono } from 'hono'
import { Layout } from './layouts/Layout'
import { Hero } from './components/Hero'
import { ProductCard } from './components/ProductCard'
import { Checkout } from './pages/Checkout'
import admin from './routes/admin'

type Bindings = {
  DB: D1Database
  BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.onError((err, c) => {
  console.error(`[Error]: ${err.message}`)
  return c.html(
    <Layout title="Error">
      <div class="py-20 text-center">
        <h1 class="text-2xl gold-text mb-4">Ups! Terjadi Kesalahan</h1>
        <p class="text-gray-400 max-w-md mx-auto">
          Internal Server Error. Mohon pastikan:
          <br/>1. Database D1 sudah dibuat dan ID-nya benar di <code>wrangler.toml</code>.
          <br/>2. Tabel sudah diinisialisasi dengan <code>wrangler d1 execute sujud_nanas_db --remote --file=src/db/schema.sql</code>.
          <br/>3. Bucket R2 bernama <code>nenas</code> sudah dibuat.
        </p>
        <a href="/" class="mt-8 inline-block gold-text border gold-border px-6 py-2 rounded">Coba Lagi</a>
      </div>
    </Layout>,
    500
  )
})

// Serve images from R2
app.get('/image/:key', async (c) => {
  const key = c.req.param('key')
  const object = await c.env.BUCKET.get(key)

  if (!object) {
    return c.notFound()
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)

  return new Response(object.body, {
    headers,
  })
})

// Home Page
app.get('/', async (c) => {
  const { results: products } = await c.env.DB.prepare(
    'SELECT * FROM products ORDER BY created_at DESC'
  ).all()

  const { results: promos } = await c.env.DB.prepare(
    'SELECT * FROM promos WHERE is_active = 1'
  ).all()

  const { results: settings } = await c.env.DB.prepare(
    'SELECT * FROM settings'
  ).all()

  const siteSettings = settings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  return c.html(
    <Layout title="Premium Pineapple Collection" address={siteSettings.address} phone={siteSettings.contact_phone}>
      <Hero />

      {promos.length > 0 && (
        <section id="promo" class="bg-gray-950 py-12 border-y border-gray-900">
          <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center space-x-4 mb-8">
              <div class="h-px bg-yellow-600 flex-1"></div>
              <h2 class="text-2xl font-luxury gold-text uppercase tracking-widest text-center">Special Promos</h2>
              <div class="h-px bg-yellow-600 flex-1"></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              {promos.map((promo: any) => (
                <div class="border border-yellow-600/30 p-8 rounded-lg relative overflow-hidden bg-black group">
                  <div class="absolute top-0 right-0 gold-bg text-black px-4 py-1 text-sm font-bold">
                    {promo.discount_text}
                  </div>
                  <h3 class="text-2xl font-luxury mb-2">{promo.title}</h3>
                  <p class="text-gray-400">{promo.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="produk" class="py-24 max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-luxury gold-text mb-4">Koleksi Nenas Premium</h2>
          <p class="text-gray-400">Pilihan terbaik untuk kelezatan yang tak tertandingi</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.length > 0 ? (
            products.map((p: any) => <ProductCard {...p} />)
          ) : (
            <div class="col-span-full text-center py-20 text-gray-600 border border-dashed border-gray-800">
              Belum ada produk yang ditampilkan.
            </div>
          )}
        </div>
      </section>

    </Layout>
  )
})

// Checkout Page
app.get('/checkout/:id', async (c) => {
  const id = c.req.param('id')
  const product = await c.env.DB.prepare('SELECT * FROM products WHERE id = ?').bind(id).first() as any

  if (!product) {
    return c.notFound()
  }

  const { results: settings } = await c.env.DB.prepare('SELECT * FROM settings').all()
  const siteSettings = settings.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  return c.html(<Checkout product={product} siteSettings={siteSettings} />)
})

// Admin routes
app.route('/admin', admin)

export default app
