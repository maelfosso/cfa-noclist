import { auth, users } from '../api';

describe('GET /auth', () => {

  it ('should return success', async () => {
    const response = await auth();
    expect(response).toBeDefined();
    expect(response).toMatch(/((\w+)\-){4}(\w+)/);
  });

});

describe('GET /users', () => {

  it ('should return success', async () => {
    const response = await users();
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
  });

});
