import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, Clock, Award } from "lucide-react";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiClient.getUserDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { 
      title: "Enrolled Courses", 
      value: dashboardData?.enrolled_courses_count || "0", 
      icon: BookOpen, 
      color: "text-primary" 
    },
    { 
      title: "Completed", 
      value: dashboardData?.completed_courses_count || "0", 
      icon: GraduationCap, 
      color: "text-green-600" 
    },
    { 
      title: "In Progress", 
      value: dashboardData?.in_progress_courses_count || "0", 
      icon: Clock, 
      color: "text-blue-600" 
    },
    { 
      title: "Certificates", 
      value: dashboardData?.certificates_count || "0", 
      icon: Award, 
      color: "text-purple-600" 
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground mt-2">Continue your learning journey</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dashboardData?.recent_courses?.length > 0 ? (
                dashboardData.recent_courses.map((course: any) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor} • Last accessed {course.last_accessed || 'Recently'}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-primary">{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} className="h-2" />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No courses in progress. Start learning today!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
