import { users } from './src/api';

const start = async () => {
  console.log(await users());
}

start();
