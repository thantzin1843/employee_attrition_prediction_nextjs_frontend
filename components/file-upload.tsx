// 'use client'

// import React from "react"

// import { useCallback, useState } from 'react'
// import { Upload, FileSpreadsheet, X } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { Button } from "./ui/button"


// interface FileUploadProps {
//   onFileSelect: (file: File | null) => void
//   accept?: string
//   maxSize?: number // in MB
// }

// export function FileUpload({ 
//   onFileSelect, 
//   accept = '.csv',
//   maxSize = 10 ,
// }: FileUploadProps) {
//   const [isDragging, setIsDragging] = useState(false)
//   const [file, setFile] = useState<File | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   const handleFile = useCallback((selectedFile: File) => {
//     setError(null)
//     // Check file type
//     if (!selectedFile.name.endsWith('.csv')) {
//       setError('Please upload a CSV file')
//       return
//     }
    
//     // Check file size
//     if (selectedFile.size > maxSize * 1024 * 1024) {
//       setError(`File size must be less than ${maxSize}MB`)
//       return
//     }
    
//     setFile(selectedFile)
//     console.log(selectedFile)
//     onFileSelect(selectedFile)
//   }, [maxSize, onFileSelect])

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
    
//     const droppedFile = e.dataTransfer.files[0]
//     if (droppedFile) {
//       handleFile(droppedFile)
//     }
//   }, [handleFile])

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }, [])

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//   }, [])

//   const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0]
//     if (selectedFile) {
//       handleFile(selectedFile)
//     }
//   }, [handleFile])

//   const removeFile = useCallback(() => {
//     setFile(null)
//     setError(null)
//     onFileSelect(null)
//   }, [onFileSelect])

//   return (
//     <div className="space-y-4">
//       <div
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         className={cn(
//           'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all',
//           isDragging 
//             ? 'border-primary bg-primary/5' 
//             : 'border-border bg-card hover:border-primary/50 hover:bg-secondary/50',
//           file && 'border-success bg-success/5'
//         )}
//       >
//         <input
//           type="file"
//           accept={accept}
//           onChange={handleInputChange}
//           className="absolute inset-0 cursor-pointer opacity-0"
//         />
        
//         {file ? (
//           <div className="flex items-center gap-3">
//             <FileSpreadsheet className="h-10 w-10 text-success" />
//             <div>
//               <p className="font-medium text-foreground">{file.name}</p>
//               <p className="text-sm text-muted-foreground">
//                 {(file.size / 1024).toFixed(1)} KB
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 removeFile()
//               }}
//               className="ml-4 rounded-full p-1 hover:bg-muted"
//             >
//               <X className="h-5 w-5 text-muted-foreground" />
//             </button>
//           </div>
//         ) : (
//           <>
//             <Upload className="h-12 w-12 text-muted-foreground" />
//             <p className="mt-4 text-center font-medium text-foreground">
//               Drag and drop your CSV file here
//             </p>
//             <p className="mt-1 text-sm text-muted-foreground">
//               or click to browse
//             </p>
//             <p className="mt-2 text-xs text-muted-foreground">
//               CSV files only, max {maxSize}MB
//             </p>
//           </>
//         )}
//       </div>

       
      
//       {error && (
//         <p className="text-sm text-destructive">{error}</p>
//       )}
//     </div>
//   )
// }
// ============================================================================================

'use client'

import { Upload, FileSpreadsheet, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  file: File | null
  onFileSelect: (file: File | null) => void
  error?: string | null
  accept?: string
  maxSize?: number // MB
}

export function FileUpload({
  file,
  onFileSelect,
  error,
  accept = '.csv',
  maxSize = 10,
}: FileUploadProps) {

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      onFileSelect(null)
      return
    }

    if (selectedFile.size > maxSize * 1024 * 1024) {
      onFileSelect(null)
      return
    }

    onFileSelect(selectedFile)
  }

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition',
          file ? 'border-success bg-success/5' : 'border-border hover:border-primary'
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        {file ? (
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="h-8 w-8 text-success" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            {/* <button
              type="button"
              onClick={() => onFileSelect(null)}
              className="ml-2"
            >
              <X />
            </button> */}
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 font-medium">Drag & drop CSV here</p>
            <p className="text-sm text-muted-foreground">
              or click to browse (max {maxSize}MB)
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
