export const ProductCard = (props: {
  id: string
  name: string,
  price: number,
  type: string,
  size: string,
  image_key: string,
  description: string
}) => {
  const imageUrl = props.image_key ? `/image/${props.image_key}` : 'https://via.placeholder.com/400x400?text=Sujud+Nanas'

  return (
    <div class="card-lux rounded-lg overflow-hidden group flex flex-col h-full border border-gray-800 hover:border-[#D4AF37] transition-all duration-300">
      <div class="aspect-[4/5] overflow-hidden bg-gray-900 relative">
        <img
          src={imageUrl}
          alt={props.name}
          class="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div class="absolute top-2 right-2">
           <span class="text-[10px] bg-black/60 backdrop-blur-sm gold-text border border-[#D4AF37]/30 px-2 py-0.5 rounded uppercase tracking-tighter">
            {props.size}
          </span>
        </div>
      </div>
      <div class="p-4 flex flex-col flex-grow bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
        <div class="mb-1">
          <span class="text-[10px] text-gray-500 uppercase tracking-widest">{props.type}</span>
          <h3 class="text-lg font-luxury gold-text leading-tight line-clamp-1">{props.name}</h3>
        </div>

        <p class="text-gray-400 text-[11px] mb-4 line-clamp-2 h-8 leading-relaxed italic opacity-80">
          {props.description}
        </p>

        <div class="mt-auto">
          <div class="flex flex-col mb-4">
            <span class="text-xs text-gray-500 line-through opacity-50">Rp {(props.price * 1.2).toLocaleString('id-ID')}</span>
            <span class="text-lg font-bold text-white tracking-tight">Rp {props.price.toLocaleString('id-ID')}</span>
          </div>

          <a
            href={`/checkout/${props.id}`}
            class="block text-center w-full bg-transparent border border-[#D4AF37]/50 gold-text py-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase text-[10px] tracking-widest font-bold rounded-sm shadow-lg shadow-black/50"
          >
            Lihat Detail
          </a>
        </div>
      </div>
    </div>
  )
}
