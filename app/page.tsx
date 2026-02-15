'use client'

import React from "react"
import Link from 'next/link'
// import { LandingNavbar } from '@/components/landing-navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingDown, Users, Zap, Shield, Brain } from 'lucide-react'
import { LandingNavbar } from "@/components/landing-navbar"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-primary">AI-Powered Insights</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Predict Employee Attrition
              <span className="block text-primary"> Before It Happens</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Leverage advanced machine learning to identify at-risk employees and retain your top talent. Make data-driven HR decisions today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8" asChild>
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 rounded-xl border border-border bg-muted/30 p-8">
            <div className="aspect-video bg-gradient-to-br from-secondary/40 to-primary/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Image src={'/dashboard-preview.png'} alt="Dashboard Preview" width={0} height={0} style={{width:'100%',height:'100%'}}  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to predict and prevent employee attrition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>Advanced machine learning models</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze 30+ employee factors to accurately predict attrition risk with high precision.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Bulk Analysis</CardTitle>
                <CardDescription>Process entire teams at once</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Upload CSV files to analyze multiple employees simultaneously and get actionable insights.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Data Security</CardTitle>
                <CardDescription>Enterprise-grade protection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your employee data is encrypted and stored securely with strict access controls.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Risk Scoring</CardTitle>
                <CardDescription>Instant attrition predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get clear risk scores and personalized retention recommendations for each employee.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Insights</CardTitle>
                <CardDescription>Instant predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get immediate results from our fast AI models without waiting for batch processing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize attrition patterns and trends with comprehensive charts and reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Choose Us?</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <span className="text-success font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Higher Retention Rates</h3>
                    <p className="text-sm text-muted-foreground mt-1">Identify and address attrition risks before employees leave</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <span className="text-success font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Reduce Turnover Costs</h3>
                    <p className="text-sm text-muted-foreground mt-1">Save on recruitment and training expenses</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <span className="text-success font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Data-Driven Decisions</h3>
                    <p className="text-sm text-muted-foreground mt-1">Make HR decisions backed by AI insights</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <span className="text-success font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Easy to Use</h3>
                    <p className="text-sm text-muted-foreground mt-1">Intuitive interface designed for HR professionals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-8">
              <div className="aspect-square rounded-lg flex items-center justify-center">
                
                  <Image src='/analytics.png' alt="Benefits Illustration" width={0} height={0} style={{width:'80%',height:'80%'}}  />
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up and set up your HR department profile in minutes
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">Add Employee Data</h3>
              <p className="text-muted-foreground">
                Upload employee information or enter data individually
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Predictions</h3>
              <p className="text-muted-foreground">
                Receive instant attrition risk predictions and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/90 to-primary/70 rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
            Ready to Predict and Prevent Attrition?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join HR departments across the country using AI to make smarter retention decisions
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Start Your Free Trial
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">HR</span>
              </div>
              <span className="font-semibold text-foreground">HR Attrition Predictor</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HR Attrition Predictor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
