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
    <div class="card-lux group flex flex-col h-full overflow-hidden transition-all duration-700 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      <div class="aspect-[4/5] overflow-hidden bg-[#111] relative">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10"></div>
        <img
          src={imageUrl}
          alt={props.name}
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
        <div class="absolute top-4 right-4 z-20">
           <span class="text-[9px] bg-black/40 backdrop-blur-md gold-gradient-text border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            {props.size}
          </span>
        </div>
      </div>
      <div class="p-6 flex flex-col flex-grow bg-[#0c0c0c] relative">
        <div class="mb-3">
          <span class="text-[9px] text-gray-500 uppercase tracking-[0.3em] block mb-1 font-light">{props.type}</span>
          <h3 class="text-xl font-luxury gold-gradient-text leading-snug line-clamp-1">{props.name}</h3>
        </div>

        <p class="text-gray-500 text-[12px] mb-6 line-clamp-2 h-10 leading-relaxed font-light">
          {props.description}
        </p>

        <div class="mt-auto">
          <div class="flex items-end gap-3 mb-6">
            <span class="text-xl font-medium text-white/90 tracking-tighter">Rp {props.price.toLocaleString('id-ID')}</span>
            <span class="text-[11px] text-gray-600 line-through mb-1 font-light italic">Rp {(props.price * 1.2).toLocaleString('id-ID')}</span>
          </div>

          <a
            href={`/checkout/${props.id}`}
            class="group/btn relative block text-center w-full py-3.5 overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/20"
          >
            <span class="absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 gold-gradient-bg transition-transform duration-500"></span>
            <span class="relative z-10 text-[10px] uppercase tracking-[0.2em] gold-text group-hover/btn:text-black font-bold transition-colors duration-500">
              Explore Collection
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
