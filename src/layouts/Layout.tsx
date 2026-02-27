import { html } from 'hono/html'

export const Layout = (props: { title: string; children: any; address?: string; phone?: string }) => {
  const address = props.address || 'Jl. Nenas No. 1, Riau, Indonesia';
  const phone = props.phone || '+62 812 3456 7890';

  return html`
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${props.title} - SUJUD NANAS</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            background-color: #0a0a0a;
            color: #f5f5f5;
          }
          h1, h2, h3, .font-luxury {
            font-family: 'Playfair Display', serif;
          }
          .gold-text {
            color: #D4AF37;
          }
          .gold-border {
            border-color: #D4AF37;
          }
          .gold-bg {
            background-color: #D4AF37;
          }
          .card-lux {
            background-color: #1a1a1a;
            border: 1px solid #333;
            transition: all 0.3s ease;
          }
          .card-lux:hover {
            border-color: #D4AF37;
            transform: translateY(-5px);
          }
        </style>
      </head>
      <body>
        <nav class="p-6 border-b border-gray-800 flex justify-between items-center bg-black sticky top-0 z-50">
          <a href="/" class="text-2xl font-bold gold-text font-luxury tracking-widest">SUJUD NANAS</a>
          <div class="space-x-8 hidden md:flex">
            <a href="/" class="hover:text-yellow-500 transition">Beranda</a>
            <a href="#produk" class="hover:text-yellow-500 transition">Koleksi</a>
            <a href="#promo" class="hover:text-yellow-500 transition">Penawaran</a>
            <a href="#kontak" class="hover:text-yellow-500 transition">Kontak</a>
          </div>
          <a href="/admin" class="text-sm border gold-border px-4 py-1 rounded hover:gold-bg hover:text-black transition">Admin</a>
        </nav>
        <main>
          ${props.children}
        </main>
        <footer class="bg-black border-t border-gray-800 py-12 px-6 mt-20">
          <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 class="gold-text text-xl font-luxury mb-4">SUJUD NANAS</h3>
              <p class="text-gray-400 text-sm">Menyajikan kualitas nenas terbaik dari alam untuk kemewahan meja makan Anda.</p>
            </div>
            <div id="kontak">
              <h3 class="gold-text text-xl font-luxury mb-4">Hubungi Kami</h3>
              <p class="text-gray-400 text-sm" id="footer-address">${address}</p>
              <p class="text-gray-400 text-sm mt-2" id="footer-phone">${phone}</p>
            </div>
            <div>
              <h3 class="gold-text text-xl font-luxury mb-4">Ikuti Kami</h3>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" class="text-gray-400 hover:text-white">Facebook</a>
              </div>
            </div>
          </div>
          <div class="text-center mt-12 text-gray-600 text-xs">
            &copy; 2024 SUJUD NANAS. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  `
}
