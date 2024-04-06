"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AppProvider } from "../context/context";
import { PostDataProvider } from "../context/postContext";
export const Provider = ({children,session}:any) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
export const ContextProvider = ({children}:{children:ReactNode}) => {
    return (
        <AppProvider>
            {children}
        </AppProvider>
    )
}