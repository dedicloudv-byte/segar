export const ProductCard = (props: {
  id: string
  name: string,
  price: number,
  type: string,
  size: string,
  stock: number,
  rating: number,
  image_key: string,
  description: string
}) => {
  const imageUrl = props.image_key ? `/image/${props.image_key}` : 'https://via.placeholder.com/400x400?text=Sujud+Nanas'

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <i class={`fas fa-star ${i < props.rating ? 'text-yellow-400' : 'text-gray-300'} text-xs`}></i>
    );
  }

  return (
    <div class="bg-white rounded-3xl overflow-hidden shadow-lg card-hover border border-gray-100 group flex flex-col h-full">
        <div class="relative h-64 overflow-hidden">
            <img src={imageUrl} alt={props.name} class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
            <div class="absolute top-4 right-4 bg-fresh-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{props.size || 'POPULER'}</div>
            {props.stock <= 5 && props.stock > 0 && (
                <div class="absolute bottom-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Stok Menipis</div>
            )}
            {props.stock <= 0 && (
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span class="bg-white text-gray-900 font-bold px-6 py-2 rounded-full shadow-xl uppercase tracking-tighter">Habis Terjual</span>
                </div>
            )}
        </div>
        <div class="p-6 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-xl text-gray-900 leading-tight">{props.name}</h3>
                <div class="flex space-x-0.5 mt-1 shrink-0">
                    {stars}
                </div>
            </div>

            <p class="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">{props.description || props.type}</p>

            <div class="flex items-center justify-between mb-4">
                <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Harga Satuan</span>
                    <span class="text-2xl font-bold text-pineapple-600">Rp{props.price.toLocaleString('id-ID')}</span>
                </div>
                <div class="text-right">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Tersedia</span>
                    <span class={`font-bold ${props.stock > 0 ? 'text-fresh-green-600' : 'text-red-500'}`}>{props.stock} pcs</span>
                </div>
            </div>

            <button
                onclick={props.stock > 0 ? `addToCart('${props.name}', ${props.price}, '${imageUrl}', '${props.description?.replace(/'/g, "\\'") || ''}')` : ''}
                disabled={props.stock <= 0}
                class={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all shadow-lg ${props.stock > 0 ? 'bg-pineapple-500 hover:bg-pineapple-600 text-white hover:shadow-xl transform hover:scale-[1.02]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
                <i class="fas fa-shopping-cart mr-2"></i> BELI SEKARANG
            </button>
        </div>
    </div>
  )
}
