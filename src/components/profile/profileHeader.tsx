import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface profileHeaderProps {
    user: {
        id: string,
        image: string | null,
        name: string,
        role: string | null,
        createdAt: Date
    },
    stats: {
        problemsCount: number,
        repliesCount: number,
        reputation: number,
        solvedCount: number
    }
}

export default function ProfileHeader({ user, stats }: profileHeaderProps) {
    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {/* User Info Section */}
            <div className="flex items-center gap-5 sm:gap-6">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <AvatarImage src={user.image || "https://github.com/shadcn.png"} alt={user.name} />
                    <AvatarFallback className="text-xl sm:text-2xl font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                        {getInitials(user.name) || "CN"}
                    </AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        {user.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        {user.role && (
                            <Badge variant="outline" className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                {user.role}
                            </Badge>
                        )}
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                            Joined {new Date(user.createdAt).getFullYear()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 w-full md:w-auto">
                <StatCard label="Problems" value={stats.problemsCount} />
                <StatCard label="Replies" value={stats.repliesCount} />
                <StatCard label="Solved" value={stats.solvedCount} className="text-emerald-600 dark:text-emerald-400" />
                <StatCard label="Reputation" value={stats.reputation} className="text-blue-600 dark:text-blue-400" />
            </div>
        </div>
    )
}

// Sub-component for clean stat boxes
function StatCard({ label, value, className = "text-zinc-900 dark:text-zinc-100" }: { label: string, value: number, className?: string }) {
    return (
        <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/80 rounded-xl px-4 py-3 min-w-[90px] transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
            <span className={`text-xl font-bold ${className}`}>
                {value}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                {label}
            </span>
        </div>
    )
}