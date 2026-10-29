import type { ReactNode } from 'react';
import SidebarNav from './SidebarNav';
import TopBar from './TopBar';

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full items-center">
      <SidebarNav />
      <div className="flex h-full min-w-px flex-[1_0_0] flex-col items-start">
        <TopBar title={title} />
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
