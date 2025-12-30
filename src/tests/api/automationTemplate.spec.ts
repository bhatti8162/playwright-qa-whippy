import { expect, test } from 'fixtures/context';

test('GET - list automation templates', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/automations/templates`);
  expect(response.status()).toBe(200);
});
