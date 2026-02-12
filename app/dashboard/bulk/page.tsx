// 'use client'

// import { useState } from 'react'
// import { Download, CheckCircle, FileSpreadsheet } from 'lucide-react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { FileUpload } from '@/components/file-upload'
// import { predictBulkAttrition } from '@/services/api'
// import axios from 'axios'

// export default function BulkPredictionPage() {
//   const [file, setFile] = useState<File | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [resultBlob, setResultBlob] = useState<Blob | null>(null)
//   const [processedCount, setProcessedCount] = useState(0)

//   const handleFileSelect = (selectedFile: File | null) => {
//     setFile(selectedFile)
//     setResultBlob(null)
//     setProcessedCount(0)
//   }

//   const handleUpload = async () => {
//     if (!file) return

//     setIsProcessing(true)
//     setResultBlob(null)

//     try {

//       const formData = new FormData();
//       formData.append("file", file);
//       console.log(formData)

//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:8000/predict-batch",
//           formData,
//           { responseType: "blob" }
//         );
//         console.log(response);
//         setResultBlob(response.data);
//       } catch (error) {
//         console.log(error)
//       }

//       // Count processed rows (excluding header)
//       const text = await file.text();
//       const lines = text.split("\n").filter((line) => line.trim());
//       setProcessedCount(lines.length - 1);

//     } catch (error) {
//       console.error('Bulk prediction failed:', error)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleDownload = () => {
//     if (!resultBlob) return

//     const url = URL.createObjectURL(resultBlob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = 'attrition_predictions.csv'
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//   }

//   const handleReset = () => {
//     setFile(null)
//     setResultBlob(null)
//     setProcessedCount(0)
//   }

  

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Bulk Prediction</h1>
//         <p className="mt-1 text-muted-foreground">
//           Upload a CSV file to predict attrition for multiple employees at once
//         </p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Upload Section */}
//         <Card className="border-border shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-foreground">Upload CSV File</CardTitle>
//             <CardDescription>
//               Upload a CSV file containing employee data. The file should include all required fields.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FileUpload onFileSelect={handleFileSelect} />

//             <div className="flex flex-wrap gap-3">
//               <Button
//                 onClick={handleUpload}
//                 disabled={!file || isProcessing}
//                 className="min-w-[160px]"
//               >
//                 {isProcessing ? (
//                   <span className="flex items-center gap-2">
//                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
//                     Processing...
//                   </span>
//                 ) : (
//                   'Upload & Predict'
//                 )}
//               </Button>
//               {file && (
//                 <Button variant="outline" onClick={handleReset}>
//                   Clear
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Instructions Section */}
//         <Card className="border-border shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-foreground">CSV Format Requirements</CardTitle>
//             <CardDescription>
//               Ensure your CSV file follows this format for accurate predictions
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4 text-sm">
//               <div>
//                 <h4 className="font-medium text-foreground">Required Columns:</h4>
//                 <p className="mt-1 text-muted-foreground">
//                   Age, BusinessTravel, DailyRate, Department, DistanceFromHome, Education, EducationField, EnvironmentSatisfaction, Gender, HourlyRate, JobInvolvement, JobLevel, JobRole, JobSatisfaction, MaritalStatus, MonthlyIncome, MonthlyRate, NumCompaniesWorked, OverTime, PercentSalaryHike, PerformanceRating, RelationshipSatisfaction, StockOptionLevel, TotalWorkingYears, TrainingTimesLastYear, WorkLifeBalance, YearsAtCompany, YearsInCurrentRole, YearsSinceLastPromotion, YearsWithCurrManager
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-medium text-foreground">Notes:</h4>
//                 <ul className="mt-1 list-inside list-disc text-muted-foreground">
//                   <li>First row should contain column headers</li>
//                   <li>Maximum file size: 10MB</li>
//                   <li>Only .csv files are accepted</li>
//                 </ul>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Results Section */}
//       {resultBlob && (
//         <Card className="border-2 border-success bg-success/5 shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-success">
//               <CheckCircle className="h-6 w-6" />
//               Prediction Complete
//             </CardTitle>
//             <CardDescription>
//               Successfully processed {processedCount} employee records
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
//                   <FileSpreadsheet className="h-6 w-6 text-success" />
//                 </div>
//                 <div>
//                   <p className="font-medium text-foreground">attrition_predictions.csv</p>
//                   <p className="text-sm text-muted-foreground">
//                     Original data with Attrition_Prediction column added
//                   </p>
//                 </div>
//               </div>
//               <Button onClick={handleDownload} className="gap-2">
//                 <Download className="h-4 w-4" />
//                 Download Results
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Processing State */}
//       {isProcessing && (
//         <Card className="border-border shadow-sm">
//           <CardContent className="py-8">
//             <div className="flex flex-col items-center justify-center gap-4 text-center">
//               <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//               <div>
//                 <p className="font-medium text-foreground">Processing your file...</p>
//                 <p className="text-sm text-muted-foreground">
//                   This may take a moment depending on the file size
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }

// ------------------------------------------------------------------------------------------------------------
'use client'

import { useState } from 'react'
import axios from 'axios'
import { Download, CheckCircle, FileSpreadsheet } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'

export default function BulkPredictionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [processedCount, setProcessedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) return

    setIsProcessing(true)
    setResultBlob(null)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/predict-batch',
        formData,
        { responseType: 'blob' }
      )

      setResultBlob(response.data)

      // count rows (excluding header)
      const text = await file.text()
      const lines = text.split('\n').filter(line => line.trim())
      setProcessedCount(lines.length - 1)

    } catch (err: any) {
      // backend validation error
      if (err.response?.status === 400) {
        const reader = new FileReader()
        reader.onload = () => {
          console.log(JSON.parse(reader.result as string).detail)
          setError(JSON.parse(reader.result as string).detail)
        }
        reader.readAsText(err.response.data)
      } else {
        setError('Invalid CSV file or server error occurred')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!resultBlob) return

    const url = URL.createObjectURL(resultBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attrition_predictions.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setFile(null)
    setResultBlob(null)
    setProcessedCount(0)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bulk Prediction</h1>
        <p className="text-muted-foreground">
          Upload a CSV file to predict attrition for multiple employees
        </p>
      </div>

<div className="grid gap-3 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
          <CardDescription>
            File must contain all required employee fields
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            file={file}
            onFileSelect={setFile}
            error={error}
          />

          <div className="flex gap-3">
            <Button
              onClick={handleUpload}
              disabled={!file || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Upload & Predict'}
            </Button>

            {file && (
              <Button variant="outline" onClick={handleReset}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

       {/* Instructions Section */}
       <Card className="border-border shadow-sm">
         <CardHeader>
           <CardTitle className="text-foreground">CSV Format Requirements</CardTitle>
           <CardDescription>
             Ensure your CSV file follows this format for accurate predictions
           </CardDescription>
         </CardHeader>
         <CardContent>
           <div className="space-y-4 text-sm">
             <div>
               <h4 className="font-medium text-foreground">Required Columns:</h4>
               <p className="mt-1 text-muted-foreground">
                 Age, BusinessTravel, EnvironmentSatisfaction, JobInvolvement, JobLevel, JobSatisfaction, MaritalStatus, MonthlyIncome, OverTime, StockOptionLevel, TotalWorkingYears, YearsAtCompany, YearsInCurrentRole, YearsWithCurrManager
               </p>
             </div>
             <div>
               <h4 className="font-medium text-foreground">Notes:</h4>
               <ul className="mt-1 list-inside list-disc text-muted-foreground">
                 <li>First row should contain column headers</li>
                 <li>Maximum file size: 10MB</li>
                 <li>Only .csv files are accepted</li>
               </ul>
             </div>
           </div>
         </CardContent>
       </Card>
      </div>

      {/* Error message */}
      {error && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="py-4">
            <p className="text-destructive font-medium">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Success result */}
      {resultBlob && (
        <Card className="border-success bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle />
              Prediction Complete
            </CardTitle>
            <CardDescription>
              Successfully processed {processedCount} records
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileSpreadsheet />
              <span>attrition_predictions.csv</span>
            </div>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

