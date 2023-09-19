import axios from 'axios';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export async function ask(age: number, question: string): Promise<string> {
  const prompt: string = `${question}. Answer this question in a way that a ${age} years old can understand.`;
  return axios
    .post('https://testmyreactapplicationfordemopurpose.com', prompt)
    .then((res) => res.data.result)
    .catch(() => {
      return '';
    });
}
