import { expect, test } from 'fixtures/context';

import { ORGANIZATION } from './testData/data';

test('GET - show organization', async ({ rcontext }) => {
  const response = await rcontext.get(`/v1/organization`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  const { data } = body;
  expect(data['id']).toBe(ORGANIZATION.id);
  expect(data['name']).toBe(ORGANIZATION.name);
});
