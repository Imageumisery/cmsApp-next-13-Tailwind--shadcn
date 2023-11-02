"use client";
import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface ColorFormProps {
    initialData: Color | null;
}

const formSchema = z.object({
    name: z.string().min(2),
    colorValue: z.string(),
});

type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm = ({ initialData }: ColorFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>("");
    useEffect(() => {
        if (initialData?.colorValue) {
            setColor(initialData.colorValue);
        }
    }, []);

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit color." : "Adding a new type of color";
    const toastMessage = initialData ? "Color updated." : "Color created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            colorValue: "",
        },
    });

    const onSubmit = async (data: ColorFormValues) => {
        try {
            data.colorValue = color;
            setLoading(true);
            if (initialData) {
                axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
            } else {
                axios.post(`/api/${params.storeId}/colors`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/colors`);
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
            axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
            router.refresh();
            router.push(`/${params.storeId}/colors`);
            toast.success("Color deleted!");
        } catch (error) {
            toast.error("Something went wrong.");
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
                    <div className="md:grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-72"
                                            disabled={loading}
                                            placeholder="Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <ChromePicker
                                        color={color}
                                        onChangeComplete={(pickedColor) => setColor(pickedColor.hex)}
                                    />
                                    <FormControl>
                                        <Input className="hidden" {...field} disabled={loading} />
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

export default ColorForm;
