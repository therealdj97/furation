const request = require('supertest');
const app = require('./index');

describe(/api/items, () => {
  it('should return "Hello, World!"', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, World!');
  });

  it('should create a new item', async () => {
    const newItem = { name: 'New Item', price: 10.99 };
    const response = await request(app)
      .post('/items')
      .send(newItem);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newItem);
  });
});
