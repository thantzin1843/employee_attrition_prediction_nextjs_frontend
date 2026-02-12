'use client'

import { AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ResultCardProps {
  prediction: 'Attrition' | 'No Attrition' | null
  isLoading?: boolean
}

export function ResultCard({ prediction, isLoading }: ResultCardProps) {
  if (isLoading) {
    return (
      <Card className="border-border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">Prediction Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="ml-3 text-muted-foreground">Analyzing employee data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!prediction) {
    return null
  }

  const isAttrition = prediction === 'Attrition'

  return (
    <Card className={cn(
      'border-2 shadow-lg transition-all',
      isAttrition ? 'border-primary bg-primary/5' : 'border-success bg-success/5'
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Prediction Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          'flex items-center gap-4 rounded-lg p-4',
          isAttrition ? 'bg-primary/10' : 'bg-success/10'
        )}>
          {isAttrition ? (
            <AlertTriangle className="h-10 w-10 text-primary" />
          ) : (
            <CheckCircle className="h-10 w-10 text-success" />
          )}
          <div>
            <p className={cn(
              'text-xl font-bold',
              isAttrition ? 'text-primary' : 'text-success'
            )}>
              {isAttrition ? 'High Risk of Attrition' : 'Low Risk of Attrition'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isAttrition 
                ? 'This employee shows indicators that suggest a higher likelihood of leaving the company.'
                : 'This employee appears to be stable with a lower likelihood of leaving the company.'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
