import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LogoutLink from "@/components/LogoutLink";

export default async function Header() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    
    return (
        <header className="max-w-7xl mx-auto my-4 flex items-center justify-between">
            <a href="/" className="text-3xl font-bold bg-gradient-to-r from-red-400 to-purple-300 text-transparent bg-clip-text">
                SEO RankTracker
            </a>

            <div className="flex items-center gap-1 bg-gray-700 p-1 pr-6 rounded-full">
                <img src={user?.image} alt="Profile Image" className="h-10 rounded-full" />
                <div className="pr-2 leading-5">
                    <h3 className="font-bold">{user?.name}</h3>
                    <LogoutLink/>
                </div>
            </div>
        </header>
    );
}