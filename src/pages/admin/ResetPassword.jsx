import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/devis/FormField'
import { api } from '@/lib/api'
import { asset } from '@/lib/assets'

export function ResetPassword() {
  const navigate = useNavigate()
  const [requested, setRequested] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const onRequestCode = async () => {
    setError(null)
    setRequesting(true)
    try {
      await api.post('/api/admin/password-reset/request', {})
      setRequested(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setRequesting(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (newPassword !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.')
      return
    }

    setSubmitting(true)
    try {
      await api.post('/api/admin/password-reset/confirm', { code, newPassword })
      setSuccess(true)
      setTimeout(() => navigate('/admin/connexion'), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <CheckCircle2 className="size-12 text-gold" />
        <h1 className="mt-6 font-heading text-xl font-semibold">Mot de passe mis à jour</h1>
        <p className="mt-2 text-sm text-white/60">Redirection vers la connexion…</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <img src={asset('logo.png')} alt="Shake & Vibe" className="h-16 w-auto" />
      <h1 className="mt-8 font-heading text-2xl font-semibold">Réinitialiser le mot de passe</h1>
      <p className="mt-2 max-w-sm text-center text-sm text-white/60">
        Un code de vérification à 6 chiffres sera envoyé à l&apos;adresse de récupération
        associée à ce compte.
      </p>

      {!requested ? (
        <Button
          onClick={onRequestCode}
          disabled={requesting}
          className="mt-8 bg-gold text-black hover:bg-gold/90"
        >
          {requesting && <Loader2 className="size-4 animate-spin" />}
          Envoyer le code
        </Button>
      ) : (
        <>
          <p className="mt-8 text-sm text-gold">
            Code envoyé. Vérifiez la boîte mail de récupération (valable 15 minutes).
          </p>
          <form onSubmit={onSubmit} className="mt-6 w-full max-w-sm space-y-5">
            <FormField label="Code reçu par email" htmlFor="code">
              <Input
                id="code"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              />
            </FormField>
            <FormField label="Nouveau mot de passe" htmlFor="newPassword">
              <Input
                id="newPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormField>
            <FormField label="Confirmer le mot de passe" htmlFor="confirmPassword">
              <Input
                id="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormField>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold text-black hover:bg-gold/90"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Valider le nouveau mot de passe
            </Button>
            <button
              type="button"
              onClick={onRequestCode}
              disabled={requesting}
              className="w-full text-center text-xs text-white/50 hover:text-gold"
            >
              Renvoyer un code
            </button>
          </form>
        </>
      )}

      {error && !requested && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <Link to="/admin/connexion" className="mt-8 text-sm text-white/50 hover:text-gold">
        Retour à la connexion
      </Link>
    </div>
  )
}
