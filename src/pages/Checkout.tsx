import { Layout } from '../layouts/Layout'

interface CheckoutProps {
  product: {
    id: number
    name: string
    price: number
    image_key?: string
    type?: string
    size?: string
  }
  siteSettings: {
    address: string
    contact_phone: string
  }
}

export const Checkout = ({ product, siteSettings }: CheckoutProps) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(product.price)

  const contactPhone = siteSettings.contact_phone || ''

  return (
    <Layout
      title={`Checkout - ${product.name}`}
      address={siteSettings.address}
      phone={siteSettings.contact_phone}
    >
      <div class="max-w-4xl mx-auto p-6 pt-16">
        <h1 class="text-3xl font-luxury gold-text mb-8 text-center">Konfirmasi Pesanan</h1>

        <div class="grid md:grid-cols-2 gap-12 bg-gray-900 p-8 rounded border border-gray-800">
          {/* Product Summary */}
          <div>
            <h2 class="text-xl gold-text mb-6 border-b border-gray-800 pb-2 font-luxury">Ringkasan Produk</h2>
            <div class="flex gap-4 mb-6">
              {product.image_key ? (
                <img src={`/image/${product.image_key}`} alt={product.name} class="w-24 h-24 object-cover rounded border border-gray-800" />
              ) : (
                <div class="w-24 h-24 bg-black border border-gray-800 flex items-center justify-center text-gray-700 text-xs text-center p-2 rounded">
                  No Image
                </div>
              )}
              <div>
                <h3 class="text-lg font-bold">{product.name}</h3>
                <p class="text-gray-400 text-sm">{product.type || 'Nenas Premium'}</p>
                <p class="text-gray-400 text-sm">Ukuran: {product.size || 'Standar'}</p>
              </div>
            </div>

            <div class="space-y-2 border-t border-gray-800 pt-4">
              <div class="flex justify-between text-gray-400">
                <span>Harga Satuan</span>
                <span>{formattedPrice}</span>
              </div>
              <div class="flex justify-between text-gray-400">
                <span>Jumlah</span>
                <span>1</span>
              </div>
              <div class="flex justify-between text-xl gold-text font-luxury pt-4 border-t border-gray-800">
                <span>Total</span>
                <span>{formattedPrice}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h2 class="text-xl gold-text mb-6 border-b border-gray-800 pb-2 font-luxury">Informasi Pengiriman</h2>
            <form action={`https://wa.me/${contactPhone.replace(/\+/g, '').replace(/\s/g, '')}`} method="GET" target="_blank" class="space-y-4">
              {/* Hidden text for WhatsApp redirect logic if handled via client or just use direct link */}
              <div>
                <label class="block text-xs text-gray-500 mb-1">Nama Lengkap</label>
                <input type="text" name="name" class="w-full bg-black border border-gray-700 p-2 rounded" required />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Alamat Lengkap</label>
                <textarea name="address" class="w-full bg-black border border-gray-700 p-2 rounded h-20" required></textarea>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Catatan (Opsional)</label>
                <input type="text" name="notes" class="w-full bg-black border border-gray-700 p-2 rounded" />
              </div>

              <button
                type="button"
                onclick={`
                  const name = document.querySelector('input[name="name"]').value;
                  const addr = document.querySelector('textarea[name="address"]').value;
                  const notes = document.querySelector('input[name="notes"]').value;
                  if(!name || !addr) return alert('Mohon lengkapi data pengiriman');
                  const text = 'Halo SUJUD NANAS, saya ingin memesan:\\n\\n' +
                               'Produk: ${product.name}\\n' +
                               'Harga: ${formattedPrice}\\n\\n' +
                               'Nama: ' + name + '\\n' +
                               'Alamat: ' + addr + '\\n' +
                               'Catatan: ' + notes;
                  window.open('https://wa.me/${contactPhone.replace(/\+/g, '').replace(/\s/g, '')}?text=' + encodeURIComponent(text), '_blank');
                `}
                class="w-full gold-bg text-black font-bold py-3 rounded mt-4 hover:brightness-110 transition uppercase tracking-widest text-sm"
              >
                Pesan via WhatsApp
              </button>
              <p class="text-[10px] text-gray-500 text-center mt-2 italic">
                *Anda akan diarahkan ke WhatsApp untuk menyelesaikan pembayaran dan konfirmasi pengiriman.
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
