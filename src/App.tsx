import { Outlet } from "react-router";
import AppSkeleton from "./components/shared/skeletons/AppSkeleton";
import CommonLayout from "./components/layout/CommonLayout";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isLoading } = useAuth();
  // Show loading skeleton while initializing app
  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;
