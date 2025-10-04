/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { getRoleBasedPathPrefix } from "@/hooks/useSidebarLinks";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Package } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // Recommended to use react-router-dom
import { toast } from "sonner";
import { z } from "zod";

// Form validation schema
const createParcelSchema = z.object({
  receiverEmail: z.string().email({ message: "Please provide a valid email" }),
  // FIX: Used a literal array for z.enum to ensure correct type inference.
  type: z.enum(["document", "package", "fragile", "electronics"]),
  shippingType: z.enum(["standard", "express", "same_day", "overnight"]),
  weight: z.coerce
    .number()
    .positive({ message: "Weight must be a positive number" }),
  deliveryAddress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .optional()
    .or(z.literal("")), // Allows empty string
  pickupAddress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .optional()
    .or(z.literal("")), // Allows empty string
  couponCode: z.string().optional().or(z.literal("")), // Allows empty string
});

type CreateParcelFormValues = z.infer<typeof createParcelSchema>;

export default function CreateParcel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const form = useForm<CreateParcelFormValues>({
    resolver: zodResolver(createParcelSchema) as any,
    defaultValues: {
      receiverEmail: "",
      type: "package",
      shippingType: "standard",
      weight: 1,
      deliveryAddress: "",
      pickupAddress: "",
      couponCode: "",
    },
  });

  const onSubmit = async (data: CreateParcelFormValues) => {
    try {
      // Filter out empty optional fields before sending to the backend
      const payload = { ...data };
      if (!payload.deliveryAddress) delete payload.deliveryAddress;
      if (!payload.pickupAddress) delete payload.pickupAddress;
      if (!payload.couponCode) delete payload.couponCode;

      const response = await createParcel(payload).unwrap();

      if (response.success) {
        toast.success("Parcel created successfully!");
        const basePath = getRoleBasedPathPrefix(user?.role);
        navigate(`${basePath}/dashboard/my-parcels`);
      }
    } catch (err: unknown) {
      // FIX: More robust error handling to show specific backend messages
      console.error("Parcel creation error:", err);
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        (err as { message?: string })?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className='container mx-auto max-w-4xl py-6'>
      <div className='mb-8 flex items-center gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900'>
          <Package className='h-6 w-6 text-blue-600 dark:text-blue-400' />
        </div>
        <div>
          <h1 className='text-2xl font-bold'>Create New Parcel</h1>
          <p className='text-muted-foreground'>
            Fill in the details to schedule your shipment.
          </p>
        </div>
      </div>

      <Card className='border-0 shadow-sm'>
        <CardHeader>
          <CardTitle>Parcel Details</CardTitle>
          <CardDescription>
            Provide accurate information for a smooth delivery process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Receiver Email */}
                <FormField
                  control={form.control}
                  name='receiverEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver's Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='receiver@example.com'
                          {...field}
                          type='email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weight */}
                <FormField
                  control={form.control}
                  name='weight'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          min='0.1'
                          placeholder='e.g., 1.5'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Parcel Type */}
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parcel Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='document'>Document</SelectItem>
                          <SelectItem value='package'>Package</SelectItem>
                          <SelectItem value='fragile'>Fragile</SelectItem>
                          <SelectItem value='electronics'>
                            Electronics
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Shipping Type */}
                <FormField
                  control={form.control}
                  name='shippingType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a method' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='standard'>Standard</SelectItem>
                          <SelectItem value='express'>Express</SelectItem>
                          <SelectItem value='same_day'>Same Day</SelectItem>
                          <SelectItem value='overnight'>Overnight</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Address */}
                <FormField
                  control={form.control}
                  name='deliveryAddress'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>Delivery Address (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Leave empty to use the receiver's default address"
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pickup Address */}
                <FormField
                  control={form.control}
                  name='pickupAddress'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>Pickup Address (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Leave empty to use your default address'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Coupon Code */}
                <FormField
                  control={form.control}
                  name='couponCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., DISCOUNT10' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end'>
                <Button
                  type='submit'
                  className='w-full md:w-auto'
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Processing...
                    </>
                  ) : (
                    <>
                      Create Parcel <ArrowRight className='ml-2 h-4 w-4' />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
