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
        <section id="promo" class="py-24 border-y border-white/5 bg-[#050505] relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
          <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="text-center mb-16">
              <span class="text-[10px] uppercase tracking-[0.4em] gold-text mb-2 block">Limited Time</span>
              <h2 class="text-3xl font-luxury gold-gradient-text tracking-widest">PENAWARAN EKSKLUSIF</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-10">
              {activePromos.map((promo) => (
                <div class="group relative p-[1px] rounded-sm overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                  <div class="absolute inset-0 gold-gradient-bg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div class="relative bg-black p-10 h-full">
                    <div class="absolute top-6 right-6">
                       <div class="gold-gradient-bg p-[1px]">
                         <div class="bg-black px-4 py-1 text-[10px] font-bold gold-gradient-text uppercase tracking-widest">
                           {promo.discount_text}
                         </div>
                       </div>
                    </div>
                    <h3 class="text-2xl font-luxury mb-4 tracking-wide group-hover:gold-text transition-colors">{promo.title}</h3>
                    <p class="text-gray-500 font-light leading-relaxed">{promo.description}</p>
                    <div class="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                      <span>Claim Offer</span>
                      <svg class="w-3 h-3 translate-y-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                  </div>
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
