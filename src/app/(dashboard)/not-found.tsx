import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <FileQuestion className="text-primary" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-text-heading">Page Not Found</h2>
        <p className="text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved within the dashboard.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Home size={18} />
            Dashboard Home
          </Link>
        </div>
      </div>
    </div>
  );
}
