import { Layout } from '../layouts/Layout'

interface CheckoutProps {
  product: {
    id: string
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
  const contactPhone = siteSettings.contact_phone || ''

  return (
    <Layout
      title={`Beli ${product.name}`}
      address={siteSettings.address}
      phone={siteSettings.contact_phone}
    >
      <div class="max-w-5xl mx-auto p-4 md:p-10 pt-12">
        <div class="mb-10 text-center">
            <h1 class="text-4xl font-luxury gold-text">Detail Pesanan</h1>
            <p class="text-gray-500 text-sm mt-2">Selesaikan pesanan nenas premium Anda</p>
        </div>

        <div class="grid md:grid-cols-12 gap-8 items-start">
          {/* Left: Product Info */}
          <div class="md:col-span-7 space-y-6">
            <div class="bg-[#111] p-6 rounded-lg border border-gray-800 shadow-2xl">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="w-full md:w-48 aspect-square overflow-hidden rounded bg-black border border-gray-800">
                        {product.image_key ? (
                            <img src={`/image/${product.image_key}`} alt={product.name} class="w-full h-full object-cover" />
                        ) : (
                            <div class="w-full h-full flex items-center justify-center text-gray-700 italic text-xs">No Image</div>
                        )}
                    </div>
                    <div class="flex-1">
                        <span class="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">{product.type || 'Nenas Premium'}</span>
                        <h2 class="text-2xl font-luxury text-white mb-2">{product.name}</h2>
                        <div class="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                            <span>Ukuran: <b class="text-gray-200">{product.size || 'L'}</b></span>
                            <span class="w-1 h-1 bg-gray-700 rounded-full"></span>
                            <span>Kualitas: <b class="text-gray-200">Export</b></span>
                        </div>
                        <p class="text-3xl font-bold text-white tracking-tighter">
                            Rp {product.price.toLocaleString('id-ID')} <span class="text-xs font-normal text-gray-500 italic">/ pcs</span>
                        </p>
                    </div>
                </div>

                <div class="mt-8 pt-8 border-t border-gray-800">
                    <h4 class="text-xs uppercase gold-text tracking-widest font-bold mb-4">Jumlah Pesanan</h4>
                    <div class="flex items-center space-x-4 bg-black w-fit p-1 rounded-full border border-gray-800">
                        <button
                            type="button"
                            onclick="window.decrementQty()"
                            class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-900 text-xl font-bold transition"
                        >–</button>
                        <input
                            id="qty"
                            type="number"
                            value="1"
                            readonly
                            class="bg-transparent w-12 text-center text-lg font-bold outline-none"
                        />
                        <button
                            type="button"
                            onclick="window.incrementQty()"
                            class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-900 text-xl font-bold transition"
                        >+</button>
                    </div>
                </div>
            </div>

            <div class="bg-[#111] p-6 rounded-lg border border-gray-800">
                <h3 class="text-lg font-luxury gold-text mb-4">Kenapa memilih SUJUD NANAS?</h3>
                <ul class="grid grid-cols-2 gap-4 text-[11px] text-gray-400">
                    <li class="flex items-center space-x-2">
                        <span class="text-[#D4AF37]">✓</span>
                        <span>Dipetik Segar dari Kebun</span>
                    </li>
                    <li class="flex items-center space-x-2">
                        <span class="text-[#D4AF37]">✓</span>
                        <span>Kandungan Gula Alami Tinggi</span>
                    </li>
                    <li class="flex items-center space-x-2">
                        <span class="text-[#D4AF37]">✓</span>
                        <span>Tanpa Pestisida Kimia Berlebih</span>
                    </li>
                    <li class="flex items-center space-x-2">
                        <span class="text-[#D4AF37]">✓</span>
                        <span>Dikemas Secara Eksklusif</span>
                    </li>
                </ul>
            </div>
          </div>

          {/* Right: Checkout Sidebar */}
          <div class="md:col-span-5">
            <div class="bg-[#D4AF37] p-8 rounded-lg text-black sticky top-24">
                <h2 class="text-2xl font-luxury font-bold mb-6 border-b border-black/10 pb-4 uppercase tracking-tighter">Ringkasan Pembayaran</h2>

                <div class="space-y-3 mb-8">
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Item</span>
                        <span class="font-bold">{product.name}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Harga Satuan</span>
                        <span class="font-bold">Rp {product.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="opacity-70">Kuantitas</span>
                        <span id="summary-qty" class="font-bold">1</span>
                    </div>
                    <div class="pt-4 mt-4 border-t border-black/10 flex justify-between items-end">
                        <span class="text-sm font-bold uppercase tracking-widest">Total Bayar</span>
                        <span id="summary-total" class="text-3xl font-luxury font-bold leading-none">
                            Rp {product.price.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="group">
                        <label class="block text-[10px] font-bold uppercase mb-1 opacity-70">Nama Penerima</label>
                        <input id="form-name" type="text" placeholder="Masukkan nama Anda" class="w-full bg-white/20 border border-black/10 p-3 rounded focus:bg-white/40 outline-none transition placeholder:text-black/30" />
                    </div>
                    <div class="group">
                        <label class="block text-[10px] font-bold uppercase mb-1 opacity-70">Alamat Pengiriman</label>
                        <textarea id="form-address" placeholder="Masukkan alamat lengkap" class="w-full bg-white/20 border border-black/10 p-3 rounded h-24 focus:bg-white/40 outline-none transition placeholder:text-black/30"></textarea>
                    </div>
                </div>

                <button
                    type="button"
                    onclick="window.submitOrder()"
                    class="w-full bg-black text-white font-bold py-4 rounded-full mt-8 hover:bg-gray-900 transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                    <span class="uppercase tracking-widest text-sm">Pesan Sekarang</span>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.107l-.694 2.54 2.6-.683c.847.452 1.745.69 2.834.691h.004c3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.769-5.766zm3.446 8.212c-.149.423-.748.766-1.028.81-.28.043-.645.064-1.023-.058-.241-.078-.545-.183-.93-.343-1.633-.674-2.709-2.335-2.791-2.446-.082-.111-.669-.89-.669-1.697 0-.808.423-1.203.572-1.373.149-.17.323-.213.431-.213l.307.002c.101 0 .235-.038.368.285.133.324.455 1.111.496 1.196.041.085.068.184.01.299-.058.115-.087.188-.174.289-.087.101-.183.226-.261.303-.093.093-.191.195-.082.384.108.19.481.797 1.031 1.287.71.633 1.307.83 1.491.921.184.091.291.076.399-.05.108-.126.463-.539.587-.722.123-.183.247-.154.415-.091.168.064 1.066.503 1.248.595.183.091.304.137.349.213.045.077.045.444-.104.867zM12.108 2c-5.522 0-10 4.478-10 10 0 1.765.459 3.42 1.261 4.86L2 22l5.314-1.395c1.408.742 3.012 1.166 4.717 1.166 5.522 0 10-4.478 10-10s-4.478-10-10-10zm0 18.256c-1.571 0-3.044-.436-4.307-1.191l-.311-.184-3.146.826.841-3.075-.208-.33c-.808-1.28-1.261-2.795-1.261-4.414 0-4.546 3.7-8.244 8.245-8.244 4.544 0 8.244 3.698 8.244 8.244-.001 4.547-3.699 8.244-8.244 8.244z"/></svg>
                </button>
                <div class="mt-4 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-widest font-bold opacity-40">
                    <span class="w-10 h-[1px] bg-black"></span>
                    <span>Secure Checkout</span>
                    <span class="w-10 h-[1px] bg-black"></span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.updateTotal = function() {
            const price = ${product.price};
            const qty = parseInt(document.getElementById('qty').value);
            const total = price * qty;
            const formattedTotal = 'Rp ' + total.toLocaleString('id-ID');

            document.getElementById('summary-qty').innerText = qty;
            document.getElementById('summary-total').innerText = formattedTotal;
        };

        window.incrementQty = function() {
            const input = document.getElementById('qty');
            input.value = parseInt(input.value) + 1;
            window.updateTotal();
        };

        window.decrementQty = function() {
            const input = document.getElementById('qty');
            if(parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                window.updateTotal();
            }
        };

        window.submitOrder = function() {
            const name = document.getElementById('form-name').value;
            const addr = document.getElementById('form-address').value;
            const qty = document.getElementById('qty').value;
            const total = document.getElementById('summary-total').innerText;

            if(!name || !addr) return alert('Mohon lengkapi nama dan alamat pengiriman');

            const text = '*KONFIRMASI PESANAN - SUJUD NANAS*\\n\\n' +
                         'Saya tertarik memesan nenas premium:\\n\\n' +
                         '🍍 *Produk:* ${product.name}\\n' +
                         '📦 *Jumlah:* ' + qty + ' pcs\\n' +
                         '💰 *Total Harga:* ' + total + '\\n\\n' +
                         '*Data Pengiriman:*\\n' +
                         '👤 *Nama:* ' + name + '\\n' +
                         '📍 *Alamat:* ' + addr + '\\n\\n' +
                         'Mohon segera diinfokan nomor rekening untuk pembayarannya. Terima kasih.';

            window.open('https://wa.me/${contactPhone.replace(/\+/g, '').replace(/\s/g, '')}?text=' + encodeURIComponent(text), '_blank');
        };
      ` }} />
    </Layout>
  )
}
