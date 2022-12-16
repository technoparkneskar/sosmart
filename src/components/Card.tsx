import { ReactNode } from "react";

export function Card({ className, active, children }: { className?: string; active?: boolean; children: ReactNode[]|ReactNode }) {
    return (<div className={`card py-4 px-3 rounded-2xl shadow-md ${className} ${active ? "bg-[#F1C17A]" : "bg-{#FFF5E5]"}`}>
        {children}
    </div>);
}
