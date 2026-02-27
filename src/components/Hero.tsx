export const Hero = () => (
    <section id="home" class="relative min-h-screen flex items-center pt-20 overflow-hidden wave-bg">
        <div class="absolute inset-0 pattern-bg opacity-30"></div>

        {/* Decorative Elements */}
        <div class="absolute top-20 left-10 w-32 h-32 bg-pineapple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div class="absolute bottom-20 right-10 w-48 h-48 bg-fresh-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 2s;"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-8 animate-fade-in-up">
                <div class="inline-block px-4 py-2 bg-pineapple-100 text-pineapple-700 rounded-full text-sm font-semibold tracking-wide">
                    <i class="fas fa-star mr-2"></i>100% Organik & Segar
                </div>
                <h1 class="font-display text-5xl md:text-7xl font-bold leading-tight text-gray-900">
                    Buah Segar <br />
                    <span class="text-gradient">Berkualitas Premium</span>
                </h1>
                <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
                    Nikmati kesegaran buah-buahan pilihan terbaik langsung dari kebun ke meja Anda. Kami menyediakan nanas, mangga, semangka, dan buah tropis lainnya dengan kualitas eksport.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#products" class="bg-gradient-to-r from-pineapple-500 to-pineapple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center">
                        Belanja Sekarang <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                    <a href="#kontak" class="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-pineapple-500 hover:text-pineapple-600 transition flex items-center">
                        <i class="fab fa-whatsapp mr-2 text-green-500"></i>Hubungi Kami
                    </a>
                </div>

                <div class="flex items-center space-x-8 pt-4">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900">5000+</div>
                        <div class="text-sm text-gray-500">Pelanggan Puas</div>
                    </div>
                    <div class="w-px h-12 bg-gray-300"></div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900">100%</div>
                        <div class="text-sm text-gray-500">Organik</div>
                    </div>
                    <div class="w-px h-12 bg-gray-300"></div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900">24/7</div>
                        <div class="text-sm text-gray-500">Pengiriman</div>
                    </div>
                </div>
            </div>

            <div class="relative">
                <div class="relative z-10 animate-float">
                    <img src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&h=600&fit=crop" alt="Fresh Pineapple" class="w-full max-w-md mx-auto fruit-shadow rounded-full border-8 border-white shadow-2xl" />
                </div>
                {/* Floating Cards */}
                <div class="absolute top-10 -left-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
                    <div class="flex items-center space-x-2">
                        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div>
                            <div class="text-xs text-gray-500">Kesegaran</div>
                            <div class="font-bold text-gray-900">100% Terjamin</div>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-20 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow" style="animation-delay: 1s;">
                    <div class="flex items-center space-x-2">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                            <i class="fas fa-truck"></i>
                        </div>
                        <div>
                            <div class="text-xs text-gray-500">Pengiriman</div>
                            <div class="font-bold text-gray-900">Gratis Ongkir</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
