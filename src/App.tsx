import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/layout/loading/LoadingSpinner";

function App() {
  const { isLoading } = useAuth();
  // Show loading spinner while initializing app
  if (isLoading) {
    return <LoadingSpinner text='Initializing app...' />;
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
