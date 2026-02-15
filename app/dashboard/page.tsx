'use client'

import { Users, UserMinus, TrendingUp, Activity, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const stats = [
  {
    title: 'Total Employees',
    value: '1,284',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Attrition Rate',
    value: '8.2%',
    change: '-2.1%',
    changeType: 'positive' as const,
    icon: UserMinus,
  },
  {
    title: 'Predictions Made',
    value: '456',
    change: '+28%',
    changeType: 'positive' as const,
    icon: Activity,
  },
  {
    title: 'High Risk Alerts',
    value: '23',
    change: '+5',
    changeType: 'negative' as const,
    icon: TrendingUp,
  },
]

const recentPredictions = [
  { id: 1, name: 'John Smith', department: 'Engineering', risk: 'High', date: '2024-01-15' },
  { id: 2, name: 'Sarah Johnson', department: 'Marketing', risk: 'Low', date: '2024-01-15' },
  { id: 3, name: 'Michael Brown', department: 'Sales', risk: 'Low', date: '2024-01-14' },
  { id: 4, name: 'Emily Davis', department: 'HR', risk: 'High', date: '2024-01-14' },
  { id: 5, name: 'David Wilson', department: 'Finance', risk: 'Low', date: '2024-01-13' },
]

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<any>([]);
  const [bulkPredictions, setBulkPredictions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetchPredictions();
    // fetchBulkPredictions();

  },[])
  const fetchPredictions = async () => {
    const { data, error } = await supabase
      .from('recent_predictions')
      .select('*')
      .eq('hr_user_id', JSON.parse(localStorage.getItem('data')).id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    }
    console.log(data)

    setPredictions(data || [])
  }

   

  useEffect(() => {
    const fetchBulkPredictions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("bulk_predictions_metadata")
        .select("*")
        .eq('hr_user_id', JSON.parse(localStorage.getItem('data')).id)
        .order("created_at", { ascending: false }); // latest first

      if (error) console.error("Fetch error:", error);
      else setBulkPredictions(data);

      setLoading(false);
    };

    fetchBulkPredictions();
  }, []);

   const handleDownload = async (filePath: string, fileName: string) => {
    // generate public URL (public bucket) or signed URL (private)
    const { data, error } = await supabase.storage
      .from("bulk_predictions")
      .createSignedUrl(filePath, 60); // 60 seconds

    if (error) {
      console.error("Download URL error:", error);
      return;
    }

    if (data?.signedUrl) {
      // trigger download
      const a = document.createElement("a");
      a.href = data.signedUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };


 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome to your HR Analytics Dashboard
        </p>
      </div>

       <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Predictions</CardTitle>
          <CardDescription>
            Latest employee attrition predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Files</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {bulkPredictions.map((prediction:any) => (
                  <tr key={prediction.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm font-medium text-foreground">{prediction.file_name}</td>
                    <td className="py-3 text-sm text-muted-foreground">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDownload(prediction.file_path, prediction.file_name)}
                      >
                        Download
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`mt-1 text-xs ${
                stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div> */}

      

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Single Prediction</CardTitle>
            <CardDescription>
              Predict attrition risk for an individual employee
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/predict">
              <Button className="w-full">Start Prediction</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Bulk Prediction</CardTitle>
            <CardDescription>
              Upload a CSV file to predict attrition for multiple employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/bulk">
              <Button variant="outline" className="w-full bg-transparent">Upload CSV</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Predictions Table */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Predictions</CardTitle>
          <CardDescription>
            Latest employee attrition predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Employee</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Age</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Monthly Income</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Stock Option</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Years at Company</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Attrition Status</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((prediction:any) => (
                  <tr key={prediction.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm font-medium text-foreground">{prediction.name}</td>
                    <td className="py-3 text-sm text-muted-foreground">{prediction.age}</td>
                    <td className="py-3 text-sm text-muted-foreground">{prediction.monthlyIncome}</td>
                     <td className="py-3 text-sm text-muted-foreground">{prediction.stockOptionLevel}</td>
                    <td className="py-3 text-sm text-muted-foreground">{prediction.yearsAtCompany}</td>
                     <td className="py-3">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        prediction.prediction === false
                          ? 'bg-success/10 text-success'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {prediction.prediction === false ? 'No Attrition' : 'Attrition Risk'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
