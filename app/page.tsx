import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Search, Upload, Receipt, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PDFDropZone from "@/components/PDFDropZone";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                Track your Receipts Intelligently with AI
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-base dark:text-gray-400">
                Keepo scans, analyzes and organizes your receipts with AI-powered precision. Save time and gain insights from your expenses with ease.
              </p>
            </div>

            <div className="space-x-4">
              <Link href="/receipts">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* PDF Dropzone Preview */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden dark:border-gray-800 dark:bg-gray-950">
            <div className="p-6 md:p-8 relative flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <Receipt className="w-12 h-12 text-gray-400 mb-4" />
              <PDFDropZone />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                Powerful Features for Efficient Receipt Management
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-base dark:text-gray-400">
                Keepo's AI-powered features help you manage your receipts effortlessly. From automatic categorization to smart search, we've got you covered.
              </p>
            </div>

            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Upload className="w-6 h-6 text-blue-600"/>
                </div>

                <h3 className="text-lg font-semibold">Smart Upload</h3>
                <p className="text-gray-500 md:text-sm dark:text-gray-400">
                  Upload your receipts directly from your device or email. Keepo will automatically extract the data and categorize it for you.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <Search className="w-6 h-6 text-green-600 dark:text-green-400"/>
                </div>

                <h3 className="text-lg font-semibold">Smart Search</h3>
                <p className="text-gray-500 md:text-sm dark:text-gray-400">
                  Search your receipts by name, date, amount, or category. Keepo will find the receipts you need quickly and easily.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                  <BarChart className="w-6 h-6 text-red-600"/>
                </div>

                <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                <p className="text-gray-500 md:text-sm dark:text-gray-400">
                  Keepo analyzes your receipts and provides you with insights on your spending patterns and expenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-base dark:text-gray-400">
                Get started with Keepo in three simple steps. Start organizing your receipts today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold">Upload Your Receipts</h3>
              <p className="text-gray-500 md:text-sm dark:text-gray-400">
                Simply upload your receipt images or PDFs. Keepo accepts multiple formats for your convenience.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold">AI Processing</h3>
              <p className="text-gray-500 md:text-sm dark:text-gray-400">
                Our AI automatically extracts key information, categorizes your receipts, and organizes them for you.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold">Access & Analyze</h3>
              <p className="text-gray-500 md:text-sm dark:text-gray-400">
                View all your receipts in one place, search effortlessly, and gain insights into your spending patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits/Why Choose Keepo */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                Why Choose Keepo
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-base dark:text-gray-400">
                Everything you need to take control of your receipts and expenses.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-1">Time-Saving Automation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No more manual data entry. Let AI handle the tedious work while you focus on what matters.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-1">Secure & Private</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your data is encrypted and stored securely. We prioritize your privacy and data protection.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-1">Smart Organization</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically categorize and organize receipts by date, merchant, and expense type.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold mb-1">Powerful Search</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Find any receipt instantly with our intelligent search functionality across all your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-2xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                Start Scanning Today
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-base dark:text-gray-400">
                Join thousands of users who are already organizing their receipts effortlessly with Keepo. Get started in seconds.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/receipts">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Keepo</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} Keepo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

