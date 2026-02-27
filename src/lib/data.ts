export interface Product {
  id: string
  name: string
  price: number
  type?: string
  size?: string
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
  products: [],
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
