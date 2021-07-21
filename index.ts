import { users } from './src/api';

const start = async (): Promise<void> => {
  console.log(await users());
}

start();
