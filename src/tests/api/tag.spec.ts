import { expect, test } from 'fixtures/context';
test.describe.serial('Tag APIs', () => {
  let tagId: string;

  test('GET - list tags', async ({ rcontext }) => {
    const response = await rcontext.get(`/v1/tags`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('total');
  });

  test('POST - create tag', async ({ rcontext }) => {
    const response = await rcontext.post(`/v1/tags`, {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        name: 'api-test-tag',
        color: '#ff0000',
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    tagId = await body.data.id;
  });

  test('PUT - update tag', async ({ rcontext }) => {
    const response = await rcontext.put(`/v1/tags/${tagId}`, {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        name: 'updated-api-tag',
        color: '#9c27b0',
        state: 'active',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.name).toBe('updated-api-tag');
    expect(body.data.color).toBe('#9c27b0');
  });

  test('DELETE - delete tag', async ({ rcontext }) => {
    const response = await rcontext.delete(`/v1/tags/${tagId}`);
    expect(response.status()).toBe(200);
  });

  test('PUT - update tag contacts', async () => {
    test.fixme();
  });
});
