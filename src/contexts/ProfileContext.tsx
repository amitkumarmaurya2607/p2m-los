"use client";

import { createContext, useContext, ReactNode } from "react";

type ProfileContextType = {};

const ProfileContext = createContext<ProfileContextType | null>(null);

interface ProfileProviderProps {
    children: ReactNode;
}

export function ProfileProvider({
    children,
}: ProfileProviderProps) {
    return (
        <ProfileContext.Provider value={{}}>
            {children}
        </ProfileContext.Provider>
    );
}

