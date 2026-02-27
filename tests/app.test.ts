import { expect, test, describe, beforeAll, vi } from 'vitest'
import app from '../src/index'

describe('SUJUD NANAS R2-only App', () => {
  const BUCKET = {
    get: vi.fn(),
    put: vi.fn(),
  }

  const env = { BUCKET }

  test('GET / should return 200 and elegant title', async () => {
    // Mock site_data.json doesn't exist yet
    BUCKET.get.mockResolvedValue(null)

    const res = await app.request('/', {}, env)
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('SUJUD NANAS')
    expect(text).toContain('Kemewahan Rasa')
    expect(text).toContain('Dari Alam Terbaik')
  })

  test('GET /admin should return 401 without auth', async () => {
    const res = await app.request('/admin', {}, env)
    expect(res.status).toBe(401)
  })

  test('GET /admin should return 200 with basic auth', async () => {
    // Mock auth data in R2
    const mockData = JSON.stringify({
      products: [],
      promos: [],
      settings: {
        site_name: 'SUJUD NANAS',
        admin_password: 'sujudnanas123'
      }
    })

    BUCKET.get.mockImplementation((key) => {
        if (key === 'site_data.json') {
            return {
                text: () => Promise.resolve(mockData)
            }
        }
        return null
    })

    const res = await app.request('/admin', {
      headers: {
        'Authorization': 'Basic ' + btoa('admin:sujudnanas123')
      }
    }, env)
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Admin Dashboard')
  })

  test('GET /image/site_data.json should return 403', async () => {
    const res = await app.request('/image/site_data.json', {}, env)
    expect(res.status).toBe(403)
    const text = await res.text()
    expect(text).toBe('Forbidden')
  })
})
