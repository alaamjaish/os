import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-muted/60 via-muted to-muted/60",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
