import { expect, test } from 'fixtures/context';

import { SEQUENCE } from './testData/data';

test('GET - list sequences', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/sequences`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
  expect(body).toHaveProperty('total');
});

test('GET - show sequence', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/sequences/${SEQUENCE.id}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.title).toBe(SEQUENCE.title);
});

test('GET - list sequence contacts', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/sequences/${SEQUENCE.id}/contacts`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
  expect(body).toHaveProperty('total');
});

test('POST - create sequence contacts', async () => {
  test.fixme();
});
