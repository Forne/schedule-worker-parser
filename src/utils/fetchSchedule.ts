import * as dotenv from 'dotenv';

dotenv.config();

export async function fetchSchedule() {
  const res = await fetch(`${process.env.PARSER_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
}
