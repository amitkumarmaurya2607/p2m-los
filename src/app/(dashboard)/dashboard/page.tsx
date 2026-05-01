"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increment, decrement, reset } from "@/features/counter/counterSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { value, lastUpdated } = useAppSelector((state) => state.counter);

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleReset = () => dispatch(reset());

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "Never";
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, User</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Total Users</h3>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Revenue</h3>
            <p className="text-3xl font-bold text-secondary">$45,678</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Active</h3>
            <p className="text-3xl font-bold text-secondary">89%</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Counter State (Redux)</h2>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 py-8">
            <Button variant="secondary" size="lg" onClick={handleDecrement}>
              - Decrement
            </Button>
            <span className="text-6xl font-bold text-primary">{value}</span>
            <Button variant="primary" size="lg" onClick={handleIncrement}>
              + Increment
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Last updated: {formatDate(lastUpdated)}
          </p>
        </div>
      </main>
    </div>
  );
}