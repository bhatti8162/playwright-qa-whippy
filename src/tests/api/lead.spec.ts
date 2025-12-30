import { expect, test } from 'fixtures/context';
import { currentTime } from 'src/utils/util';

import { CHANNEL } from './testData/data';

test.skip('POST - create lead', async ({ rcontext }) => {
  const response = await rcontext.post('/v1/leads', {
    headers: {
      'Content-Type': 'application/json',
    },

    data: {
      channel_id: CHANNEL.valid_id,
      contact: {
        email: `john${currentTime}@gmail.com`,
        name: `John${currentTime}`,
        phone: '+14155552671',
      },
      conversation: {
        assigned_user_id: 42,
        status: 'closed',
      },
      outbound_message: {
        attachments:
          'https://whippy-public-api-example.s3.us-west-2.amazonaws.com/cat.jpg',
        body: 'Hi back, Lead!',
      },
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toHaveProperty('data');
});
