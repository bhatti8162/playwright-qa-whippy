import { expect, test } from 'fixtures/context';

import { MESSAGING } from './testData/data';

test('POST - create note', async ({ rcontext }) => {
  const response = await rcontext.post('/v1/messaging/note', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      attachments: MESSAGING.attachments,
      body: 'This contact should be contacted by phone. @{{15}} can you please call them?',
      from: MESSAGING.from,
      opt_in_to_all_channels: false,
      to: MESSAGING.to,
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.data).toHaveProperty('id');
  expect(body.data.source_type).toBe('NOTE');
});

test('POST - send SMS', async ({ rcontext }) => {
  const response = await rcontext.post('/v1/messaging/sms', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      attachments: MESSAGING.attachments,
      body: 'Greetings, earthlings!',
      from: MESSAGING.from,
      opt_in_to_all_channels: false,
      to: MESSAGING.to,
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.data).toHaveProperty('id');
  expect(body.data).toHaveProperty('delivery_status');
});
