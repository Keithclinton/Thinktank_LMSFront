import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, CheckCircle2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

export default function MyCourses() {
  const [inProgressCourses, setInProgressCourses] = useState<any[]>([]);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const data = await apiClient.getUserCourses();
        setInProgressCourses(data.in_progress || []);
        setCompletedCourses(data.completed || []);
      } catch (error) {
        console.error('Failed to fetch user courses:', error);
        toast.error('Failed to load your courses');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your courses...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground mt-2">Track your learning progress</p>
        </div>

        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-6">
            {inProgressCourses.length > 0 ? (
              inProgressCourses.map((course) => (
                <Card key={course.id}>
                  <div className="md:flex">
                    <div className="md:w-64 aspect-video md:aspect-auto overflow-hidden bg-muted">
                      <img 
                        src={course.image_url || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>
                          {course.completed_lessons || 0} of {course.total_lessons || course.lessons_count || 0} lessons completed
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-primary">{course.progress || 0}%</span>
                          </div>
                          <Progress value={course.progress || 0} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">Next Lesson:</p>
                            <p className="text-sm text-muted-foreground">{course.next_lesson || 'Continue learning'}</p>
                          </div>
                          <Button>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No courses in progress.</p>
                  <p className="text-muted-foreground">Start learning by enrolling in courses!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length > 0 ? (
              completedCourses.map((course) => (
                <Card key={course.id}>
                  <div className="md:flex">
                    <div className="md:w-64 aspect-video md:aspect-auto overflow-hidden bg-muted">
                      <img 
                        src={course.image_url || "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=400&h=200&fit=crop"} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>Completed on {course.completed_date || course.completion_date}</CardDescription>
                          </div>
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline">
                          View Certificate
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed courses yet.</p>
                  <p className="text-muted-foreground">Complete your first course to see it here!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
