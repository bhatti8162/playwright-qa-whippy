import { expect, test } from 'fixtures/context';

import { CHANNEL, CONVERSATION } from './testData/data';

test('GET - list conversations', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/conversations`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
});

test('GET - show conversation', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/conversations/${CONVERSATION.id}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('data');
  expect(body.data.id).toBe(CONVERSATION.id);
  expect(body.data.channel_id).toBe(CHANNEL.valid_id);
});

test('PUT - update conversation', async () => {
  test.fixme();
});
