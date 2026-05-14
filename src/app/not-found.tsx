import Link from "next/link";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <SearchX className="text-primary" size={48} />
          <div className="absolute -inset-4 bg-primary/5 rounded-full animate-pulse -z-10" />
        </div>

        <div className="space-y-3">
          <h1 className="text-7xl font-black text-text-heading tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-text-heading">Page not found</h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Check the URL or head back home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            Need help?{" "}
            <Link href="/contact" className="text-primary font-bold hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
