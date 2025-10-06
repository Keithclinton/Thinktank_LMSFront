import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.getCourses();
        setCourses(response.results || response);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: number) => {
    setEnrollingId(courseId);
    try {
      await apiClient.enrollInCourse(courseId);
      toast.success('Successfully enrolled in course!');
      // Refresh courses to update enrollment status
      const response = await apiClient.getCourses();
      setCourses(response.results || response);
    } catch (error) {
      console.error('Failed to enroll:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading courses...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Courses are now loaded from API in useEffect above

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Library</h1>
          <p className="text-muted-foreground mt-2">Explore our comprehensive course catalog</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{(course.students_count || course.students || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleEnroll(course.id)}
                  disabled={enrollingId === course.id}
                >
                  {enrollingId === course.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
