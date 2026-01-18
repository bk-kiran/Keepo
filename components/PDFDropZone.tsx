"use client"

import { useState, useCallback, useRef } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { uploadPDF } from "@/actions/uploadPDF";
import { CheckCircle, CloudUpload } from "lucide-react";
import { Button } from "./ui/button";

function PDFDropzone() {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {user} = useUser();

    // Set up sensors for drag detection
    const sensors = useSensors(useSensor(PointerSensor));

    const handleUpload = useCallback(async (files: FileList | File[]) => {
        if (!user) {
            toast.error("Please sign in to upload receipts");
            return;
        }

        const fileArray = Array.from(files);
        const pdfFiles = fileArray.filter(file => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));

        if (pdfFiles.length === 0) {
            toast.error("Please upload only PDF files");
            return;
        }

        setIsUploading(true);

        try {
            const newUploadedFiles: string[] = []

            for (const file of pdfFiles) {
                const formData = new FormData();
                formData.append("file", file);
                const result = await uploadPDF(formData);

                if (!result.success) {
                    toast.error(result.error);
                    continue;
                }

                newUploadedFiles.push(file.name);
            }

            setUploadedFiles(prevFiles => [...prevFiles, ...newUploadedFiles]);

            setTimeout(() => {
                setUploadedFiles([])
            }, 5000)

            router.push("/receipts");
        } catch (error) {
            toast.error("Failed to upload receipts");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    }, [user, router]);


    // Handle file drop via native browser events for better PDF support
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        
        if (!user) {
            toast.error("Please sign in to upload receipts");
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
            return;
        }

    }, [user, handleUpload]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUpload(e.target.files);
        }
    }, [handleUpload]);

    const triggerFileInput = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const isUserSignedIn = !!user
    const canUpload = isUserSignedIn

    return (
        <DndContext sensors={sensors}>
            <div className="w-full max-w-2xl mx-auto px-4">
                <div
                    onDragOver={canUpload ? handleDragOver : undefined}
                    onDragLeave={canUpload ? handleDragLeave : undefined}
                    onDrop={canUpload ? handleDrop : (e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-colors ${
                        isDraggingOver ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-gray-300 dark:border-gray-700"
                    } ${!canUpload ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600 dark:text-gray-400">Uploading...</p>
                        </div>
                    ) : !isUserSignedIn ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <CloudUpload className="h-12 w-12 text-gray-400 dark:text-gray-500"/>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Please sign in to upload receipts</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <CloudUpload className="h-12 w-12 text-gray-400 dark:text-gray-500"/>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Drag and drop your receipts here or click to upload</p>
                            <input type="file" ref={fileInputRef} accept="application/pdf, .pdf" multiple onChange={handleFileChange} className="hidden"/>
                            <Button
                                className="mt-2"
                                onClick={triggerFileInput}
                            >
                                Select Files
                            </Button>
                        </div>
                    )}
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="mt-6 text-center">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Uploaded Files</h3>
                        <ul className="space-y-2">
                            {uploadedFiles.map((fileName, i) => (
                                <li key={i} className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="truncate">{fileName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </DndContext>
    );
}

export default PDFDropzone;