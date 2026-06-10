"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    X,
    FileText,
    User,
    Briefcase,
    Landmark,
    FolderOpen,
    Settings,
    LogOut,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/logout.action";

interface SidebarProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const menuItems = [
    { label: "Application Status", icon: FileText, link: "/profile" },
    { label: "Profile Details", icon: User, link: "/profile/basic-info" },
    {
        label: "Employment Info",
        icon: Briefcase,
        link: "/profile/employment-details",
    },
    { label: "Bank Account", icon: Landmark, link: "/profile/bank-details" },
    { label: "Loan Applications", icon: FolderOpen, link: "/profile/loan-details" },
];

export default function ProfileSidebar({ open, setOpen }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.push("/apply-now");
    };

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-border-medium bg-surface shadow-sm
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex items-center justify-between border-b border-border-light py-5 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-home-green to-home-purple text-lg font-bold text-white shadow">
                            F
                        </div>

                        <h2 className="bg-gradient-to-r from-text-heading to-text-secondary bg-clip-text text-2xl font-extrabold text-transparent">
                            FinSetu
                        </h2>
                    </div>

                    <button onClick={() => setOpen(false)} className="lg:hidden">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                        Dashboard
                    </div>

                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            const active =
                                item.link === "/profile"
                                    ? pathname === "/profile"
                                    : pathname === item.link || pathname.startsWith(`${item.link}/`);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.link}
                                    onClick={() => setOpen(false)}
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all
                    ${active
                                            ? "bg-home-green text-white shadow"
                                            : "text-text-secondary hover:bg-surface-muted"
                                        }
                  `}
                                >
                                    <Icon size={20} />
                                    <span className="font-semibold">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8 px-3 pb-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                        Account
                    </div>

                    <div className="space-y-1">


                        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50">
                            <LogOut size={20} />
                            <span className="font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}