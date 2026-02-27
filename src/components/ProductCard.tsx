export const ProductCard = (props: {
  id: number,
  name: string,
  price: number,
  type: string,
  size: string,
  image_key: string,
  description: string
}) => {
  const imageUrl = props.image_key ? `/image/${props.image_key}` : 'https://via.placeholder.com/400x400?text=Sujud+Nanas'

  return (
    <div class="card-lux rounded-lg overflow-hidden group">
      <div class="aspect-square overflow-hidden bg-gray-900">
        <img
          src={imageUrl}
          alt={props.name}
          class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-luxury gold-text">{props.name}</h3>
          <span class="text-sm bg-gray-800 text-gray-400 px-2 py-1 rounded">{props.size}</span>
        </div>
        <p class="text-gray-500 text-sm mb-4 line-clamp-2">{props.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold">Rp {props.price.toLocaleString('id-ID')}</span>
          <span class="text-xs text-gray-400 italic">{props.type}</span>
        </div>
        <a
          href={`/checkout/${props.id}`}
          class="block text-center w-full mt-6 border gold-border gold-text py-2 hover:gold-bg hover:text-black transition uppercase text-xs tracking-widest font-bold"
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  )
}
