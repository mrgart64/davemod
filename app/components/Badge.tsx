import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    showDot?: boolean;
    dotClassName?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children = "MESSAGE RECOGNITION",
    showDot = true,
    dotClassName = "bg-neutral-800 animate-pulse",
    className = "",
    ...props
}) => {
    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-400 text-neutral-900 text-xs font-medium ${className}`}
            {...props}
        >
            {showDot && (
                <span className={`w-2 h-2 rounded-full ${dotClassName}`} />
            )}
            <span>{children}</span>
        </div>
    );
};