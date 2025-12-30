import { expect, test } from 'fixtures/context';

test.describe('Contact List API', () => {
  let contactListId: string;

  test('GET list contact lists', async ({ rcontext }) => {
    const response = await rcontext.get('/v1/contacts/lists');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('total');
  });

  test('POST create contact list', async ({ rcontext }) => {
    const response = await rcontext.post('/v1/contacts/lists', {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        color: '#ffeb3b',
        contacts: [
          {
            email: 'jhondoe@example.com',
            name: 'Jhon',
            phone: '+14243183021',
          },
          {
            email: 'janedoe@example.com',
            name: 'Jane',
            phone: '+14243183020',
          },
        ],
        name: 'New Contact List',
        opt_in_to: [
          {
            id: 'a998e812-8280-454f-8052-b1ef05f406b0',
          },
          {
            id: '0ea1456d-dce8-4a07-8b50-869becf1f6f6',
          },
          {
            phone: '+14243183023',
          },
        ],
        opt_in_to_all_channels: false,
      },
    });
    const body = await response.json();
    expect(body.data.name).toBe('New Contact List');
    expect(body.data.state).toBe('active');
    expect(body.data.color).toBe('#ffeb3b');
    contactListId = await body.data.id;
  });

  test('PUT contact list contacts', async ({ rcontext }) => {
    const response = await rcontext.put(`/v1/contacts/lists/${contactListId}/contacts`, {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        action: 'overwrite',
        contacts: [
          {
            email: 'user@example.com',
            name: 'User',
            phone: '+14243183021',
          },
        ],
        opt_in_to_all_channels: true,
      },
    });
    const body = await response.json();
    expect(body.data.message).toBe('Contact list contacts are being updated');
  });

  test('GET show contact list', async ({ rcontext }) => {
    const response = await rcontext.get(`/v1/contacts/lists/${contactListId}`);
    const body = await response.json();
    expect(body.data.name).toBe('New Contact List');
    expect(body.data.state).toBe('active');
    expect(body.data.color).toBe('#ffeb3b');
    expect(body.data.contacts.total).toBe(1);
    expect(body.data.contacts.data[0].email).toBe('user@example.com');
  });

  test('PUT update contact list', async ({ rcontext }) => {
    const response = await rcontext.put(`/v1/contacts/lists/${contactListId}`, {
      headers: {
        'Content-Type': 'application/json',
      },

      data: {
        color: '#333333',
        name: 'Updated Contact List',
        state: 'archived',
      },
    });
    const body = await response.json();
    expect(body.data.name).toBe('Updated Contact List');
    expect(body.data.state).toBe('archived');
    expect(body.data.color).toBe('#333333');
  });

  test('DELETE delete contact list', async ({ rcontext }) => {
    const response = await rcontext.delete(`/v1/contacts/lists/${contactListId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.name).toBe('Updated Contact List');
    expect(body.data.state).toBe('deleted');
    expect(body.data.color).toBe('#333333');
  });
});
