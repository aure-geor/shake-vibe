import { InstagramIcon, TikTokIcon } from '@/components/icons/SocialIcons'
import { useSiteContent } from '@/hooks/useSiteContent'

const SOCIALS = [
  { key: 'links.instagram', label: 'Instagram', icon: InstagramIcon },
  { key: 'links.tiktok', label: 'TikTok', icon: TikTokIcon },
]

export function SocialLinks({ className = '' }) {
  const t = useSiteContent()
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ key, label, icon: Icon }) => (
        <a
          key={key}
          href={t(key)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-9 items-center justify-center rounded-full border border-gold/20 text-white/70 transition-colors hover:border-gold/50 hover:text-gold"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  )
}
