import { Button } from "@/components/ui/button";
import { SendToBackIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900 ">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* 404 Visual */}
        <div className="space-y-4">
          <div className="text-6xl font-bold text-muted-foreground">404</div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. The page you're
            searching for might have been moved or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <SendToBackIcon className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}