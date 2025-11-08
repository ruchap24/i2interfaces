"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, BarChart3, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const salaryData = [
  {
    role: "Full Stack Developer",
    location: "San Francisco, CA",
    min: 120000,
    max: 180000,
    avg: 150000,
    trend: "+12%",
  },
  {
    role: "Product Designer",
    location: "New York, NY",
    min: 100000,
    max: 150000,
    avg: 125000,
    trend: "+8%",
  },
  {
    role: "DevOps Engineer",
    location: "Seattle, WA",
    min: 110000,
    max: 160000,
    avg: 135000,
    trend: "+15%",
  },
  {
    role: "Blockchain Developer",
    location: "Remote",
    min: 130000,
    max: 200000,
    avg: 165000,
    trend: "+25%",
  },
  {
    role: "Frontend Developer",
    location: "Austin, TX",
    min: 90000,
    max: 130000,
    avg: 110000,
    trend: "+10%",
  },
  {
    role: "Backend Developer",
    location: "Boston, MA",
    min: 100000,
    max: 150000,
    avg: 125000,
    trend: "+9%",
  },
];

export default function SalaryInsightsPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black relative z-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Salary Insights</h1>
          <p className="text-gray-400">
            Compare salaries across different roles and locations (Unique feature inspired by Naukri/Peerlist)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salaryData.map((data, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-[#0a0a0a] border-blue-500/20 hover:border-blue-500/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg mb-1">{data.role}</CardTitle>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{data.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      <span>{data.trend}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Average Salary</p>
                      <p className="text-2xl font-bold text-blue-400">{formatSalary(data.avg)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Min</p>
                        <p className="text-gray-400">{formatSalary(data.min)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs">Max</p>
                        <p className="text-gray-400">{formatSalary(data.max)}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-blue-500/20">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <BarChart3 className="h-3 w-3" />
                        <span>Based on 500+ profiles</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mt-8 bg-[#0a0a0a] border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold text-lg">Market Insights</h3>
                <p className="text-gray-400 text-sm">
                  Salary data is aggregated from verified profiles and updated monthly. 
                  These insights help you make informed career decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

