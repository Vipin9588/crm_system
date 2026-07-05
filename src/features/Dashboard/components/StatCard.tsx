import type { ReactNode } from "react";

type Tone = "primary" | "success" | "warning" | "danger" | "muted";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  tone?: Tone;
  hint?: string;
};

const TONE_STYLES: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary ring-primary/20",
  success: "bg-success/10 text-success ring-success/20",
  warning: "bg-warning/10 text-warning ring-warning/20",
  danger: "bg-danger/10 text-danger ring-danger/20",
  muted: "bg-muted text-muted-foreground ring-border",
};

export default function StatCard({
  label,
  value,
  icon,
  tone = "muted",
  hint,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>

          <h2 className="text-3xl font-bold text-card-foreground">
            {value}
          </h2>

          {hint && (
            <p className="text-sm text-muted-foreground">
              {hint}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${TONE_STYLES[tone]}`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}