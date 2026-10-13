// server/tests/api.test.js
const request = require('supertest');

// We test against your running local/Docker server
const API_URL = 'http://localhost:5000';

describe('Student API & Database Validation', () => {
  
  it('should fetch all students and verify Version 2 schema (GET)', async () => {
    const res = await request(API_URL).get('/api/students');
    
    // Verify successful connection
    expect(res.statusCode).toEqual(200);
    // Verify it returns an array of students
    expect(Array.isArray(res.body)).toBeTruthy();
    
    // If students exist, verify the V2 'email' field is present
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('email');
    }
  });

  it('should block creating a student with missing required fields (POST)', async () => {
    const res = await request(API_URL)
      .post('/api/students')
      .send({ semester: 8 }); // Intentionally missing 'name' and 'course'
      
    // The API should NOT return 201 Created
    expect(res.statusCode).not.toEqual(201);
  });
});