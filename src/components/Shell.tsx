import Link from "next/link";
import Image from "next/image";

type ShellProps = {
  children: React.ReactNode;
};

export const Shell = ({ children }: ShellProps) => {
  return (
    <div className="min-h-screen">
      <header className="px-6 pt-8 sm:px-10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-18 w-18 overflow-hidden rounded-full border border-rose-100 bg-white shadow-sm">
              <Image
                src="/valentine.jpg"
                alt="Valentine Vibe Check logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <span className="font-display text-2xl font-semibold tracking-tight text-rose-950">
              Valentine Vibe Check
            </span>
          </Link>
          <Link
            href="/create"
            className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:text-rose-800"
          >
            Create Quiz
          </Link>
        </div>
      </header>
      <main className="px-6 pb-20 pt-10 sm:px-10">{children}</main>
    </div>
  );
};

