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
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: 'Inter', sans-serif;
            background-color: #050505;
            color: #f5f5f5;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            background-attachment: fixed;
            opacity: 0.98;
          }
          h1, h2, h3, .font-luxury {
            font-family: 'Playfair Display', serif;
          }
          .gold-text {
            color: #D4AF37;
          }
          .gold-gradient-text {
            background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .gold-gradient-bg {
            background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          }
          .gold-border {
            border-color: #D4AF37;
          }
          .gold-bg {
            background-color: #D4AF37;
          }
          .card-lux {
            background-color: rgba(26, 26, 26, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(212, 175, 55, 0.1);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .card-lux:hover {
            border-color: #D4AF37;
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }
          @keyframes zoomOut {
            from { transform: scale(1.1); }
            to { transform: scale(1); }
          }
          .animate-zoom-out {
            animation: zoomOut 20s ease-out forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
        </style>
      </head>
      <body class="selection:bg-yellow-500/30">
        <nav class="p-6 border-b border-white/5 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <a href="/" class="text-2xl font-bold gold-gradient-text font-luxury tracking-[0.2em]">SUJUD NANAS</a>
          <div class="space-x-8 hidden md:flex text-sm uppercase tracking-widest font-light">
            <a href="/" class="hover:gold-text transition-colors duration-300">Beranda</a>
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
