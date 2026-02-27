import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { Layout } from './layouts/Layout'
import { Hero } from './components/Hero'
import { ProductCard } from './components/ProductCard'
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
        <h1 class="text-2xl text-pineapple-600 mb-4 font-display">Ups! Terjadi Kesalahan</h1>
        <p class="text-gray-500 max-w-md mx-auto">
          Internal Server Error. Mohon pastikan Bucket R2 bernama <code>nenas</code> sudah dibuat dan siap digunakan.
        </p>
        <a href="/" class="mt-8 inline-block bg-pineapple-500 text-white px-6 py-2 rounded-full">Coba Lagi</a>
      </div>
    </Layout>,
    500
  )
})

// Serve images from R2
app.get('/image/:key', async (c) => {
  const key = c.req.param('key')
  if (key === 'site_data.json') {
    throw new HTTPException(403, { message: 'Forbidden' })
  }
  const object = await c.env.BUCKET.get(key)
  if (!object) return c.notFound()
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  return new Response(object.body, { headers })
})

// Home Page
app.get('/', async (c) => {
  const data = await getSiteData(c.env.BUCKET)
  const products = data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const settings = data.settings

  return c.html(
    <Layout
      title="Fresh & Organic Fruit Collection"
      address={settings.address}
      phone={settings.contact_phone}
    >
      <Hero />

      {/* Features Banner */}
      <div class="bg-gradient-to-r from-pineapple-500 to-pineapple-600 py-8 relative overflow-hidden">
          <div class="absolute inset-0 bg-black opacity-10"></div>
          <div class="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              <div class="flex flex-col items-center">
                  <i class="fas fa-leaf text-3xl mb-2"></i>
                  <span class="font-semibold">100% Organik</span>
              </div>
              <div class="flex flex-col items-center">
                  <i class="fas fa-clock text-3xl mb-2"></i>
                  <span class="font-semibold">Petik & Kirim</span>
              </div>
              <div class="flex flex-col items-center">
                  <i class="fas fa-shield-alt text-3xl mb-2"></i>
                  <span class="font-semibold">Jaminan Segar</span>
              </div>
              <div class="flex flex-col items-center">
                  <i class="fas fa-headset text-3xl mb-2"></i>
                  <span class="font-semibold">Layanan 24/7</span>
              </div>
          </div>
      </div>

      {/* Products Section */}
      <section id="products" class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center mb-16">
                  <span class="text-pineapple-600 font-semibold tracking-wider uppercase">Katalog Produk</span>
                  <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2">Pilihan Buah Terbaik</h2>
                  <p class="text-gray-600 mt-4 max-w-2xl mx-auto">Dipetik langsung dari kebun terbaik Indonesia dengan standar kualitas ekspor</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                  products.map((p) => <ProductCard {...p} />)
                ) : (
                  <div class="col-span-full text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-3xl">
                    Belum ada produk yang ditampilkan.
                  </div>
                )}
              </div>
          </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" class="py-20 bg-pineapple-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="grid md:grid-cols-2 gap-16 items-center">
                  <div class="relative">
                      <div class="absolute -inset-4 bg-gradient-to-r from-pineapple-400 to-fresh-green-400 rounded-3xl opacity-20 blur-2xl"></div>
                      <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop" alt="Fresh Fruits" class="relative rounded-3xl shadow-2xl w-full" />

                      <div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                          <div class="text-4xl font-bold text-pineapple-600">10+</div>
                          <div class="text-gray-600 text-sm">Tahun Pengalaman</div>
                      </div>
                  </div>

                  <div>
                      <span class="text-pineapple-600 font-semibold tracking-wider uppercase">Mengapa Memilih Kami</span>
                      <h2 class="font-display text-4xl font-bold text-gray-900 mt-2 mb-6">Komitmen Kami untuk Kesegaran</h2>
                      <p class="text-gray-600 mb-8 leading-relaxed">
                          SUJUD NANAS berdedikasi untuk menyediakan buah-buahan terbaik dengan standar kualitas tertinggi. Kami bekerja sama langsung dengan petani lokal untuk memastikan setiap buah yang sampai ke tangan Anda adalah yang terbaik.
                      </p>

                      <div class="space-y-6">
                          <div class="flex items-start space-x-4">
                              <div class="w-12 h-12 bg-pineapple-100 rounded-xl flex items-center justify-center text-pineapple-600 flex-shrink-0">
                                  <i class="fas fa-check-circle text-xl"></i>
                              </div>
                              <div>
                                  <h4 class="font-bold text-lg text-gray-900">Kualitas Premium</h4>
                                  <p class="text-gray-600">Setiap buah melalui proses seleksi ketat sebelum dikirim ke pelanggan</p>
                              </div>
                          </div>
                          <div class="flex items-start space-x-4">
                              <div class="w-12 h-12 bg-pineapple-100 rounded-xl flex items-center justify-center text-pineapple-600 flex-shrink-0">
                                  <i class="fas fa-truck-fast text-xl"></i>
                              </div>
                              <div>
                                  <h4 class="font-bold text-lg text-gray-900">Pengiriman Cepat</h4>
                                  <p class="text-gray-600">Pengiriman dalam 24 jam untuk menjaga kesegaran maksimal</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center mb-16">
                  <span class="text-pineapple-600 font-semibold tracking-wider uppercase">Testimoni</span>
                  <h2 class="font-display text-4xl font-bold text-gray-900 mt-2">Apa Kata Pelanggan Kami</h2>
              </div>

              <div class="grid md:grid-cols-3 gap-8">
                  <div class="bg-gray-50 p-8 rounded-3xl relative">
                      <div class="text-pineapple-500 text-4xl absolute top-4 left-4 opacity-30">"</div>
                      <div class="flex text-yellow-400 mb-4">
                          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                      </div>
                      <p class="text-gray-600 mb-6 relative z-10">Nanasnya manis banget dan segar! Pengirimannya juga cepat, packing rapi. Pasti akan order lagi untuk acara keluarga.</p>
                      <div class="flex items-center">
                          <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">SB</div>
                          <div class="ml-4">
                              <div class="font-bold text-gray-900">Siti Badriah</div>
                              <div class="text-sm text-gray-500">Jakarta Selatan</div>
                          </div>
                      </div>
                  </div>
                  <div class="bg-gray-50 p-8 rounded-3xl relative">
                      <div class="text-pineapple-500 text-4xl absolute top-4 left-4 opacity-30">"</div>
                      <div class="flex text-yellow-400 mb-4">
                          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                      </div>
                      <p class="text-gray-600 mb-6 relative z-10">Mangga harum manisnya benar-benar harum dan manis! Kualitas konsisten setiap pembelian.</p>
                      <div class="flex items-center">
                          <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">AR</div>
                          <div class="ml-4">
                              <div class="font-bold text-gray-900">Ahmad Rizki</div>
                              <div class="text-sm text-gray-500">Bandung</div>
                          </div>
                      </div>
                  </div>
                  <div class="bg-gray-50 p-8 rounded-3xl relative">
                      <div class="text-pineapple-500 text-4xl absolute top-4 left-4 opacity-30">"</div>
                      <div class="flex text-yellow-400 mb-4">
                          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                      </div>
                      <p class="text-gray-600 mb-6 relative z-10">Paket mix buah sangat worth it! Variasinya lengkap dan semua buah dalam kondisi sempurna.</p>
                      <div class="flex items-center">
                          <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 font-bold">DW</div>
                          <div class="ml-4">
                              <div class="font-bold text-gray-900">Dewi Wulandari</div>
                              <div class="text-sm text-gray-500">Surabaya</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-br from-pineapple-500 to-pineapple-600 relative overflow-hidden">
          <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>

          <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-6">Siap Menikmati Buah Segar?</h2>
              <p class="text-pineapple-100 text-xl mb-8">Pesan sekarang dan dapatkan gratis ongkir untuk pembelian pertama Anda!</p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center" id="kontak">
                  <a href={`https://wa.me/${settings.contact_phone.replace(/\+/g, '').replace(/\s/g, '')}`} target="_blank" class="bg-white text-pineapple-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition">
                      <i class="fab fa-whatsapp mr-2"></i>Pesan via WhatsApp
                  </a>
                  <a href="#products" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-pineapple-600 transition">
                      Lihat Katalog
                  </a>
              </div>
          </div>
      </section>

    </Layout>
  )
})

// Admin routes
app.route('/admin', admin)

export default app
