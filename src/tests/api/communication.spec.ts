import { expect, test } from 'fixtures/context';

test('GET - list preferences', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/contacts/communication_preferences `);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
});

test('POST - opt in', async () => {
  test.fixme();
});

test('POST - opt out', async () => {
  test.fixme();
});
