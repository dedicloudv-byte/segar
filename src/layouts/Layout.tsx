import { html } from 'hono/html'

export const Layout = (props: { title: string; children: any; address?: string; phone?: string }) => {
  const address = props.address || 'Jl. Buah Segar No. 123, Jakarta';
  const phone = props.phone || '0812-3456-7890';

  return html`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${props.title} - SUJUD NANAS</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'pineapple': {
                                100: '#FFF9E6',
                                200: '#FFEBB3',
                                300: '#FFE080',
                                400: '#FFD54D',
                                500: '#FFCA1A',
                                600: '#E6B300',
                                700: '#B38A00',
                            },
                            'fresh-green': {
                                400: '#4ADE80',
                                500: '#22C55E',
                                600: '#16A34A',
                            }
                        },
                        fontFamily: {
                            'sans': ['Poppins', 'sans-serif'],
                            'display': ['Playfair Display', 'serif'],
                        },
                        animation: {
                            'float': 'float 6s ease-in-out infinite',
                            'bounce-slow': 'bounce 3s infinite',
                            'spin-slow': 'spin 12s linear infinite',
                        },
                        keyframes: {
                            float: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-20px)' },
                            }
                        }
                    }
                }
            }
        </script>
        <style>
            .glass-effect {
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            .fruit-shadow {
                filter: drop-shadow(0 20px 30px rgba(255, 202, 26, 0.3));
            }
            .text-gradient {
                background: linear-gradient(135deg, #B38A00 0%, #FFCA1A 50%, #22C55E 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .card-hover {
                transition: all 0.3s ease;
            }
            .card-hover:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(255, 202, 26, 0.2);
            }
            .wave-bg {
                background: linear-gradient(180deg, #FFF9E6 0%, #FFFFFF 100%);
            }
            .pattern-bg {
                background-image: radial-gradient(#FFCA1A 1px, transparent 1px);
                background-size: 20px 20px;
            }
            html {
              scroll-behavior: smooth;
            }
        </style>
    </head>
    <body class="font-sans text-gray-800 overflow-x-hidden">

        <!-- Navigation -->
        <nav class="fixed w-full z-50 glass-effect border-b border-pineapple-200 transition-all duration-300" id="navbar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <a href="/" class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-pineapple-400 to-fresh-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            <i class="fas fa-leaf"></i>
                        </div>
                        <span class="font-display text-2xl font-bold text-gray-900 tracking-tight">
                            SUJUD<span class="text-pineapple-600">NANAS</span>
                        </span>
                    </a>

                    <div class="hidden md:flex space-x-8 items-center">
                        <a href="/#home" class="text-gray-700 hover:text-pineapple-600 font-medium transition">Beranda</a>
                        <a href="/#products" class="text-gray-700 hover:text-pineapple-600 font-medium transition">Produk</a>
                        <a href="/#why-us" class="text-gray-700 hover:text-pineapple-600 font-medium transition">Mengapa Kami</a>
                        <a href="/#testimonials" class="text-gray-700 hover:text-pineapple-600 font-medium transition">Testimoni</a>
                        <button onclick="toggleCart()" class="relative bg-pineapple-500 hover:bg-pineapple-600 text-white px-6 py-2 rounded-full font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-105">
                            <i class="fas fa-shopping-basket mr-2"></i>Keranjang
                            <span id="cart-count" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center hidden">0</span>
                        </button>
                        <a href="/admin" class="text-xs text-gray-400 hover:text-pineapple-600">Admin</a>
                    </div>

                    <button class="md:hidden text-gray-700 text-2xl" onclick="toggleMobileMenu()">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100">
                <div class="px-4 pt-2 pb-4 space-y-2">
                    <a href="/#home" class="block py-2 text-gray-700 hover:text-pineapple-600">Beranda</a>
                    <a href="/#products" class="block py-2 text-gray-700 hover:text-pineapple-600">Produk</a>
                    <a href="/#why-us" class="block py-2 text-gray-700 hover:text-pineapple-600">Mengapa Kami</a>
                    <button onclick="toggleCart()" class="w-full text-left py-2 text-pineapple-600 font-semibold">
                        <i class="fas fa-shopping-basket mr-2"></i>Keranjang
                    </button>
                    <a href="/admin" class="block py-2 text-gray-400">Admin</a>
                </div>
            </div>
        </nav>

        <main>
          ${props.children}
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white pt-16 pb-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8 mb-12">
                    <div class="col-span-1 md:col-span-2">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-10 h-10 bg-gradient-to-br from-pineapple-400 to-fresh-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                <i class="fas fa-leaf"></i>
                            </div>
                            <span class="font-display text-2xl font-bold">SUJUD<span class="text-pineapple-400">NANAS</span></span>
                        </div>
                        <p class="text-gray-400 mb-6 max-w-sm">Menyediakan buah-buahan segar berkualitas premium langsung dari kebun terbaik Indonesia ke rumah Anda.</p>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pineapple-500 transition"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pineapple-500 transition"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pineapple-500 transition"><i class="fab fa-tiktok"></i></a>
                        </div>
                    </div>

                    <div>
                        <h4 class="font-bold text-lg mb-4">Tautan Cepat</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/#home" class="hover:text-pineapple-400 transition">Beranda</a></li>
                            <li><a href="/#products" class="hover:text-pineapple-400 transition">Produk</a></li>
                            <li><a href="/#why-us" class="hover:text-pineapple-400 transition">Tentang Kami</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-bold text-lg mb-4">Kontak Kami</h4>
                        <ul class="space-y-3 text-gray-400">
                            <li class="flex items-start space-x-3">
                                <i class="fas fa-map-marker-alt mt-1 text-pineapple-400"></i>
                                <span>${address}</span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <i class="fas fa-phone text-pineapple-400"></i>
                                <span>${phone}</span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <i class="fas fa-envelope text-pineapple-400"></i>
                                <span>hello@sujudnanas.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-gray-800 pt-8 text-center text-gray-500">
                    <p>&copy; 2024 SUJUD NANAS. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <!-- Shopping Cart Modal -->
        <div id="cart-modal" class="fixed inset-0 z-50 hidden">
            <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onclick="toggleCart()"></div>
            <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 translate-x-full" id="cart-panel">
                <div class="flex flex-col h-full">
                    <div class="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h3 class="font-bold text-2xl text-gray-900">Keranjang Belanja</h3>
                        <button onclick="toggleCart()" class="text-gray-500 hover:text-gray-700 text-2xl">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto p-6" id="cart-items">
                        <div class="text-center text-gray-500 mt-20">
                            <i class="fas fa-shopping-basket text-6xl mb-4 text-gray-300"></i>
                            <p>Keranjang masih kosong</p>
                        </div>
                    </div>

                    <div class="p-6 border-t border-gray-200 bg-gray-50">
                        <div class="mb-6">
                            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Metode Pembayaran</h4>
                            <div class="grid grid-cols-1 gap-2">
                                <label class="flex items-center p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-pineapple-500 transition">
                                    <input type="radio" name="payment_method" value="COD" class="w-4 h-4 text-pineapple-600" checked>
                                    <div class="ml-3">
                                        <span class="block font-bold text-sm text-gray-900">COD (Bayar di Tempat)</span>
                                        <span class="block text-[10px] text-gray-500">Bayar saat nanas sampai di rumah</span>
                                    </div>
                                </label>
                                <label class="flex items-center p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-pineapple-500 transition">
                                    <input type="radio" name="payment_method" value="Transfer" class="w-4 h-4 text-pineapple-600">
                                    <div class="ml-3">
                                        <span class="block font-bold text-sm text-gray-900">Transfer Bank</span>
                                        <span class="block text-[10px] text-gray-500">Bayar langsung untuk proses lebih cepat</span>
                                    </div>
                                </label>
                                <label class="flex items-center p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-pineapple-500 transition">
                                    <input type="radio" name="payment_method" value="WhatsApp" class="w-4 h-4 text-pineapple-600">
                                    <div class="ml-3">
                                        <span class="block font-bold text-sm text-gray-900">Tanya via WhatsApp</span>
                                        <span class="block text-[10px] text-gray-500">Konsultasi dulu sebelum membeli</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="flex justify-between mb-4 text-lg font-bold">
                            <span>Total Pesanan:</span>
                            <span id="cart-total" class="text-pineapple-600">Rp0</span>
                        </div>
                        <button onclick="checkout()" class="w-full bg-gradient-to-r from-pineapple-500 to-pineapple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]">
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toast Notification -->
        <div id="toast" class="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl transform translate-y-20 opacity-0 transition-all duration-300 z-50 flex items-center space-x-3">
            <i class="fas fa-check-circle text-green-400"></i>
            <span id="toast-message">Produk ditambahkan ke keranjang!</span>
        </div>

        <script>
            // Cart functionality
            let cart = [];

            function addToCart(name, price, image, desc) {
                const existingItem = cart.find(item => item.name === name);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ name, price, quantity: 1, image, desc });
                }
                updateCart();
                showToast(name + ' ditambahkan ke keranjang!');
            }

            function removeFromCart(index) {
                cart.splice(index, 1);
                updateCart();
            }

            function updateQuantity(index, change) {
                cart[index].quantity += change;
                if (cart[index].quantity <= 0) {
                    removeFromCart(index);
                } else {
                    updateCart();
                }
            }

            function updateCart() {
                const cartCount = document.getElementById('cart-count');
                const cartItems = document.getElementById('cart-items');
                const cartTotal = document.getElementById('cart-total');

                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

                if (totalItems > 0) {
                    cartCount.textContent = totalItems;
                    cartCount.classList.remove('hidden');
                } else {
                    cartCount.classList.add('hidden');
                }

                if (cart.length === 0) {
                    cartItems.innerHTML = '<div class="text-center text-gray-500 mt-20"><i class="fas fa-shopping-basket text-6xl mb-4 text-gray-300"></i><p>Keranjang masih kosong</p></div>';
                    cartTotal.textContent = 'Rp0';
                } else {
                    cartItems.innerHTML = cart.map((item, index) => \`
                        <div class="mb-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                            <div class="flex space-x-4 mb-3">
                                <img src="\${item.image}" class="w-16 h-16 rounded-xl object-cover" alt="\${item.name}">
                                <div class="flex-1">
                                    <h4 class="font-bold text-gray-900 text-sm leading-tight mb-1">\${item.name}</h4>
                                    <p class="text-gray-400 text-[10px] line-clamp-1 mb-1">\${item.desc}</p>
                                    <p class="text-pineapple-600 font-bold text-sm">Rp\${item.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between pt-3 border-t border-gray-50">
                                <div class="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-1">
                                    <button onclick="updateQuantity(\${index}, -1)" class="text-gray-400 hover:text-pineapple-600 transition"><i class="fas fa-minus text-xs"></i></button>
                                    <span class="font-bold text-sm w-6 text-center text-gray-700">\${item.quantity}</span>
                                    <button onclick="updateQuantity(\${index}, 1)" class="text-gray-400 hover:text-pineapple-600 transition"><i class="fas fa-plus text-xs"></i></button>
                                </div>
                                <button onclick="removeFromCart(\${index})" class="text-red-400 hover:text-red-600 transition text-sm">
                                    <i class="fas fa-trash-alt mr-1"></i> Hapus
                                </button>
                            </div>
                        </div>
                    \`).join('');

                    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    cartTotal.textContent = 'Rp' + total.toLocaleString();
                }
            }

            function toggleCart() {
                const modal = document.getElementById('cart-modal');
                const panel = document.getElementById('cart-panel');

                if (modal.classList.contains('hidden')) {
                    modal.classList.remove('hidden');
                    setTimeout(() => {
                        panel.classList.remove('translate-x-full');
                    }, 10);
                } else {
                    panel.classList.add('translate-x-full');
                    setTimeout(() => {
                        modal.classList.add('hidden');
                    }, 300);
                }
            }

            function checkout() {
                if (cart.length === 0) {
                    showToast('Keranjang masih kosong!');
                    return;
                }

                const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

                let message = '🍍 *PESANAN BARU - SUJUD NANAS* 🍍\\n\\n';
                message += 'Metode Pembayaran: *' + paymentMethod + '*\\n';
                message += '------------------------------------------\\n';

                let total = 0;
                cart.forEach(item => {
                    message += '✅ *' + item.name + '*\\n';
                    message += '   ' + item.quantity + ' x Rp' + item.price.toLocaleString() + ' = *Rp' + (item.price * item.quantity).toLocaleString() + '*\\n';
                    total += item.price * item.quantity;
                });

                message += '------------------------------------------\\n';
                message += '💰 *TOTAL BAYAR: Rp' + total.toLocaleString() + '*\\n\\n';
                message += 'Mohon segera diproses ya kak. Terima kasih! 🙏';

                const encodedMessage = encodeURIComponent(message);
                window.open('https://wa.me/' + '${phone.replace(/\+/g, '').replace(/\s/g, '')}' + '?text=' + encodedMessage, '_blank');
            }

            function showToast(message) {
                const toast = document.getElementById('toast');
                const toastMessage = document.getElementById('toast-message');

                toastMessage.textContent = message;
                toast.classList.remove('translate-y-20', 'opacity-0');

                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                }, 3000);
            }

            function toggleMobileMenu() {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
            }

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.getElementById('navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('shadow-md');
                } else {
                    navbar.classList.remove('shadow-md');
                }
            });
        </script>
    </body>
    </html>
  `
}
