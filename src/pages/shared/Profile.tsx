import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().optional(),
});

type TProfileSchema = z.infer<typeof profileSchema>;

const Profile = () => {
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      form.reset({
        name: userData.data.name,
        email: userData.data.email,
        phone: userData.data.phone || "",
      });
    }
  }, [userData, form]);

  const onSubmit = async (values: TProfileSchema) => {
    try {
      const res = await updateProfile({
        id: userData?.data?._id || "",
        ...values,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || "Profile updated successfully");
      }
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (isUserLoading) {
    return (
      <div className='p-8'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6'></div>
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6'></div>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
        My Profile
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your full name'
                        disabled={isLoading}
                        className='py-3 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-sm' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='Your email address'
                        disabled={true} // Email cannot be changed
                        className='py-3 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-sm' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Your phone number'
                        disabled={isLoading}
                        className='py-3 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-sm' />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200'
                disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </div>

        <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
          <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>
            Account Information
          </h3>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Role</p>
              <p className='font-medium text-gray-900 dark:text-white capitalize'>
                {userData?.data.role}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Status</p>
              <div className='flex items-center'>
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    userData?.data.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}></span>
                <p className='font-medium text-gray-900 dark:text-white capitalize'>
                  {userData?.data.status}
                </p>
              </div>
            </div>
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Account Created
              </p>
              <p className='font-medium text-gray-900 dark:text-white'>
                {userData?.data.createdAt
                  ? new Date(userData.data.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
