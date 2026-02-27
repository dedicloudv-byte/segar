export const Hero = () => (
  <section class="relative h-[80vh] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10"></div>
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=1920"
        class="w-full h-full object-cover grayscale-[20%]"
        alt="Pineapple Background"
      />
    </div>
    <div class="relative z-20 text-center px-4 max-w-4xl">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 gold-text animate-fade-in">
        Kemewahan Rasa <br/> Dari Alam Terbaik
      </h1>
      <p class="text-xl text-gray-300 mb-8 tracking-wide">
        Nenas pilihan dengan kualitas premium, dibudidayakan dengan penuh kasih sayang untuk Anda yang menghargai cita rasa sejati.
      </p>
      <a href="#produk" class="inline-block gold-bg text-black px-10 py-4 font-bold rounded-sm hover:bg-yellow-600 transition-colors uppercase tracking-widest text-sm">
        Lihat Koleksi
      </a>
    </div>
  </section>
)
