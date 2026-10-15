import { Badge, type BadgeProps } from "./Badges";
import { getStringInitial } from "@/utils/string";

type ItemInfoProps = {
  badge?: Omit<BadgeProps, "className">;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function ItemInfo({
  badge,
  title,
  subtitle,
  onClick,
  className = "",
  titleClassName = "text-sm",
  subtitleClassName = "text-xs",
}: ItemInfoProps) {
  const Component = onClick ? "button" : "div";
  const firstLetter = getStringInitial(title);

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${className}`}
    >
      <Badge letter={badge?.letter ?? firstLetter} {...badge} />
      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold text-zinc-900 ${titleClassName}`}>
          {title}
        </p>
        {subtitle && (
          <p className={`truncate text-zinc-500 ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>
    </Component>
  );
}
