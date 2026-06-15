import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";


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
        <div className="flex justify-start gap-12">
            <div className="flex justify-start gap-6">
                <Avatar size="lg">
                    <AvatarImage src={user.image || "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>{getInitials(user.name) || "CN"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span>{user.name}</span>
                    <Badge variant="secondary">{stats.repliesCount} Replies</Badge>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex flex-col items-center">
                    <span>{stats.problemsCount}</span>
                    <Label>PROBLEMS</Label>
                </div>
                <div className="flex flex-col items-center">
                    <span>{stats.repliesCount}</span>
                    <Label>REPLIES</Label>
                </div>
                <div className="flex flex-col items-center">
                    <span>{stats.solvedCount}</span>
                    <Label>SOLVED</Label>
                </div>
                <div className="flex flex-col items-center">
                    <span>{stats.reputation}</span>
                    <Label>REP</Label>
                </div>
            </div>
        </div>
    )
}
