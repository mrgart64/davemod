import Link from "next/link";
import React from "react";

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
    return (
        <div className={`flex-shrink-0 flex items-center bg-white ${className}`}>
            <Link href="/" className="text-xl font-semibold flex items-center gap-3 tracking-tight">
                <img
                    src="/images/dave-dark.webp"
                    alt="Logo DaveMod"
                    width={512}
                    height={512}
                    className="w-48 h-48 object-contain drop-shadow-md"
                    loading="eager"
                />

                <div>
                    <span className="font-extrabold italic text-7xl text-slate-900 dark:text-white drop-shadow-sm">
                        DaveMod
                    </span>
                    <div className="text-2xl italic font-medium font-mono tracking-wider uppercase text-neutral-700 dark:text-slate-400">
                        Asisten Moderasi Pesan
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Logo;