import { expect, test } from 'fixtures/context';
test.describe.serial('Template APIs', () => {
  let templateId: string;

  test('GET - list templates', async ({ rcontext }) => {
    const response = await rcontext.get(`/v1/templates`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
  });

  test('POST - create template', async ({ rcontext }) => {
    const response = await rcontext.post(`/v1/templates`, {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        access_level: 'organization',
        channels: [
          'f7b4cd41-66ca-4eb7-9872-eb3e2b595122',
          '776e3283-e942-43fd-bd5b-0f6958e4fe65',
        ],
        created_by_id: 1,
        message: 'template-message',
        title: 'my-title',
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.data.title).toBe('my-title');
    expect(body.data.message).toBe('template-message');
    expect(body.data.access_level).toBe('organization');
    templateId = await body.data.id;
  });

  test('PUT - update template', async ({ rcontext }) => {
    const response = await rcontext.put(`/v1/templates/${templateId}`, {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        access_level: 'organization',
        channels: [
          'f7b4cd41-66ca-4eb7-9872-eb3e2b595122',
          '776e3283-e942-43fd-bd5b-0f6958e4fe65',
        ],
        created_by_id: 1,
        message: 'updated-message',
        title: 'updated-title',
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.title).toBe('updated-title');
    expect(body.data.message).toBe('updated-message');
    expect(body.data.access_level).toBe('organization');
  });

  test('PUT - delete template', async ({ rcontext }) => {
    const response = await rcontext.delete(`/v1/templates/${templateId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.title).toBe('updated-title');
    expect(body.data.message).toBe('updated-message');
    expect(body.data.access_level).toBe('organization');
  });
});
