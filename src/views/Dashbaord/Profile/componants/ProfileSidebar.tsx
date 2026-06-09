import React from "react";
import {
    Menu,
    X,
    FileText,
    User,
    Briefcase,
    Landmark,
    FolderOpen,
    BadgeCheck,
    CreditCard,
    Flag,
    TrendingUp,
    Settings,
    LogOut,
} from "lucide-react";

interface SidebarProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    activeItem?: string;
}

const menuItems = [
    { label: "Application Status", icon: FileText },
    { label: "Profile Details", icon: User },
    { label: "Employment Info", icon: Briefcase },
    { label: "Bank Account", icon: Landmark },
    { label: "Loan Applications", icon: FolderOpen },
    { label: "Approved Docs", icon: BadgeCheck },
    { label: "EMI Payments", icon: CreditCard },
    { label: "Loan Completion", icon: Flag },
    { label: "Repayment Details", icon: TrendingUp },
];

export default function ProfileSidebar({
    open,
    setOpen,
    activeItem = "Profile Details",
}: SidebarProps) {
    return (
        <>

            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-border-medium bg-surface shadow-sm
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border-light p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-home-green to-home-purple text-lg font-bold text-white shadow">
                            F
                        </div>

                        <h2 className="bg-gradient-to-r from-text-heading to-text-secondary bg-clip-text text-2xl font-extrabold text-transparent">
                            FinSetu
                        </h2>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Profile Card */}
                {/* <div className="bg-gradient-to-br from-home-purple to-home-green p-6">
                    <div className="flex items-center gap-4">
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="h-14 w-14 rounded-full border-2 border-white object-cover"
                        />

                        <div>
                            <h3 className="text-xl font-bold text-white">
                                Rahul Sharma
                            </h3>
                            <p className="text-sm text-white/90">
                                ID: RNS-2026-84721
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-white/20 bg-white p-3 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted">
                                Credit Score
                            </p>

                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-xl font-bold text-success">
                                    782
                                </span>

                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-success">
                                    EXCELLENT
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/20 bg-white p-3 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-text-muted">
                                Eligibility
                            </p>

                            <div className="mt-1 text-xl font-bold text-home-purple">
                                ₹8.5L
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Menu */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                        Dashboard
                    </div>

                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = activeItem === item.label;

                            return (
                                <button
                                    key={item.label}
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all
                    ${active
                                            ? "bg-home-green text-white shadow"
                                            : "text-text-secondary hover:bg-surface-muted"
                                        }
                  `}
                                >
                                    <Icon size={20} />
                                    <span className="font-semibold">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 px-3 pb-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                        Account
                    </div>

                    <div className="space-y-1">
                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-text-secondary hover:bg-surface-muted">
                            <Settings size={20} />
                            <span className="font-semibold">Settings</span>
                        </button>

                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50">
                            <LogOut size={20} />
                            <span className="font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}