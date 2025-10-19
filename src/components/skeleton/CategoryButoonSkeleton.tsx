export default function CategoryButoonSkeleton() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative p-3 border-2 border-border rounded-md overflow-hidden bg-neutral-300/10 animate-pulse"
        >
          <div className="h-4 w-3/4 bg-neutral-400/30 rounded mx-auto" />
        </div>
      ))}
    </div>
  );
}
