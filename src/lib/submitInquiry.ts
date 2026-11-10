export interface Inquiry {
  name: string; email: string; phone: string; zip: string; service: string; message: string; consent: boolean
}

/**
 * DEMO STUB. Nothing is sent anywhere.
 * Phase 2: replace the body with a real request (e.g. fetch(import.meta.env.VITE_INQUIRY_URL, ...)).
 */
export async function submitInquiry(_data: Inquiry): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true }
}
