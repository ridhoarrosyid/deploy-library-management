import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function NavLingResponsive({
    active = false,
    url = "#",
    title,
    icon: Icon,
    ...props
}) {
    return (
        <Link
            {...props}
            href={url}
            className={cn(
                active
                    ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500 font-semibold text-white hover:text-white"
                    : "text-muted-foreground hover:text-orange-500",
                "flex items-center gap-3 rounded-lg p-2 font-medium transition-all"
            )}
        >
            <Icon className="size-4" />
            {title}
        </Link>
    );
}
