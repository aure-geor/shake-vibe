import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarIcon, CheckCircle2, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

import { FormField } from '@/components/devis/FormField'
import { DureeField } from '@/components/devis/DureeField'
import {
  quoteSchema,
  quoteDefaultValues,
  TYPES_EVENEMENT,
  NOMBRES_PERSONNES,
  EXPERIENCES_COCKTAILS,
  TYPES_COCKTAILS,
} from '@/lib/quoteSchema'
import { sendQuoteRequest } from '@/lib/sendQuote'

export function Devis() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: quoteDefaultValues,
  })

  const onSubmit = async (data) => {
    await sendQuoteRequest(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <CheckCircle2 className="size-14 text-gold" />
        <h1 className="mt-6 font-heading text-2xl font-semibold sm:text-3xl">
          Merci pour votre demande, nous revenons vers vous dans un délai maximum de
          48h avec une proposition adaptée à votre demande.
        </h1>
        <Button
          type="button"
          variant="outline"
          className="mt-8 border-gold/40 bg-transparent text-white hover:bg-gold/10 hover:text-white"
          onClick={() => {
            reset(quoteDefaultValues)
            setSubmitted(false)
          }}
        >
          Envoyer une nouvelle demande
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs font-medium tracking-[0.3em] text-gold uppercase">
        Demande de devis
      </p>
      <h1 className="mt-4 text-center font-heading text-3xl font-semibold sm:text-4xl">
        Parlez-nous de votre évènement
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-white/65">
        Remplissez ce formulaire, nous revenons vers vous sous 48h avec une proposition
        sur-mesure.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-12 space-y-12">
        <section className="space-y-5">
          <h2 className="font-heading text-lg font-semibold text-gold">
            Vos coordonnées
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Nom" htmlFor="nom" required error={errors.nom?.message}>
              <Input id="nom" aria-invalid={!!errors.nom} {...register('nom')} />
            </FormField>
            <FormField
              label="Prénom"
              htmlFor="prenom"
              required
              error={errors.prenom?.message}
            >
              <Input id="prenom" aria-invalid={!!errors.prenom} {...register('prenom')} />
            </FormField>
            <FormField label="Adresse mail" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                placeholder="nom@domaine.fr"
                aria-invalid={!!errors.email}
                {...register('email')}
              />
            </FormField>
            <FormField
              label="Téléphone"
              htmlFor="telephone"
              required
              error={errors.telephone?.message}
            >
              <Input
                id="telephone"
                type="tel"
                placeholder="06 12 34 56 78"
                aria-invalid={!!errors.telephone}
                {...register('telephone')}
              />
            </FormField>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-heading text-lg font-semibold text-gold">
            Votre évènement
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              label="Type d'évènement"
              htmlFor="typeEvenement"
              required
              error={errors.typeEvenement?.message}
            >
              <Controller
                control={control}
                name="typeEvenement"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="typeEvenement"
                      className="w-full"
                      aria-invalid={!!errors.typeEvenement}
                    >
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES_EVENEMENT.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField
              label="Date de l'évènement"
              htmlFor="dateEvenement"
              required
              error={errors.dateEvenement?.message}
            >
              <Controller
                control={control}
                name="dateEvenement"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger
                      id="dateEvenement"
                      aria-invalid={!!errors.dateEvenement}
                      className="flex h-9 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 text-sm text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
                    >
                      <span className={field.value ? '' : 'text-muted-foreground'}>
                        {field.value
                          ? format(field.value, 'd MMMM yyyy', { locale: fr })
                          : 'Choisir une date'}
                      </span>
                      <CalendarIcon className="size-4 text-gold" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border-gold/20 bg-black p-0 text-white">
                      <Calendar
                        mode="single"
                        locale={fr}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </FormField>

            <FormField
              label="Lieu de l'évènement"
              htmlFor="lieuEvenement"
              required
              error={errors.lieuEvenement?.message}
              className="sm:col-span-2"
            >
              <Input
                id="lieuEvenement"
                placeholder="Ville, salle, domaine..."
                aria-invalid={!!errors.lieuEvenement}
                {...register('lieuEvenement')}
              />
            </FormField>

            <FormField
              label="Nombre de personnes"
              htmlFor="nombrePersonnes"
              required
              error={errors.nombrePersonnes?.message}
            >
              <Controller
                control={control}
                name="nombrePersonnes"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="nombrePersonnes"
                      className="w-full"
                      aria-invalid={!!errors.nombrePersonnes}
                    >
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {NOMBRES_PERSONNES.map((n) => (
                        <SelectItem key={n.value} value={n.value}>
                          {n.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField
              label="Durée de la prestation"
              htmlFor="duree"
              required
              error={errors.duree?.message}
            >
              <Controller
                control={control}
                name="duree"
                render={({ field }) => (
                  <DureeField
                    id="duree"
                    value={field.value}
                    onChange={field.onChange}
                    invalid={!!errors.duree}
                  />
                )}
              />
            </FormField>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-heading text-lg font-semibold text-gold">
            Vos préférences cocktails
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              label="Expérience cocktails"
              required
              error={errors.experienceCocktails?.message}
            >
              <Controller
                control={control}
                name="experienceCocktails"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange}>
                    {EXPERIENCES_COCKTAILS.map((exp) => (
                      <label
                        key={exp.value}
                        className="flex items-center gap-2 text-sm text-white/85"
                      >
                        <RadioGroupItem value={exp.value} />
                        {exp.label}
                      </label>
                    ))}
                  </RadioGroup>
                )}
              />
            </FormField>

            <FormField
              label="Type de cocktails"
              required
              error={errors.typeCocktails?.message}
            >
              <Controller
                control={control}
                name="typeCocktails"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange}>
                    {TYPES_COCKTAILS.map((type) => (
                      <label
                        key={type.value}
                        className="flex items-center gap-2 text-sm text-white/85"
                      >
                        <RadioGroupItem value={type.value} />
                        {type.label}
                      </label>
                    ))}
                  </RadioGroup>
                )}
              />
            </FormField>
          </div>

          <FormField
            label="Décrivez votre évènement"
            htmlFor="description"
            error={errors.description?.message}
          >
            <Textarea
              id="description"
              rows={4}
              placeholder="Ambiance souhaitée, thème, contraintes particulières..."
              {...register('description')}
            />
          </FormField>
        </section>

        <section className="space-y-5">
          <h2 className="font-heading text-lg font-semibold text-gold">
            Prise de contact
          </h2>
          <FormField
            label="Souhaitez-vous être rappelé par téléphone ?"
            required
            error={errors.rappelTelephone?.message}
          >
            <Controller
              control={control}
              name="rappelTelephone"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-6"
                >
                  <label className="flex items-center gap-2 text-sm text-white/85">
                    <RadioGroupItem value="oui" /> Oui
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/85">
                    <RadioGroupItem value="non" /> Non
                  </label>
                </RadioGroup>
              )}
            />
          </FormField>
        </section>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-gold text-black hover:bg-gold/90 sm:w-auto"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Obtenir mon devis
        </Button>
      </form>
    </div>
  )
}
