import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { Layout } from './layouts/Layout'
import { Hero } from './components/Hero'
import { ProductCard } from './components/ProductCard'
import { Checkout } from './pages/Checkout'
import { getSiteData } from './lib/data'
import admin from './routes/admin'

type Bindings = {
  BUCKET: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  if (err.message) console.error(`[Error]: ${err.message}`)
  return c.html(
    <Layout title="Error">
      <div class="py-20 text-center">
        <h1 class="text-2xl gold-text mb-4">Ups! Terjadi Kesalahan</h1>
        <p class="text-gray-400 max-w-md mx-auto">
          Internal Server Error. Mohon pastikan Bucket R2 bernama <code>nenas</code> sudah dibuat dan siap digunakan.
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

  // Security: Prevent access to site_data.json via image route
  if (key === 'site_data.json') {
    throw new HTTPException(403, { message: 'Forbidden' })
  }

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
  const data = await getSiteData(c.env.BUCKET)
  const products = data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const activePromos = data.promos.filter(p => p.is_active)
  const settings = data.settings

  return c.html(
    <Layout
      title="Premium Pineapple Collection"
      address={settings.address}
      phone={settings.contact_phone}
    >
      <Hero />

      {activePromos.length > 0 && (
        <section id="promo" class="bg-gray-950 py-12 border-y border-gray-900">
          <div class="max-w-6xl mx-auto px-6">
            <div class="flex items-center space-x-4 mb-8">
              <div class="h-px bg-yellow-600 flex-1"></div>
              <h2 class="text-2xl font-luxury gold-text uppercase tracking-widest text-center">Special Promos</h2>
              <div class="h-px bg-yellow-600 flex-1"></div>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
              {activePromos.map((promo) => (
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

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map((p) => <ProductCard {...p} />)
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
  const data = await getSiteData(c.env.BUCKET)
  const product = data.products.find(p => p.id === id)

  if (!product) {
    return c.notFound()
  }

  return c.html(<Checkout product={product as any} siteSettings={data.settings as any} />)
})

// Admin routes
app.route('/admin', admin)

export default app
