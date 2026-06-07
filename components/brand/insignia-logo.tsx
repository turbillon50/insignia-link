import { cn } from "@/lib/utils"

export function InsigniaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      {/* sonar / signal waves */}
      <path
        d="M24 38c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4Z"
        fill="currentColor"
      />
      <path
        d="M14.5 27.5a13 13 0 0 1 19 0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M9 21a21 21 0 0 1 30 0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M4 15a29 29 0 0 1 40 0"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

export function InsigniaLogo({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <InsigniaMark className="h-8 w-8 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
            INSIGNIA
          </span>
          <span className="text-[0.7rem] font-bold tracking-[0.35em] text-primary">
            LINK
          </span>
        </span>
      )}
    </span>
  )
}
