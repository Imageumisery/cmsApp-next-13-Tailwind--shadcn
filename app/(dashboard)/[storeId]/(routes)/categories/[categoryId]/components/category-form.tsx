"use client";
import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[];
}

const formSchema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category." : "Add a new category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        },
    });

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
            } else {
                axios.post(`/api/${params.storeId}/categories`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`);
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
            axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
            router.refresh();
            router.push("/");
            toast.success("Category deleted!");
        } catch (error) {
            toast.error("Make sure you removed all products using this category first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return (
        <div>
            <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onSubmit={onDelete} />
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={loading || billboards.length == 0}
                                        value={field.value}
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={field.value}
                                                placeholder={
                                                    billboards.length == 0
                                                        ? "No billboards created yet"
                                                        : "Select a Billboard"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem key={billboard.id} value={billboard.id}>
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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

export default CategoryForm;
