import { expect, test } from 'fixtures/context';

import { CAMPAIGN_ID } from './testData/data';

test('GET - list campaigns', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/campaigns`);
  expect(response.status()).toBe(200);
});

test('GET - show campaign', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/campaigns/${CAMPAIGN_ID.valid}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
});

test('GET - campaign contacts', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/campaigns/${CAMPAIGN_ID.valid}/contacts`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
  expect(body.total).toBe(1);
});
