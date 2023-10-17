"use client";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    disabled: boolean;
    onRemove: (value: string) => void;
    onChange: (value: string) => void;
    value: string[];
}

const ImageUpload = ({ disabled, onChange, onRemove, value }: ImageUploadProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!mounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden ">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image fill className="object-fill" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="image" src={url} />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="lk6fg9sz">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant='secondary'
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload an image
                        </Button>
                        )
                }}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
