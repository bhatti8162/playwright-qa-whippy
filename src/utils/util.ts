export const random = (): number => Math.floor(100000 + Math.random() * 900000);

export const randomString = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, '')
  .substr(0, 5);

export const delay = async (t: number): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, t));

const date = Date.now();
export const currentTime = date.toString();

const plan = ['Individual Plan', 'Extended Family Plan'];

export const randomPlan = plan[Math.floor(Math.random() * plan.length)];

export const option = Math.round(Math.random() * 3) + 1;

// Function to generate random numbers between 0 and 9
function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

// Generate a string of six random numbers
export function getPhoneNumber(number: number) {
  let randomNumberString = '';
  for (let i = 0; i < number; i++) {
    const randomNumber = generateRandomNumber();
    randomNumberString += randomNumber;
  }
  return randomNumberString;
}

export const randomNumber = getPhoneNumber(6);
