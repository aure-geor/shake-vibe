import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/devis/FormField'
import { CONTENT_SCHEMA, CONTENT_FALLBACKS, COLOR_OPTIONS, COLORABLE_DEFAULTS } from '@/lib/editableContent'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

const COLOR_DEFAULT_VALUES = Object.fromEntries(
  Object.entries(COLORABLE_DEFAULTS).map(([key, color]) => [`${key}__color`, color])
)

function ColorPicker({ value, onChange }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      {COLOR_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          title={opt.label}
          aria-label={`Couleur ${opt.label}`}
          onClick={() => onChange(opt.value)}
          className={cn(
            'size-6 rounded-full border-2 transition-transform',
            value === opt.value ? 'scale-110 border-gold' : 'border-white/20 hover:border-white/50'
          )}
          style={{ backgroundColor: opt.hex }}
        />
      ))}
    </div>
  )
}

export function ContenuPanel() {
  const [values, setValues] = useState({ ...CONTENT_FALLBACKS, ...COLOR_DEFAULT_VALUES })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(CONTENT_SCHEMA[0]?.page ?? null)
  const [savingPage, setSavingPage] = useState(null)
  const [savedPage, setSavedPage] = useState(null)

  useEffect(() => {
    api
      .get('/api/content')
      .then((content) => setValues((v) => ({ ...v, ...content })))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }))
    setSavedPage(null)
  }

  const onSavePage = async (group) => {
    setSavingPage(group.page)
    setError(null)
    try {
      const updates = Object.fromEntries(group.fields.map((f) => [f.key, values[f.key] ?? '']))
      for (const f of group.fields) {
        if (f.key in COLORABLE_DEFAULTS) {
          updates[`${f.key}__color`] = values[`${f.key}__color`] ?? COLORABLE_DEFAULTS[f.key]
        }
      }
      await api.put('/api/content', { updates })
      setSavedPage(group.page)
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingPage(null)
    }
  }

  if (loading) {
    return <Loader2 className="size-5 animate-spin text-gold" />
  }

  return (
    <div>
      <p className="text-sm text-white/60">
        Modifiez ici n&apos;importe quel texte du site : titres, paragraphes, boutons, liens
        et documents légaux. Videz un champ pour revenir au texte par défaut. Les changements
        sont visibles sur le site public dès l&apos;enregistrement de la page concernée.
      </p>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-8 space-y-3">
        {CONTENT_SCHEMA.map((group) => {
          const isExpanded = expanded === group.page
          return (
            <div key={group.page} className="rounded-lg border border-white/10 bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : group.page)}
                className="flex w-full items-center gap-2 p-4 text-left"
              >
                {isExpanded ? (
                  <ChevronUp className="size-4 shrink-0 text-gold" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-gold" />
                )}
                <p className="font-medium text-white">{group.page}</p>
                <span className="ml-auto text-xs text-white/40">{group.fields.length} champ(s)</span>
              </button>

              {isExpanded && (
                <div className="space-y-4 border-t border-white/10 p-4">
                  {group.fields.map((field) => (
                    <FormField key={field.key} label={field.label} htmlFor={field.key}>
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.key}
                          rows={field.fallback.length > 200 ? 6 : 3}
                          value={values[field.key] ?? ''}
                          onChange={(e) => onChange(field.key, e.target.value)}
                          placeholder={field.fallback}
                        />
                      ) : (
                        <Input
                          id={field.key}
                          value={values[field.key] ?? ''}
                          onChange={(e) => onChange(field.key, e.target.value)}
                          placeholder={field.fallback}
                        />
                      )}
                      {field.key in COLORABLE_DEFAULTS && (
                        <ColorPicker
                          value={values[`${field.key}__color`] ?? COLORABLE_DEFAULTS[field.key]}
                          onChange={(color) => onChange(`${field.key}__color`, color)}
                        />
                      )}
                    </FormField>
                  ))}

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={() => onSavePage(group)}
                      disabled={savingPage === group.page}
                      className="bg-gold text-black hover:bg-gold/90"
                    >
                      {savingPage === group.page && <Loader2 className="size-4 animate-spin" />}
                      Enregistrer
                    </Button>
                    {savedPage === group.page && (
                      <span className="flex items-center gap-1 text-sm text-emerald-400">
                        <Check className="size-4" /> Enregistré
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
