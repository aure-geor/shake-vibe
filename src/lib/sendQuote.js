// Placeholder d'envoi — à remplacer par EmailJS/Formspree une fois le service choisi.
export async function sendQuoteRequest(data) {
  await new Promise((resolve) => setTimeout(resolve, 700))
  console.info('[Demande de devis] à envoyer par mail :', data)
  return { ok: true }
}
