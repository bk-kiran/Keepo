"use client"

import { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, FileText } from "lucide-react"



const Receipt = () => {
    const params = useParams<{id: string}>()
    const [receiptId, setReceiptId] = useState<string | null>(null)
    const router = useRouter()

    const receipt = useQuery(
        api.receipts.getReceiptById,
        receiptId ? {receiptId: receiptId as Id<"receipts">} : "skip",
    )

    const fileId = receipt?.fileId
    const downloadUrl = useQuery(
        api.receipts.getReceiptDownloadUrl,
        fileId ? {receiptId: fileId} : "skip",
    ) 

    useEffect(() => {
        try {
            const id = params.id as Id<"receipts">
            setReceiptId(id)

        } catch (error) {
            console.error("Invalid receipt ID", error)
            router.push("/")
        }
    }, [params.id, router])

    if (receipt === undefined) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 mx-auto mb-4"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading receipt...</p>
            </div>
        )
    }

    if (receipt === null) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Receipt Not Found</h1>
                    <p className="mb-6">
                        The receipt you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link href="/receipts" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Return Home
                    </Link>
                </div>
            </div>
        )
    }

    const hasExtractedData = !! (
        receipt.merchantName||
        receipt.merchantAddress ||
        receipt.transactionDate ||
        receipt.transactionAmount
    )

    const uploadDate = receipt.uploadedAt 
    ? new Date(receipt.uploadedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    : 'N/A'

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <nav className="mb-6">
                    <Link href="/receipts" className="text-blue-500 hover:underline flex items-center">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Receipts
                    </Link>
                </nav>

                <div className="bg-white shadow-md rounded-lg overflow-hidden md-6">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6 gap-4">
                            <h1 className="text-2xl font-bold text-gray-900 truncate flex-1 min-w-0">
                                {receipt.fileDisplayName || receipt.fileName}
                            </h1>
                            <div className="flex items-center flex-shrink-0">
                                {receipt.status === "pending" ? (
                                    <div className="mr-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-800"></div>
                                    </div>
                                ) : null}
                                <span className={`px-3 py-1 rounded-full text-sm ${receipt.status === "pending" ? "bg-yellow-100 text-yellow-800"
                                    : receipt.status === "processed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}>
                                    {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        File Information
                                    </h3>
                                    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Uploaded</p>
                                                <p className="font-medium">{uploadDate}</p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500">Size</p>
                                                <p className="font-medium">{formatFileSize(receipt.size)}</p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500">Type</p>
                                                <p className="font-medium">{receipt.mimetype}</p>
                                            </div>

                                            <div>
                                                <p className="text-gray-500">ID</p>
                                                <p className="font-medium truncate">title{receipt._id}
                                                    {receipt._id.slice(0,10)}...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg mt-6">
                            <div className="text-center">
                                <FileText className="h-16 w-16 text-blue-500 mx-auto"/>
                                <p className="mt-4 text-sm text-gray-500">PDF Preview</p>
                                {downloadUrl && (
                                    <a
                                    href={downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        View PDF
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Extracted Data */}
                        {hasExtractedData && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Receipt Details
                                </h3>
                            </div>
                        )}
                                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receipt;

function formatFileSize(size: number) {
    if (size === 0) return "0 Bytes"
    const k = 1024
    const units = ["Bytes", "KB", "MB", "GB", "TB"]
    const index = Math.floor(Math.log(size) / Math.log(1024))
    return parseFloat((size / Math.pow(k, index)).toFixed(2)) + " " + units[index]
}

function formatCurrency(amount: number, currency: string = ""): string {
    return `${amount.toFixed(2)}${currency ? `${currency}`: ""}`
}

