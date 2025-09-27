// src/pages/TrackingPage.tsx
import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck,
  Search,
  AlertCircle,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export interface TimelineEvent {
  id: number;
  status: 'package_received' | 'in_transit' | 'arrived_at_facility' | 'out_for_delivery' | 'delivered';
  description: string;
  location: string;
  timestamp: string | null;
  completed: boolean;
}

export interface ShipmentData {
  trackingId: string;
  status: 'package_received' | 'in_transit' | 'arrived_at_facility' | 'out_for_delivery' | 'delivered';
  statusText: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  sender: string;
  receiver: string;
  weight: string;
  dimensions: string;
  timeline: TimelineEvent[];
}

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData: ShipmentData = {
    trackingId: 'SW123456789',
    status: 'in_transit',
    statusText: 'In Transit',
    estimatedDelivery: '2024-12-28T15:00:00',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    sender: 'John Smith',
    receiver: 'Sarah Johnson',
    weight: '2.5 kg',
    dimensions: '30x20x15 cm',
    timeline: [
      {
        id: 1,
        status: 'package_received',
        description: 'Package received at facility',
        location: 'New York Sorting Center',
        timestamp: '2024-12-25T10:30:00',
        completed: true
      },
      {
        id: 2,
        status: 'in_transit',
        description: 'Package in transit to destination',
        location: 'In Transit',
        timestamp: '2024-12-26T08:15:00',
        completed: true
      },
      {
        id: 3,
        status: 'arrived_at_facility',
        description: 'Arrived at destination facility',
        location: 'Los Angeles Distribution Center',
        timestamp: '2024-12-27T14:20:00',
        completed: false
      },
      {
        id: 4,
        status: 'out_for_delivery',
        description: 'Out for delivery',
        location: 'Los Angeles, CA',
        timestamp: null,
        completed: false
      },
      {
        id: 5,
        status: 'delivered',
        description: 'Package delivered',
        location: 'Los Angeles, CA',
        timestamp: null,
        completed: false
      }
    ]
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTrackingData(mockTrackingData);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in_transit': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'out_for_delivery': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'in_transit': return Truck;
      case 'out_for_delivery': return Truck;
      default: return Package;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-sm">
              <Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Track Your Package
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enter your tracking number below to get real-time updates on your package location 
            and estimated delivery time.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleTrack} className="space-y-6">
                <div>
                  <label htmlFor="trackingId" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Enter Tracking Number
                  </label>
                  <div className="flex space-x-4">
                    <Input
                      id="trackingId"
                      type="text"
                      placeholder="e.g., SW123456789"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="flex-1 border-gray-300 dark:border-gray-600 text-lg py-3"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !trackingId.trim()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    >
                      {isLoading ? (
                        <>Tracking...</>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Enter the tracking number provided in your confirmation email
                  </p>
                </div>
              </form>

              {!trackingId && (
                <div className="mt-8 p-6 bg-slate-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Don't have a tracking number?</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Check your email for the confirmation message sent after your shipment was processed. 
                    If you can't find it, please contact our support team.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="py-20 bg-slate-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            {/* Package Summary */}
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Tracking Number</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{trackingData.trackingId}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Status</div>
                    <div className={`font-semibold px-3 py-1 rounded-full text-sm inline-block ${getStatusColor(trackingData.status)}`}>
                      {trackingData.statusText}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Est. Delivery</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Receiver</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{trackingData.receiver}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Delivery Timeline</h3>
                
                <div className="space-y-4">
                  {trackingData.timeline.map((event, index) => {
                    const StatusIcon = getStatusIcon(event.status);
                    return (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          event.completed 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{event.description}</h4>
                            {event.timestamp && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{event.location}</p>
                          
                          {index < trackingData.timeline.length - 1 && (
                            <div className={`h-6 border-l-2 ml-4 mt-2 ${
                              event.completed 
                                ? 'border-green-200 dark:border-green-800' 
                                : 'border-gray-200 dark:border-gray-700'
                            }`}></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Package Details */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Package Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Weight:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{trackingData.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Dimensions:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{trackingData.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Sender:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{trackingData.sender}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Route Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">From</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{trackingData.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">To</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{trackingData.destination}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      {!trackingData && (
        <section className="py-20 bg-slate-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Need Help Tracking Your Package?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: AlertCircle,
                  title: "Can't find tracking number?",
                  description: "Check your email inbox for the confirmation message sent after shipment processing."
                },
                {
                  icon: Clock,
                  title: "Tracking not updating?",
                  description: "It may take up to 24 hours for tracking information to appear in our system."
                },
                {
                  icon: User,
                  title: "Still need help?",
                  description: "Contact our support team for immediate assistance with your tracking issues."
                }
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}