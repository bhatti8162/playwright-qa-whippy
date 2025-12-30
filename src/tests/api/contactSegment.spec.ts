import { expect, test } from 'fixtures/context';

import { CONTACT_SEGMENT } from './testData/data';

test('GET contact segments', async ({ rcontext }) => {
  const response = await rcontext.get('/v1/contacts/segments');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
});

test('GET - show contact segment', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/contacts/segments/${CONTACT_SEGMENT.id}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
  expect(body.data.id).toBe(CONTACT_SEGMENT.id);
  expect(body.data.name).toBe(CONTACT_SEGMENT.name);
});

test('PUT update contact segment', async () => {
  test.fixme();
});

test('DELETE delete contact segment', async () => {
  test.fixme();
});
