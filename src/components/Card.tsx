type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded-3xl border border-rose-100 bg-white/95 p-6 shadow-[var(--shadow)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
};

