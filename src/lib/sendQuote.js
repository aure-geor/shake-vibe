import { format } from 'date-fns'
import { api } from '@/lib/api'

export async function sendQuoteRequest(data, honeypot = '') {
  return api.post('/api/quote', {
    ...data,
    dateEvenement: format(data.dateEvenement, 'yyyy-MM-dd'),
    honeypot,
  })
}
