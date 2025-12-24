import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function AdminSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className='space-y-6 animate-fade-in-up'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
          Settings
        </h1>
      </div>

      <Tabs defaultValue='general' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 max-w-[400px]'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value='general'>
          <Card className="mt-6 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your application general preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-1'>
                <Label htmlFor='site-name'>Site Name</Label>
                <Input id='site-name' defaultValue='Parcel DMS' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='language'>Language</Label>
                <Select defaultValue='en'>
                  <SelectTrigger id='language'>
                    <SelectValue placeholder='Select Language' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='bn'>Bengali</SelectItem>
                    <SelectItem value='es'>Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value='notifications'>
          <Card className="mt-6 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between rounded-lg border p-4 dark:border-slate-700'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Email Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive emails about new bookings.
                  </p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className='flex items-center justify-between rounded-lg border p-4 dark:border-slate-700'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>SMS Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive SMS alerts for critical updates.
                  </p>
                </div>
                <Checkbox />
              </div>
            </CardContent>
             <CardFooter>
              <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
         <TabsContent value='security'>
          <Card className="mt-6 dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and account security (Mock).
              </CardDescription>
            </CardHeader>
             <CardContent className='space-y-4'>
              <div className='space-y-1'>
                <Label htmlFor='current-password'>Current Password</Label>
                <Input id='current-password' type="password" />
              </div>
               <div className='space-y-1'>
                <Label htmlFor='new-password'>New Password</Label>
                <Input id='new-password' type="password" />
              </div>
            </CardContent>
             <CardFooter>
              <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
