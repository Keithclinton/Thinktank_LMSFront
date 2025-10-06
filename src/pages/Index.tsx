import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Award, Users, Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground">Think Tank LMS</span>
              <p className="text-xs text-muted-foreground">Solutions Oriented</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Courses/Catalogue
            </Link>
            <Link to="/#articles" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Free Articles & Webinars
            </Link>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link 
                  to="/" 
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/courses" 
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Courses/Catalogue
                </Link>
                <Link 
                  to="/#articles" 
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Free Articles & Webinars
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary mb-6">
              <GraduationCap className="h-11 w-11 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Think Tank Solutions
              <span className="block text-primary mt-2">Learning Management System</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Changing Lives, Striving for Excellence. Unlock your potential with our comprehensive learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe every problem has a solution. Transform your challenges into opportunities with our proven learning system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Comprehensive Courses</h3>
              <p className="text-muted-foreground">
                Access a wide range of expertly designed courses covering leadership, strategy, and personal development.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with years of real-world experience and proven track records.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Certificates</h3>
              <p className="text-muted-foreground">
                Earn recognized certificates upon completion to showcase your achievements and boost your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey with our most sought-after courses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Strategic Leadership</h3>
                <p className="text-muted-foreground mb-4">Master the art of leading teams and organizations to success.</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/courses">View Course</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Team Management</h3>
                <p className="text-muted-foreground mb-4">Learn effective strategies for building and managing high-performing teams.</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/courses">View Course</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <Award className="h-16 w-16 text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Personal Development</h3>
                <p className="text-muted-foreground mb-4">Unlock your full potential with proven self-improvement techniques.</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/courses">View Course</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                About Think Tank Solutions
              </h2>
            </div>
            <div className="bg-card p-8 md:p-12 rounded-2xl border border-border shadow-sm">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At <span className="font-semibold text-foreground">Think Tank Solutions Oriented</span>, we believe every problem has a solution. In life, challenges are inevitable, whether personal, professional, or business-related. What truly makes the difference is how prepared and proactive we are in addressing them.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our mission is to bridge the gap between where you are and where you want to go because that gap is often filled with what you don't yet know.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We exist to help you uncover that knowledge, develop the right skills, and apply practical tools, roadmaps, and proven frameworks that lead to real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Articles & Webinars Section */}
      <section id="articles" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Free Articles & Webinars
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access valuable insights and knowledge from our expert contributors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Latest Articles</h3>
                  <p className="text-muted-foreground mb-4">
                    Read our latest insights on leadership, strategy, and personal growth.
                  </p>
                  <Button variant="link" className="px-0">
                    Browse Articles →
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Upcoming Webinars</h3>
                  <p className="text-muted-foreground mb-4">
                    Join live sessions with industry experts and thought leaders.
                  </p>
                  <Button variant="link" className="px-0">
                    View Schedule →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of learners who are transforming their lives through education.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">Think Tank LMS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Changing Lives, Striving for Excellence
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
                <li><Link to="/courses" className="hover:text-foreground transition-colors">Courses/Catalogue</Link></li>
                <li><Link to="/#articles" className="hover:text-foreground transition-colors">Free Articles & Webinars</Link></li>
                <li><Link to="/#about" className="hover:text-foreground transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Get Started</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/register" className="hover:text-foreground transition-colors">Create Account</Link></li>
                <li><Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Think Tank Solutions Oriented. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
