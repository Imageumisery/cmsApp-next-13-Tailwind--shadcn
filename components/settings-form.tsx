"use client";
import React, { InputHTMLAttributes, useState } from "react";
import Heading from "./ui/heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { store } from "@prisma/client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "./modals/AlertModal";

interface SettingFormProps {
    initialData: store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }: SettingFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const params = useParams();
    const router = useRouter();

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated!");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted!");
        } catch (error) {
            toast.error("Something went wrong");
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
                // name={initialData.name}
            />
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences" />
                <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator className="mt-4 mb-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="ml-auto">
                        Save changes
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SettingsForm;
