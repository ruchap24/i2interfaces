"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

const dummyJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$120k - $150k",
    type: "Full-time",
    posted: "2 days ago",
    skills: ["React", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio",
    location: "San Francisco, CA",
    salary: "$100k - $130k",
    type: "Full-time",
    posted: "3 days ago",
    skills: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Services",
    location: "New York, NY",
    salary: "$110k - $140k",
    type: "Full-time",
    posted: "1 week ago",
    skills: ["Kubernetes", "Docker", "AWS"],
  },
  {
    id: 4,
    title: "Blockchain Developer",
    company: "Crypto Labs",
    location: "Remote",
    salary: "$130k - $160k",
    type: "Full-time",
    posted: "4 days ago",
    skills: ["Solidity", "Web3", "Ethereum"],
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Startup Inc",
    location: "Austin, TX",
    salary: "$90k - $120k",
    type: "Full-time",
    posted: "5 days ago",
    skills: ["React", "Next.js", "Tailwind"],
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "API Solutions",
    location: "Seattle, WA",
    salary: "$100k - $130k",
    type: "Full-time",
    posted: "1 week ago",
    skills: ["Python", "Django", "PostgreSQL"],
  },
];

export default function JobsPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black relative z-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Job Opportunities</h1>
          <p className="text-gray-400">Find your next career opportunity</p>
        </div>

        <div className="space-y-4">
          {dummyJobs.map((job) => (
            <Card key={job.id} className="bg-[#0a0a0a] border-blue-500/20 hover:border-blue-500/40 transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                      Save
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

