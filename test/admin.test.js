const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const { generateToken } = require('../src/utils/tokenManagement');
const { testAdmin, provider_id } = require('../src/utils/testHelpers');
const request = supertest(app);

describe('Admin tests', () => {
  let adminToken;
  // let provider_id;

  beforeEach(async () => {
    adminToken = await generateToken(testAdmin);
    console.log(adminToken);
  });
  it('should get all providers', async () => {
    const res = await request
      .get('/api/v2/admin/get-all-providers')
      .set(`Authorization`, `Bearer ${adminToken.access_token}`);
    // console.log(res.statusCode);
    expect(res.statusCode).toEqual(200);
  }, 60000);
  it('should activate provider', async () => {
    const res = await request
      .put(
        `/api/v2/admin/activate-deactivate-provider/326253a4-9f42-4c7d-aab5-0d2425c146f0?status=inactive`
      )
      .set(`Authorization`, `Bearer ${adminToken.access_token}`);
    expect(res.statusCode).toEqual(200);
  }, 60000);
  it('should get provider', async () => {
    const res = await request
      .get(`/api/v2/admin/get-provider/${provider_id}`)
      .set(`Authorization`, `Bearer ${adminToken.access_token}`);
    expect(res.statusCode).toEqual(200);
  });
  it('should create learninType', async () => {
    const res = await request
      .post(`/api/v2/admin/create-learningtype`)
      .set(`Authorization`, `Bearer ${adminToken.access_token}`)
      .send({
        type: 'Test-Type',
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should get all learninType', async () => {
    const res = await request
      .get(`/api/v2/admin/get-all-learning-types`)
      .set(`Authorization`, `Bearer ${adminToken.access_token}`);
    expect(res.statusCode).toEqual(200);
    console.log(res.body);
  });
});
