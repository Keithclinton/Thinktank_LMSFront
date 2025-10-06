// API Endpoint Test Script
// Run this in browser console to test all endpoints

console.log('🚀 Testing Think Tank LMS API Endpoints...\n');

const API_BASE = 'https://thinktank-lms-backend-536444006215.africa-south1.run.app/api';

// Test data
const testUser = {
  email: `test${Date.now()}@example.com`,
  password: 'testpass123',
  username: `testuser${Date.now()}`,
  first_name: 'Test',
  last_name: 'User'
};

let authToken = null;

// Test functions
async function testEndpoint(name, url, method, data = null, useAuth = false) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (useAuth && authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
      method,
      headers
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE}${url}`, config);
    const result = await response.json();

    if (response.ok) {
      console.log(`✅ ${name}: WORKING (${response.status})`);
      return result;
    } else {
      console.log(`⚠️  ${name}: Response ${response.status} - ${result.message || 'Error'}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ ${name}: FAILED - ${error.message}`);
    return null;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting API tests...\n');

  // 1. Test Registration
  console.log('1. Testing POST /register/');
  await testEndpoint('Register', '/register/', 'POST', testUser);

  // 2. Test Login
  console.log('\n2. Testing POST /token/');
  const loginResult = await testEndpoint('Login', '/token/', 'POST', {
    email: 'admin@test.com',
    password: 'admin123'
  });
  
  if (loginResult && loginResult.access) {
    authToken = loginResult.access;
    console.log('   🔑 Auth token obtained');
  }

  // 3. Test Courses List
  console.log('\n3. Testing GET /courses/');
  const courses = await testEndpoint('Courses List', '/courses/', 'GET', null, true);
  
  // 4. Test Course Details (if courses exist)
  if (courses && courses.results && courses.results.length > 0) {
    console.log('\n4. Testing GET /courses/{id}/');
    await testEndpoint('Course Details', `/courses/${courses.results[0].id}/`, 'GET', null, true);
    
    // 5. Test Course Enrollment
    console.log('\n5. Testing POST /courses/{id}/enroll/');
    await testEndpoint('Course Enrollment', `/courses/${courses.results[0].id}/enroll/`, 'POST', {}, true);
    
    // 6. Test Progress Update
    console.log('\n6. Testing PUT /courses/{id}/progress/');
    await testEndpoint('Progress Update', `/courses/${courses.results[0].id}/progress/`, 'PUT', {
      lesson_id: 1,
      completed: true
    }, true);
  }

  // 7. Test Dashboard
  console.log('\n7. Testing GET /user/dashboard/');
  await testEndpoint('User Dashboard', '/user/dashboard/', 'GET', null, true);

  // 8. Test User Courses
  console.log('\n8. Testing GET /user/courses/');
  await testEndpoint('User Courses', '/user/courses/', 'GET', null, true);

  // 9. Test User Certificates
  console.log('\n9. Testing GET /user/certificates/');
  await testEndpoint('User Certificates', '/user/certificates/', 'GET', null, true);

  console.log('\n🏁 API Testing Complete!');
}

// Run the tests
runAllTests();
