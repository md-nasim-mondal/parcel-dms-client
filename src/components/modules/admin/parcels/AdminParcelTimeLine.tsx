import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatusLog } from "@/types/sender.parcel.type";
import { format } from "date-fns";
import {
  CheckCircle,
  Clock,
  Flag,
  Package,
  Shield,
  Truck,
  XCircle,
} from "lucide-react";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "In-Transit":
      return <Truck className="w-5 h-5 text-blue-500" />;
    case "Dispatched":
      return <Truck className="w-5 h-5 text-purple-500" />;
    case "Picked":
      return <Package className="w-5 h-5 text-orange-500" />;
    case "Approved":
      return <CheckCircle className="w-5 h-5 text-yellow-500" />;
    case "Requested":
      return <Clock className="w-5 h-5 text-gray-500" />;
    case "Rescheduled":
      return <Clock className="w-5 h-5 text-indigo-500" />;
    case "Returned":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "Cancelled":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "Blocked":
      return <Shield className="w-5 h-5 text-red-500" />;
    case "Flagged":
      return <Flag className="w-5 h-5 text-yellow-500" />;
    default:
      return <Package className="w-5 h-5 text-gray-500" />;
  }
};

const AdminParcelTimeLine = ({ statusLog }: { statusLog: StatusLog[] }) => {
  return (
    <div className="lg:col-span-2">
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle>Tracking Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {statusLog.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {getStatusIcon(item?.status)}
                  </div>
                  {index < statusLog.length - 1 && (
                    <div className="w-0.5 h-12 bg-muted mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className=" flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="font-semibold mb-2 md:mb-0">
                      {item?.status}
                    </h4>

                    <span className="text-sm text-muted-foreground">
                      {format(
                        new Date(item?.updatedAt).toLocaleString(),
                        "PP h:mm a"
                      )}
                    </span>
                    <span className="text-sm text-muted-foreground"></span>
                  </div>
                  {item?.location && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {item?.location}
                    </p>
                  )}
                  {item?.updatedBy && (
                    <p className="text-sm text-muted-foreground mb-1">
                      Updated by: {item?.updatedBy?.name},{" "}
                      {item?.updatedBy?.role}
                    </p>
                  )}
                  <p className="text-sm">{item?.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminParcelTimeLine;
