import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/modulesLayout/Breadcrumb";
import Header from "@/components/layout/modulesLayout/Header";
import Sidebar from "@/components/layout/modulesLayout/Sidebar";
import Tabs from "@/components/layout/modulesLayout/Tabs";
import TabSync from "@/components/layout/modulesLayout/TabSync";
import { getActiveSession } from "@/lib/auth/activeSession";
import { getCurrentUser } from "@/lib/auth/session";

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    const [user, session] = await Promise.all([getCurrentUser(), getActiveSession()]);
    
    return (
        <main className='min-h-screen'>
            <div className='relative mx-auto flex'>                
                <aside className='hidden lg:flex flex-col sticky top-0 h-screen shrink-0 border-r border-[#dfe3ea] bg-white transition-all duration-300 ease-in-out'>
                    <Sidebar user={user} />
                </aside>

                <div className='min-w-0 flex-1 flex flex-col'>
                    <Header user={user} session={session} />

                    <main className='flex-1 mt-4'>
                        <TabSync />
                        <Tabs />
                        
                        <div className='w-full h-full bg-[#fbfbfb] flex flex-col gap-4 p-4'>
                            <Breadcrumb />
                            
                            <div className='rounded-[8px] border border-[#dfe3ea] bg-white p-3 shadow-sm md:p-5'>
                                {children}
                            </div>
                        </div>
                    </main>
                    
                    <Footer session={session} />
                </div>
                
            </div>
        </main>
    );
}