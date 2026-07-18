import { Label } from '@/components/ui/label'

export function FormField({ label, htmlFor, error, required, className, children }) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-1.5 text-white/85">
        {label}
        {required && <span className="text-gold">*</span>}
      </Label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
}
