import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/devis/FormField'
import { api } from '@/lib/api'
import { asset } from '@/lib/assets'

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.post('/api/admin/login', { email, password })
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <img src={asset('logo.png')} alt="Shake & Vibe" className="h-16 w-auto" />
      <h1 className="mt-8 font-heading text-2xl font-semibold">Espace administrateur</h1>

      <form onSubmit={onSubmit} className="mt-8 w-full max-w-sm space-y-5">
        <FormField label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField label="Mot de passe" htmlFor="password">
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black hover:bg-gold/90"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Se connecter
        </Button>
      </form>

      <Link
        to="/admin/mot-de-passe-oublie"
        className="mt-6 text-sm text-white/50 hover:text-gold"
      >
        Mot de passe oublié ?
      </Link>
    </div>
  )
}
