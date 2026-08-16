import { InstagramIcon, TikTokIcon } from '@/components/icons/SocialIcons'

const SOCIALS = [
  { href: 'https://www.instagram.com/shakeandvibe?igsh=YWxvemZ3a2Z6Zm91', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://www.tiktok.com/@shakeandvibe_?_r=1&_t=ZN-98bx5hIixCF', label: 'TikTok', icon: TikTokIcon },
]

export function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
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
