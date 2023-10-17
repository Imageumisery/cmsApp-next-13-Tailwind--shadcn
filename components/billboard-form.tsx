"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import AlertModal from "./modals/AlertModal";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import Heading from "./ui/heading";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import ImageUpload from "./image-upload";

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm = ({ initialData }: BillboardFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? 'Edit billboard' : 'Create billboard';
    const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
    const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                axios.post(`/api/${params.storeId}/billboards`, data);
            }

            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            axios.delete(`/api/stores/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push("/");
            toast.success("Billboard deleted!");
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return (
        <div>
            <AlertModal 
                isOpen={open} 
                loading={loading} 
                onClose={() => setOpen(false)} 
                onSubmit={onDelete} 
                />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator className="mt-4 mb-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 w-full">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Backround image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value]: []}
                                        disabled={loading} 
                                        onChange={(url:string) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        />
                                        
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="ml-auto">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default BillboardForm;
