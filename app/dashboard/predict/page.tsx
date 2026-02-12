'use client'

import React from "react"
import axios from "axios";
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form-input'
import { ResultCard } from '@/components/result-card'

const businessTravelOptions = [
  { label: 'Travel Rarely', value: '0' },
  { label: 'Travel Frequently', value: '1' },
]


const maritalStatusOptions = [
  { label: 'Single', value:'1'},
  { label: 'Not Single', value:'0' },
]

const overTimeOptions = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' },
]

const satisfactionOptions = [
  { label: '1 - Low', value: '1' },
  { label: '2 - Medium', value: '2' },
  { label: '3 - High', value: '3' },
  { label: '4 - Very High', value: '4' },
]

const jobLevelOptions = [
  { label: '1 - Entry', value: '1' },
  { label: '2 - Junior', value: '2' },
  { label: '3 - Mid', value: '3' },
  { label: '4 - Senior', value: '4' },
  { label: '5 - Executive', value: '5' },
]

const stockOptionOptions = [
  { label: '0 - None', value: '0' },
  { label: '1 - Low', value: '1' },
  { label: '2 - Medium', value: '2' },
  { label: '3 - High', value: '3' },
]

const initialFormData = {
    Age: 30,
    MonthlyIncome: 5000,
    YearsAtCompany: 5,
    YearsInCurrentRole: 3,
    YearsWithCurrManager: 2,
    TotalWorkingYears: 8,
    JobLevel: 2,
    JobInvolvement: 3,
    JobSatisfaction: 3,
    EnvironmentSatisfaction: 3,
    StockOptionLevel: 1,
    OverTime_Yes: 0,
    MaritalStatus_Single: 1,
    BusinessTravel_Travel_Frequently: 0
}

export default function PredictSinglePage() {
  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState(null) ; // true or false for attrition
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setPrediction(null)

    try {
      // const result = await predictAttrition(formData)
      // setPrediction(result.prediction)

    const res = await axios.post("http://127.0.0.1:8000/predict", formData);
    alert(`Prediction: ${res.data.prediction}\nRisk: ${res.data.attrition_risk_probability}`);
    console.log('Prediction result:', res.data);
    setPrediction(res.data.prediction);
    
    } catch (error) {
      console.error('Prediction failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setPrediction(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Predict Employee Attrition</h1>
        <p className="mt-1 text-muted-foreground">
          Enter employee details to predict attrition risk
        </p>
      </div>

      
      {/* Result Section */}
      {(isLoading || prediction) && (
        <ResultCard prediction={prediction} isLoading={isLoading} />
      )}

      <form onSubmit={handleSubmit}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Employee Information</CardTitle>
            <CardDescription>
              Fill in all fields to get an accurate prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Personal Information */}
              <FormInput
                label="Age"
                name="Age"
                type="number"
                value={formData.Age}
                onChange={handleChange}
                min={18}
                max={65}
              />
              
              <FormInput
                label="Marital Status"
                name="MaritalStatus_Single"
                type="select"
                value={formData.MaritalStatus_Single}
                onChange={handleChange}
                options={maritalStatusOptions}
              />

              {/* Job Information */}
              
              <FormInput
                label="Job Level"
                name="JobLevel"
                type="select"
                value={String(formData.JobLevel)}
                onChange={(name, val) => handleChange(name, Number(val))}
                options={jobLevelOptions}
              />
              <FormInput
                label="Business Travel"
                name="BusinessTravel_Travel_Frequently"
                type="select"
                value={formData.BusinessTravel_Travel_Frequently}
                onChange={handleChange}
                options={businessTravelOptions}
              />
              <FormInput
                label="Over Time"
                name="OverTime_Yes"
                type="select"
                value={formData.OverTime_Yes}
                onChange={handleChange}
                options={overTimeOptions}
              />

              {/* Compensation */}
             
              <FormInput
                label="Monthly Income ($)"
                name="MonthlyIncome"
                type="number"
                value={formData.MonthlyIncome}
                onChange={handleChange}
                min={1000}
                max={50000}
              />
              
              <FormInput
                label="Stock Option Level"
                name="StockOptionLevel"
                type="select"
                value={String(formData.StockOptionLevel)}
                onChange={(name, val) => handleChange(name, Number(val))}
                options={stockOptionOptions}
              />

              {/* Satisfaction & Performance */}
              <FormInput
                label="Environment Satisfaction"
                name="EnvironmentSatisfaction"
                type="select"
                value={String(formData.EnvironmentSatisfaction)}
                onChange={(name, val) => handleChange(name, Number(val))}
                options={satisfactionOptions}
              />
              <FormInput
                label="Job Satisfaction"
                name="JobSatisfaction"
                type="select"
                value={String(formData.JobSatisfaction)}
                onChange={(name, val) => handleChange(name, Number(val))}
                options={satisfactionOptions}
              />
              <FormInput
                label="Job Involvement"
                name="JobInvolvement"
                type="select"
                value={String(formData.JobInvolvement)}
                onChange={(name, val) => handleChange(name, Number(val))}
                options={satisfactionOptions}
              />
              

              {/* Experience */}
             
              <FormInput
                label="Total Working Years"
                name="TotalWorkingYears"
                type="number"
                value={formData.TotalWorkingYears}
                onChange={handleChange}
                min={0}
                max={50}
              />
            
              <FormInput
                label="Years At Company"
                name="YearsAtCompany"
                type="number"
                value={formData.YearsAtCompany}
                onChange={handleChange}
                min={0}
                max={50}
              />
              <FormInput
                label="Years In Current Role"
                name="YearsInCurrentRole"
                type="number"
                value={formData.YearsInCurrentRole}
                onChange={handleChange}
                min={0}
                max={20}
              />
              
              <FormInput
                label="Years With Current Manager"
                name="YearsWithCurrManager"
                type="number"
                value={formData.YearsWithCurrManager}
                onChange={handleChange}
                min={0}
                max={20}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="submit" disabled={isLoading} className="min-w-[160px]">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Predicting...
                  </span>
                ) : (
                  'Predict Attrition'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

    </div>
  )
}
