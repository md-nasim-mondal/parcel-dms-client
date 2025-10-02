// pages/dashboard/admin/AdminDashboard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, BarChart3, Settings, Eye, Edit } from "lucide-react";
import { Link } from "react-router";

export default function AdminDashboard() {
  const systemStats = {
    totalUsers: 156,
    totalParcels: 342,
    pendingParcels: 23,
    deliveredToday: 45,
  };

  const recentActivities = [
    {
      id: 1,
      action: "Parcel Created",
      user: "john@example.com",
      time: "2 minutes ago",
      details: "TRK123461",
    },
    {
      id: 2,
      action: "Delivery Confirmed",
      user: "sarah@example.com",
      time: "5 minutes ago",
      details: "TRK123458",
    },
    {
      id: 3,
      action: "User Registered",
      user: "newuser@example.com",
      time: "10 minutes ago",
      details: "Receiver",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage system operations and monitor activities
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {systemStats.totalUsers}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Parcels
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {systemStats.totalParcels}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Pending
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {systemStats.pendingParcels}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Delivered Today
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {systemStats.deliveredToday}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link to="/admin/parcels">
                  <Package className="w-5 h-5 mb-1" />
                  <span>Manage Parcels</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link to="/admin/users">
                  <Users className="w-5 h-5 mb-1" />
                  <span>Manage Users</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link to="/admin/analytics">
                  <BarChart3 className="w-5 h-5 mb-1" />
                  <span>Analytics</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 flex-col">
                <Link to="/admin/settings">
                  <Settings className="w-5 h-5 mb-1" />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activity.user} • {activity.time}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.details}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}