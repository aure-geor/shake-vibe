// Cache mémoire partagé entre toutes les pages de la SPA, pour éviter de
// rappeler l'API à chaque navigation. La donnée en cache s'affiche
// immédiatement, puis un rafraîchissement silencieux la met à jour.
const cache = new Map()

export function getCached(key) {
  return cache.get(key)
}

export function setCached(key, data) {
  cache.set(key, data)
}
