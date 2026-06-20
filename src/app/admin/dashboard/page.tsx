import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { 
    LayoutDashboard, 
    StickyNotePlus, 
    TrendingUp, 
    Users, 
    AlertCircle, 
    Activity, 
    ShieldCheck, 
    ArrowRight, 
    Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProblemAction } from "@/actions/user/userAction";
import { getAdminAllProblemsAction, getAllUserAction } from "@/actions/admin/adminAction";

export default async function AdminDashboard() {
    const posts = await getAdminAllProblemsAction();
    const users = await getAllUserAction();

    // Get current date for the dashboard header
    const currentDate = new Intl.DateTimeFormat('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    }).format(new Date());

    // Polished Empty State
    if (!users || !posts) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
                <div className="flex flex-col items-center justify-center text-center p-10 max-w-md border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900/50 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-5 relative">
                        <div className="absolute inset-0 rounded-full bg-red-500/20 dark:bg-red-500/10 animate-ping"></div>
                        <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400 relative z-10" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">No Data Available</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                        There are currently no users or posts to display. The database might be empty or unreachable.
                    </p>
                    <Button variant="outline" className="mt-6 rounded-full" asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 pb-20 selection:bg-blue-200 dark:selection:bg-blue-900">
            
            {/* Dashboard Container */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                
                {/* Page Header */}
                <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-500 mb-1">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <LayoutDashboard className="w-5 h-5" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Dashboard Overview
                            </h1>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                            {`Monitor your platform's core metrics and user activity.`}
                        </p>
                    </div>
                    <div className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-full shadow-sm w-fit">
                        {currentDate}
                    </div>
                </div>

                {/* Top Stats Row */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    
                    {/* Total Posts Card */}
                    <Card className="group relative overflow-hidden bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/50 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        {/* Decorative background glow */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                        
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
                            <CardTitle className="text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                                Total Posts
                            </CardTitle>
                            <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <StickyNotePlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                                {posts.totalPosts}
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" /> 
                                All-time problems submitted
                            </p>
                        </CardContent>
                    </Card>

                    {/* Total Users Card */}
                    <Card className="group relative overflow-hidden bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
                        
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
                            <CardTitle className="text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                                Total Users
                            </CardTitle>
                            <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                                {users.length}
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                Registered accounts
                            </p>
                        </CardContent>
                    </Card>

                    {/* Solved Rate Card */}
                    <Card className="group relative overflow-hidden bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:-translate-y-1 sm:col-span-2 lg:col-span-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>

                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
                            <CardTitle className="text-xs font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                                Solved Rate
                            </CardTitle>
                            <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            {/* TO-DO: Replace with dynamic calculation if available */}
                            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                                60.7%
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                Problems successfully resolved
                            </p>
                        </CardContent>
                    </Card>

                </section>

                {/* Decorative Lower Section */}
                <section className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
                    
                    {/* Quick Actions / Activity Placeholder */}
                    <Card className="bg-white dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Activity className="w-5 h-5 text-blue-500" />
                                Quick Actions & Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 flex flex-col gap-4">
                            <Button variant="outline" className="w-full justify-between h-12 rounded-xl group hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 border-zinc-200 dark:border-zinc-800">
                                <span className="font-semibold">Review Pending Users</span>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button variant="outline" className="w-full justify-between h-12 rounded-xl group hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 border-zinc-200 dark:border-zinc-800">
                                <span className="font-semibold">Manage Content Reports</span>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* System Status Placeholder */}
                    <Card className="bg-zinc-900 dark:bg-black border-zinc-800 text-white shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                        <CardHeader className="border-b border-zinc-800 pb-4 relative z-10">
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-100">
                                <Settings className="w-5 h-5 text-zinc-400" />
                                System Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 relative z-10">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-zinc-400 font-medium">Database Load</span>
                                        <span className="text-emerald-400 font-bold">12%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-zinc-400 font-medium">Storage Capacity</span>
                                        <span className="text-blue-400 font-bold">45%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    All systems operational
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </section>

            </div>
        </div>
    )
}