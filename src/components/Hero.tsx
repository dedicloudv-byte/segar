export const Hero = () => (
  <section class="relative h-[90vh] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#050505] z-10"></div>
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=1920"
        class="w-full h-full object-cover grayscale-[20%] animate-zoom-out"
        alt="Pineapple Background"
      />
    </div>
    <div class="relative z-20 text-center px-4 max-w-5xl animate-fade-in-up">
      <span class="text-yellow-500/80 uppercase tracking-[0.5em] text-xs mb-4 block font-light">The Gold Standard of Pineapple</span>
      <h1 class="text-6xl md:text-8xl font-bold mb-8 gold-gradient-text tracking-tighter leading-[0.9]">
        Kemewahan Rasa <br/> Dari Alam Terbaik
      </h1>
      <p class="text-lg md:text-xl text-gray-400 mb-10 tracking-wide max-w-2xl mx-auto font-light leading-relaxed">
        Nenas pilihan dengan kualitas premium, dibudidayakan dengan penuh kasih sayang untuk Anda yang menghargai cita rasa sejati.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a href="#produk" class="group relative inline-block px-12 py-5 font-bold overflow-hidden transition-all duration-300">
          <span class="absolute inset-0 gold-gradient-bg opacity-100 group-hover:opacity-90 transition-opacity"></span>
          <span class="relative text-black uppercase tracking-widest text-xs">Lihat Koleksi</span>
        </a>
        <a href="#kontak" class="text-white/60 hover:text-white uppercase tracking-widest text-xs transition-colors border-b border-white/20 pb-1">
          Hubungi Kami
        </a>
      </div>
    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-40">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
)
