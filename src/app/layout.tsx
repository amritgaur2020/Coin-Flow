import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { Home, List, LineChart, Wallet, Cog, CircleUserRound } from 'lucide-react';
import { AppProvider } from '@/context/AppContext';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CoinFlow',
  description: 'Your Crypto Wallet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AppProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-primary">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-12h2v2h-2zm0 4h2v6h-2z" />
                  </svg>
                  <span className="text-xl font-semibold">CoinFlow</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard" asChild>
                      <Link href="/dashboard">
                        <Home />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                     <SidebarMenuButton tooltip="Portfolio" asChild>
                        <Link href="/portfolio">
                          <List />
                          <span>Portfolio</span>
                        </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Trade" asChild>
                      <Link href="/trade">
                        <LineChart />
                        <span>Trade</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Wallet" asChild>
                      <Link href="/wallet">
                        <Wallet />
                        <span>Wallet</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="p-4 flex flex-col gap-2">
                 <SidebarMenu>
                   <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Cog />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Profile">
                      <CircleUserRound />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                 </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="flex items-center justify-end p-4 h-16 border-b">
                <SidebarTrigger className="md:hidden" />
                <Button>Connect Wallet</Button>
              </header>
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  );
}
