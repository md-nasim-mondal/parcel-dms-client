import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: React.ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950'>
      <Navbar />
      <main className='flex-1 flex flex-col overflow-x-hidden'>{children}</main>
      <Footer />
    </div>
  );
}
