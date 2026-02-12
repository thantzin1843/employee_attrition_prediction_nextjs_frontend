// API service for employee attrition prediction

export interface EmployeeData {
  age: number
  businessTravel: string
  dailyRate: number
  department: string
  distanceFromHome: number
  education: number
  educationField: string
  environmentSatisfaction: number
  gender: string
  hourlyRate: number
  jobInvolvement: number
  jobLevel: number
  jobRole: string
  jobSatisfaction: number
  maritalStatus: string
  monthlyIncome: number
  monthlyRate: number
  numCompaniesWorked: number
  overTime: string
  percentSalaryHike: number
  performanceRating: number
  relationshipSatisfaction: number
  stockOptionLevel: number
  totalWorkingYears: number
  trainingTimesLastYear: number
  workLifeBalance: number
  yearsAtCompany: number
  yearsInCurrentRole: number
  yearsSinceLastPromotion: number
  yearsWithCurrManager: number
}

export interface PredictionResult {
  prediction: 'High' | 'Low'
}

// Mock API call for single prediction
export async function predictAttrition(data: EmployeeData): Promise<PredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock prediction logic based on some factors
  const riskScore = 
    (data.overTime === 'Yes' ? 20 : 0) +
    (data.jobSatisfaction <= 2 ? 15 : 0) +
    (data.environmentSatisfaction <= 2 ? 15 : 0) +
    (data.workLifeBalance <= 2 ? 15 : 0) +
    (data.yearsAtCompany <= 2 ? 10 : 0) +
    (data.numCompaniesWorked > 5 ? 10 : 0) +
    (data.distanceFromHome > 20 ? 10 : 0) +
    (data.monthlyIncome < 5000 ? 15 : 0)
  
  return {
    prediction: riskScore >= 40 ? 'High' : 'Low'
  }
}

// Mock API call for bulk prediction
export async function predictBulkAttrition(file: File): Promise<Blob> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Read the CSV file
  const text = await file.text()
  const lines = text.split('\n')
  const header = lines[0]
  
  // Add prediction column to header
  const newHeader = header.trim() + ',Attrition_Prediction'
  
  // Process each row and add mock prediction
  const newLines = [newHeader]
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      // Random prediction for demo purposes
      const prediction = Math.random() > 0.5 ? 'High' : 'Low'
      newLines.push(lines[i].trim() + ',' + prediction)
    }
  }
  
  // Create new CSV blob
  const newCsv = newLines.join('\n')
  return new Blob([newCsv], { type: 'text/csv' })
}
