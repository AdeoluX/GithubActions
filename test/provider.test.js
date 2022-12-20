const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const { generateToken } = require('../src/utils/tokenManagement');
const {
  testAdmin,
  provider_id,
  customer_id,
} = require('../src/utils/testHelpers');
const { v4: uuidv4 } = require('uuid');
const request = supertest(app);

describe('Admin tests', () => {
  let adminToken;
  let customerToken;
  let providerToken;
  let course_id;
  let chapter_id;

  beforeEach(async () => {
    course_id = uuidv4();
    chapter_id = uuidv4();
    adminToken = generateToken(testAdmin);
    customerToken = generateToken({ id: customer_id });
    providerToken = generateToken({ provider_id });
    console.log(adminToken);
    console.log(customerToken);
  });
  it('should create course', async () => {
    const res = await request
      .post(`/api/v2/provider/create-content`)
      .set(`Authorization`, `Bearer ${providerToken.access_token}`)
      .send({
        learnin_id: course_id,
        description: 'test description',
        learnin_name: 'Test Content',
        learnin_type: 'de8dc7a4-0a12-46bf-b7ca-915cd3604b14',
        content: 'Test Course',
        thumbnail:
          'https://images.unsplash.com/photo-1666224182627-7dc792e4b419?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80',
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should create chapters', async () => {
    const res = await request
      .post(`/api/v2/provider/create-content`)
      .set(`Authorization`, `Bearer ${providerToken.access_token}`)
      .send({
        learnin_id: chapter_id,
        description: 'test description',
        learnin_name: 'Test Content',
        learnin_type: 'de8dc7a4-0a12-46bf-b7ca-915cd3604b15',
        content: 'Test Article',
        parent_k: course_id,
        thumbnail:
          'https://images.unsplash.com/photo-1666224182627-7dc792e4b419?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80',
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should get all contents', async () => {
    const res = await request
      .get(`/api/v2/provider/get-all-contents`)
      .set(`Authorization`, `Bearer ${providerToken.access_token}`);
    expect(res.statusCode).toEqual(200);
  });
  it('should get content', async () => {
    const res = await request
      .get(`/api/v2/provider/get-content/${course_id}`)
      .set(`Authorization`, `Bearer ${providerToken.access_token}`);
    expect(res.statusCode).toEqual(200);
  });
  it('should update content', async () => {
    const res = await request
      .put(`/api/v2/provider/update-content/${course_id}`)
      .set(`Authorization`, `Bearer ${providerToken.access_token}`)
      .send({
        learnin_name: 'updated Content',
      });
    expect(res.statusCode).toEqual(200);
  });
  // it('should delete content', async () => {
  //   const res = await request
  //     .get(`/api/v2/admin/get-provider/${provider_id}`)
  //     .set(`Authorization`, `Bearer ${adminToken.access_token}`);
  //   expect(res.statusCode).toEqual(200);
  // });
  // it('should change order of content', async () => {
  //   const res = await request
  //     .get(`/api/v2/admin/get-provider/${provider_id}`)
  //     .set(`Authorization`, `Bearer ${adminToken.access_token}`);
  //   expect(res.statusCode).toEqual(200);
  // });
});
