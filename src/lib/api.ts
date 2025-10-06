const API_BASE_URL = 'https://thinktank-lms-backend-536444006215.africa-south1.run.app/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: any;
}

class ApiClient {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/token/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    return data.access;
  }

  async getCourses() {
    const response = await fetch(`${API_BASE_URL}/courses/`, {
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    return response.json();
  }

  async getCourseDetails(courseId: number) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/`, {
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch course details');
    }

    return response.json();
  }

  async enrollInCourse(courseId: number) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll/`, {
      method: 'POST',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to enroll in course');
    }

    return response.json();
  }

  async updateCourseProgress(courseId: number, lessonId: number, completed: boolean) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/progress/`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify({ lesson_id: lessonId, completed }),
    });

    if (!response.ok) {
      throw new Error('Failed to update progress');
    }

    return response.json();
  }

  async getUserDashboard() {
    const response = await fetch(`${API_BASE_URL}/user/dashboard/`, {
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    return response.json();
  }

  async getUserCourses() {
    const response = await fetch(`${API_BASE_URL}/user/courses/`, {
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user courses');
    }

    return response.json();
  }

  async getUserCertificates() {
    const response = await fetch(`${API_BASE_URL}/user/certificates/`, {
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }

    return response.json();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

export const apiClient = new ApiClient();
