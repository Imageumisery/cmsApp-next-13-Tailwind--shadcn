"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/hooks/useStoreModal";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState<boolean>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const response = await axios.post("/api/stores", values);
            console.log(response.data);
            toast.success("Store created!");
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="New store name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-6 space-x-2 flex justify-end">
                        <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                            Cancel
                        </Button>
                        <Button disabled={loading} type="submit">
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
};

export default StoreModal;
