"use client"

import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import {
    formatBytes,
    useFileUpload,
    type FileMetadata,
    type FileWithPreview,
} from "@/hooks/use-file-upload"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Spinner } from "@/Components/ui/spinner"
import { ImageIcon, UploadIcon, XIcon, ZoomInIcon } from 'lucide-react'
import { useNotify } from "@/Context/NotifyContext/NotifyContextProvider"
import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers"

interface GalleryUploadProps {
    maxFiles?: number
    maxSize?: number
    accept?: string
    multiple?: boolean
    className?: string
    onFilesChange?: (files: FileWithPreview[]) => void
}

type FilesUploadRef = { clearFiles: () => void }

export const FilesUpload = forwardRef<FilesUploadRef, GalleryUploadProps>((
    { maxFiles = 10,
        maxSize = 5 * 1024 * 1024, // 5MB
        accept = "image/*",
        multiple = true,
        className,
        onFilesChange }
    , ref
) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
    const [isPreviewLoading, setIsPreviewLoading] = useState(false)
    const { toastMessage } = useNotify()

    const [
        { files, isDragging, errors },
        {
            removeFile,
            clearFiles,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            getInputProps,
        },
    ] = useFileUpload({
        maxFiles,
        maxSize,
        accept,
        multiple,
        initialFiles: [],
        onFilesChange,
    })

    useImperativeHandle(ref, () => ({
        clearFiles,
    }));

    const isImage = (file: File | FileMetadata) => {
        const type = file instanceof File ? file.type : file.type
        return type.startsWith("image/")
    }

    useEffect(() => {
        const uniqueErrors = [...new Set(errors)];

        uniqueErrors.forEach((error) => {
            toastMessage(error, "error");
        });
    }, [errors]);


    return (
        <div className={cn("w-full max-w-4xl", className)}>
            {/* Upload Area */}
            <div
                className={cn(
                    "rounded-lg relative border border-dashed p-8 text-center transition-colors",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input {...getInputProps()} className="sr-only" />

                <div className="flex flex-col items-center gap-4">
                    <div
                        className={cn(
                            "flex h-16 w-16 items-center justify-center rounded-full",
                            isDragging ? "bg-primary/10" : "bg-muted"
                        )}
                    >
                        <ImageIcon />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Upload images to gallery</h3>
                        <p className="text-muted-foreground text-sm">
                            Drag and drop images here or click to browse
                        </p>
                        <p className="text-muted-foreground text-xs">
                            PNG, JPG, GIF up to {formatBytes(maxSize)} each (max {maxFiles}{" "}
                            files)
                        </p>
                    </div>

                    <Button onClick={(e) => {
                        e.preventDefault();
                        openFileDialog();
                    }
                    }>
                        <UploadIcon className="h-4 w-4" />
                        Select images
                    </Button>
                </div>
            </div>

            {/* Gallery Stats */}
            {files.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h4 className="text-sm font-medium">
                            Gallery ({files.length}/{maxFiles})
                        </h4>
                        <div className="text-muted-foreground text-xs">
                            Total:{" "}
                            {formatBytes(
                                files.reduce((acc, file) => acc + file.file.size, 0)
                            )}
                        </div>
                    </div>
                    <Button onClick={clearFiles} variant="outline" size="sm">
                        Clear all
                    </Button>
                </div>
            )}

            {/* Image Grid */}
            {files.length > 0 && (
                <div className="m-2 flex gap-2">
                    {files.map((fileItem) => (
                        <div
                            key={fileItem.id}
                            className="group/item relative aspect-square border  sm:w-24"
                        >
                            {isImage(fileItem.file) && fileItem.preview ? (
                                <>
                                    {loadingImages[fileItem.id] !== false && (
                                        <div className="bg-muted/50 rounded-lg absolute inset-0 flex items-center justify-center border">
                                            <Spinner className="text-muted-foreground size-6" />
                                        </div>
                                    )}
                                    <img
                                        src={fileItem.preview}
                                        alt={fileItem.file.name}
                                        onLoad={() =>
                                            setLoadingImages((prev) => ({
                                                ...prev,
                                                [fileItem.id]: false,
                                            }))
                                        }
                                        className={cn(
                                            "rounded-lg h-full w-full border  object-cover transition-all group-hover/item:scale-105",
                                            loadingImages[fileItem.id] !== false
                                                ? "opacity-0"
                                                : "opacity-100"
                                        )}
                                    />
                                </>
                            ) : (
                                <div className="bg-muted rounded-lg flex h-full w-full items-center justify-center border">
                                    <ImageIcon className="text-muted-foreground h-8 w-8" />
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="bg-black/50 absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover/item:opacity-100">
                                {/* View Button */}
                                {fileItem.preview && (
                                    <Button
                                        onClick={() => {
                                            setSelectedImage(fileItem.preview!)
                                            setIsPreviewLoading(true)
                                        }}
                                        variant="secondary"
                                        size="icon"
                                        className="size-7"
                                    >
                                        <ZoomInIcon className="opacity-100/80" />
                                    </Button>
                                )}

                                {/* Remove Button */}
                                <Button
                                    onClick={() => removeFile(fileItem.id)}
                                    variant="secondary"
                                    size="icon"
                                    className="size-7"
                                >
                                    <XIcon className="opacity-100/8" />
                                </Button>
                            </div>

                            {/* File Info */}
                            <div className="rounded-b-lg absolute right-0 bottom-0 left-0 bg-black/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="truncate text-xs font-medium">
                                    {fileItem.file.name}
                                </p>
                                <p className="text-xs text-gray-300">
                                    {formatBytes(fileItem.file.size)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
)