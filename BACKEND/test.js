// Simple test file to demonstrate API usage
// Run this after starting the server

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'TestPass123'
};

let authToken = '';

// Test functions
async function testRegister() {
  try {
    console.log('Testing registration...');
    const response = await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ Registration successful:', response.data.message);
    authToken = response.data.data.token;
    return response.data;
  } catch (error) {
    console.log('❌ Registration failed:', error.response?.data?.message || error.message);
  }
}

async function testLogin() {
  try {
    console.log('\nTesting login...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful:', response.data.message);
    authToken = response.data.data.token;
    return response.data;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data?.message || error.message);
  }
}

async function testGetProfile() {
  try {
    console.log('\nTesting get profile...');
    const response = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Get profile successful:', response.data.data.user.name);
    return response.data;
  } catch (error) {
    console.log('❌ Get profile failed:', error.response?.data?.message || error.message);
  }
}

async function testUpdateProfile() {
  try {
    console.log('\nTesting update profile...');
    const response = await axios.put(`${BASE_URL}/auth/profile`, {
      name: 'Updated Test User'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update profile successful:', response.data.message);
    return response.data;
  } catch (error) {
    console.log('❌ Update profile failed:', error.response?.data?.message || error.message);
  }
}

async function testChangePassword() {
  try {
    console.log('\nTesting change password...');
    const response = await axios.put(`${BASE_URL}/auth/change-password`, {
      currentPassword: testUser.password,
      newPassword: 'NewTestPass123'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Change password successful:', response.data.message);
    return response.data;
  } catch (error) {
    console.log('❌ Change password failed:', error.response?.data?.message || error.message);
  }
}

async function testLogout() {
  try {
    console.log('\nTesting logout...');
    const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Logout successful:', response.data.message);
    return response.data;
  } catch (error) {
    console.log('❌ Logout failed:', error.response?.data?.message || error.message);
  }
}

async function testHealthCheck() {
  try {
    console.log('\nTesting health check...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check successful:', response.data.message);
    return response.data;
  } catch (error) {
    console.log('❌ Health check failed:', error.response?.data?.message || error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  await testHealthCheck();
  await testRegister();
  await testLogin();
  await testGetProfile();
  await testUpdateProfile();
  await testChangePassword();
  await testLogout();
  
  console.log('\n✨ All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testRegister,
  testLogin,
  testGetProfile,
  testUpdateProfile,
  testChangePassword,
  testLogout,
  testHealthCheck
}; 