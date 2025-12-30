import { expect, test } from 'fixtures/context';
import { currentTime } from 'src/utils/util';
type contact = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

test.describe.serial('Contact API', () => {
  const contact: contact = {};

  test('GET list contacts', async ({ rcontext }) => {
    const response = await rcontext.get('/v1/contacts');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
  });

  test('POST create contact', async ({ rcontext }) => {
    contact.name = `John${currentTime}`;
    contact.email = `john${currentTime}@yopmail.com`;
    contact.phone = '+14155552671';
    const response = await rcontext.post('/v1/contacts', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: contact.email,
        name: contact.name,
        opt_in_to_all_channels: false,
        phone: contact.phone,
      },
    });
    const body = await response.json();
    expect(body.data.email).toBe(contact.email);
    expect(body.data.name).toBe(contact.name);
    expect(body.data.phone).toBe(contact.phone);
    expect(body.data.state).toBe('open');
    contact.id = body.data.id;
  });

  test('PUT update contact', async ({ rcontext }) => {
    contact.name = `JohnX${currentTime}`;
    contact.email = `john+x${currentTime}@yopmail.com`;

    const response = await rcontext.put(`/v1/contacts/${contact.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: contact.name,
        email: contact.email,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.email).toBe(contact.email);
    expect(body.data.name).toBe(contact.name);
    expect(body.data.phone).toBe(contact.phone);
  });

  test('GET show contact', async ({ rcontext }) => {
    const response = await rcontext.get(`/v1/contacts/${contact.id}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.email).toBe(contact.email);
    expect(body.data.name).toBe(contact.name);
    expect(body.data.phone).toBe(contact.phone);
  });

  test('DELETE delete contact', async ({ rcontext }) => {
    const response = await rcontext.delete(`/v1/contacts/${contact.id}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.email).toBe(contact.email);
    expect(body.data.name).toBe(contact.name);
    expect(body.data.phone).toBe(contact.phone);
  });
});
