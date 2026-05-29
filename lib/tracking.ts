/**
 * Captura de parâmetros de tracking para atribuição Meta + Google Ads.
 * - utm_*  → definidos no template de URL do anúncio (Meta e Google).
 * - gclid  → click ID do Google Ads (auto-tagging).
 * - fbclid → click ID do Meta Ads.
 *
 * Estratégia: lê da URL atual; se presente, persiste em localStorage.
 * Se ausente na URL, usa o valor persistido (sobrevive a navegação interna).
 */

export const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const

export type TrackingKey = (typeof TRACKING_KEYS)[number]
export type TrackingParams = Record<TrackingKey, string>

const STORAGE_PREFIX = "lc_"

export const EMPTY_TRACKING: TrackingParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  gclid: "",
  fbclid: "",
}

export function captureTracking(): TrackingParams {
  if (typeof window === "undefined") return { ...EMPTY_TRACKING }

  const params = new URLSearchParams(window.location.search)
  const result: TrackingParams = { ...EMPTY_TRACKING }

  TRACKING_KEYS.forEach((key) => {
    const fromUrl = params.get(key)?.trim() ?? ""
    if (fromUrl) {
      result[key] = fromUrl
      try {
        window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, fromUrl)
      } catch {
        /* localStorage indisponível — segue só com valor da URL */
      }
      return
    }

    try {
      result[key] = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)?.trim() ?? ""
    } catch {
      result[key] = ""
    }
  })

  return result
}
