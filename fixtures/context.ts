import { APIRequestContext, test as base } from '@playwright/test';

type Fixtures = {
  rcontext: APIRequestContext;
};

export const test = base.extend<Fixtures>({
  rcontext: async ({ playwright }, use) => {
    const requestContext = await playwright.request.newContext({
      baseURL: 'https://api.whippy.co',
      extraHTTPHeaders: {
        'X-WHIPPY-KEY': process.env.API_KEY!,
        Accept: 'application/json',
      },
    });
    await use(requestContext);
  },
});

export { expect } from '@playwright/test';
