import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

function MobileLayout() {
  return (
    <div className="mx-auto min-h-dvh w-[375px] bg-white">
      <Header />
      <main className="pb-[96px]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default MobileLayout;
