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
    <div class="bg-white rounded-3xl overflow-hidden shadow-lg card-hover border border-gray-100 group">
        <div class="relative h-64 overflow-hidden">
            <img src={imageUrl} alt={props.name} class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
            <div class="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{props.size || 'POPULER'}</div>
        </div>
        <div class="p-6">
            <h3 class="font-bold text-xl text-gray-900 mb-2">{props.name}</h3>
            <p class="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{props.description || props.type}</p>
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-2xl font-bold text-pineapple-600">Rp{props.price.toLocaleString('id-ID')}</span>
                </div>
                <button onclick={`addToCart('${props.name}', ${props.price})`} class="w-12 h-12 bg-pineapple-500 hover:bg-pineapple-600 text-white rounded-full flex items-center justify-center transition shadow-lg">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    </div>
  )
}
