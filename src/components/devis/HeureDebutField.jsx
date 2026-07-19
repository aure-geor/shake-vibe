import { ChevronDownIcon, Clock3 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const HEURES_OPTIONS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES_OPTIONS = [0, 15, 30, 45]

function formatHeure({ heures, minutes }) {
  return `${String(heures).padStart(2, '0')}h${String(minutes).padStart(2, '0')}`
}

export function HeureDebutField({ id, value, onChange }) {
  const update = (key) => (nextValue) => {
    onChange({ ...value, [key]: Number(nextValue) })
  }

  return (
    <Popover>
      <PopoverTrigger
        id={id}
        className="flex h-9 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 text-sm text-white transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
      >
        <span className="flex items-center gap-2">
          <Clock3 className="size-4 text-gold" />
          {formatHeure(value)}
        </span>
        <ChevronDownIcon className="size-4 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-48 border-gold/20 bg-black text-white" align="start">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/60">Heures</Label>
            <Select value={String(value.heures)} onValueChange={update('heures')}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HEURES_OPTIONS.map((h) => (
                  <SelectItem key={h} value={String(h)}>
                    {String(h).padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/60">Minutes</Label>
            <Select value={String(value.minutes)} onValueChange={update('minutes')}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MINUTES_OPTIONS.map((m) => (
                  <SelectItem key={m} value={String(m)}>
                    {String(m).padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
