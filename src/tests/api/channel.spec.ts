import { expect, test } from 'fixtures/context';

import { CHANNEL } from './testData/data';

test('GET - list channels', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/channels`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
});

test('GET - show channel', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/channels/${CHANNEL.valid_id}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.name).toBe(CHANNEL.name);
  expect(body.data.address).toBe(CHANNEL.address);
  expect(body.data.phone).toBe(CHANNEL.phone);
});
