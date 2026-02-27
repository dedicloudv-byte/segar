export interface Product {
  id: string
  name: string
  price: number
  type?: string
  size?: string
  stock: number
  rating: number
  image_key?: string
  description?: string
  created_at: string
}

export interface Promo {
  id: string
  title: string
  description?: string
  discount_text?: string
  is_active: boolean
}

export interface SiteData {
  products: Product[]
  promos: Promo[]
  settings: Record<string, string>
}

const DEFAULT_DATA: SiteData = {
  products: [
    {
      id: "prod1",
      name: "Nenas Madu Super Premium",
      price: 50000,
      type: "Madu",
      size: "XL",
      stock: 50,
      rating: 5,
      image_key: "",
      description: "Nenas madu dengan kemanisan sempurna dan tekstur renyah. Dipanen langsung dari perkebunan terbaik.",
      created_at: new Date().toISOString()
    },
    {
      id: "prod2",
      name: "Nenas MD2 Gold Luxury",
      price: 75000,
      type: "MD2",
      size: "L",
      stock: 30,
      rating: 5,
      image_key: "",
      description: "Varietas MD2 yang terkenal dengan warna kuning keemasan dan rasa manis asam yang seimbang.",
      created_at: new Date().toISOString()
    },
    {
      id: "prod3",
      name: "Nenas Pasir Kristal",
      price: 35000,
      type: "Pasir",
      size: "M",
      stock: 100,
      rating: 4,
      image_key: "",
      description: "Nenas pasir dengan tekstur daging yang padat dan aroma yang sangat harum.",
      created_at: new Date().toISOString()
    },
    {
      id: "prod4",
      name: "Nenas Queen Royal",
      price: 45000,
      type: "Queen",
      size: "L",
      stock: 25,
      rating: 4,
      image_key: "",
      description: "Kualitas kerajaan dengan ukuran jumbo dan rasa yang sangat juicy.",
      created_at: new Date().toISOString()
    }
  ],
  promos: [],
  settings: {
    site_name: 'SUJUD NANAS',
    address: 'Jl. Nenas No. 1, Riau, Indonesia',
    contact_phone: '+62 812 3456 7890',
    contact_email: 'info@sujudnanas.com',
    admin_password: 'sujudnanas123'
  }
}

const DATA_KEY = 'site_data.json'

export async function getSiteData(bucket: R2Bucket): Promise<SiteData> {
  if (!bucket) return DEFAULT_DATA
  const obj = await bucket.get(DATA_KEY)
  if (!obj) {
    return DEFAULT_DATA
  }
  try {
    const data = await obj.json() as SiteData
    // Merge with defaults to ensure all keys exist
    return {
      ...DEFAULT_DATA,
      ...data,
      settings: { ...DEFAULT_DATA.settings, ...data.settings }
    }
  } catch (e) {
    return DEFAULT_DATA
  }
}

export async function saveSiteData(bucket: R2Bucket, data: SiteData): Promise<void> {
  await bucket.put(DATA_KEY, JSON.stringify(data))
}
