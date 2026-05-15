import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="container-editorial pt-4">
      <ol className="flex flex-wrap items-center gap-1 text-[11px] tracking-wide uppercase text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3 opacity-50 flex-shrink-0" />}
              {!isLast && item.href ? (
                <Link to={item.href} className="hover:text-accent transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground/60" : ""}>{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
