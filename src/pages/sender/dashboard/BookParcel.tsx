/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import {
    type IParcel,
    ParcelType,
    ShippingType,
} from "@/types/sender.parcel.type";
import { InfoIcon, Package } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router";

const formSchema = z.object({
  type: z.enum(Object.values(ParcelType) as [string]).optional(),
  shippingType: z.enum(Object.values(ShippingType) as [string]).optional(),
  weight: z.coerce
    .number({ error: "Weight must be a number" })
    .min(0.1, { message: "Weight must be at least 0.1 kg" })
    .max(10, { message: "Weight cannot exceed 10 kg" }),
  couponCode: z
    .string({ error: "Coupon code must be a string" })
    .max(20, { message: "Coupon code cannot exceed 20 characters" })
    .optional(),
  receiverEmail: z
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  pickupAddress: z
    .string({ error: "Pickup address must be string" })
    .max(100, { message: "Pickup address cannot exceed 100 characters." })
    .optional(),
  deliveryAddress: z
    .string({ error: "Delivery address must be string" })
    .max(100, { message: "Delivery address cannot exceed 100 characters." })
    .optional(),
});

export default function BookParcel() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      receiverEmail: "",
      pickupAddress: "",
      deliveryAddress: "",
      weight: 0.1,
      type: ParcelType.PACKAGE,
      shippingType: ShippingType.STANDARD,
      couponCode: "",
    },
  });

  const [createParcel, { isLoading }] = useCreateParcelMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createParcel(values as Partial<IParcel>).unwrap();
      form.reset();
      toast.success("Parcel booked successfully");
      navigate("/sender/dashboard/parcels"); // Redirect to parcels list
    } catch (error) {
      console.error("Failed to create parcel:", error);
      toast.error("Failed to book parcel", {
        description: (error as any)?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Book a Parcel
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Create a new shipment request.
        </p>
      </div>

      <Card className="max-w-3xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <Package className="w-5 h-5 text-primary" /> Return Shipment Details
          </CardTitle>
          <CardDescription>
            Please provide accurate information for the best delivery experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name='receiverEmail'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Receiver Email</FormLabel>
                        <FormControl>
                            <Input
                            type='email'
                            placeholder='john@example.com'
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                        control={form.control}
                        name='weight'
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                                <Input
                                type='number'
                                step='0.1'
                                min='0.1'
                                {...field}
                                value={
                                    typeof field.value === "number"
                                    ? field.value
                                    : Number(field.value) || ""
                                }
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className='relative'>
                    <FormField
                        control={form.control}
                        name='pickupAddress'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pickup Address</FormLabel>
                            <FormControl>
                            <Input placeholder='Leave empty for default' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className='absolute right-0 top-0 text-muted-foreground/80'>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <InfoIcon size={16} className="mt-1 mr-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>If empty, system will use your default address</p>
                        </TooltipContent>
                        </Tooltip>
                    </div>
                    </div>

                    <div className='relative'>
                    <FormField
                        control={form.control}
                        name='deliveryAddress'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                            <Input placeholder='Leave empty for receiver default' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className='absolute right-0 top-0 text-muted-foreground/80'>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <InfoIcon size={16} className="mt-1 mr-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                            If empty, system will use receiver's default address
                            </p>
                        </TooltipContent>
                        </Tooltip>
                    </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Parcel Type</FormLabel>
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select parcel type' />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ParcelType).map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='shippingType'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Shipping Type</FormLabel>
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select shipping type' />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ShippingType).map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name='couponCode'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Coupon Code</FormLabel>
                        <FormControl>
                            <Input placeholder='e.g. DISCOUNT20' {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className='flex justify-end pt-4'>
                    <Button type='submit' disabled={isLoading} size="lg" className="min-w-[150px]">
                        {isLoading ? <Spinner variant={"circle-filled"} /> : "Book Parcel"}
                    </Button>
                </div>
              </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
