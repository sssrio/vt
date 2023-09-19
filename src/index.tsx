const axios = require('axios');
const {ENGINE, OPENAI_API_KEY} = require("@env");

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export async function ask(age: number, question: string): Promise<string> {
  const prompt: string = JSON.stringify({
    model: ENGINE || "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `${question}. Answer this question in a way that a ${age} years old can understand.`,
      },
    ],
  });
  return axios
    .post("https://api.openai.com/v1/chat/completions", prompt, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => {
      const result : string = res.data.choices[0].message.content;
      return result.replace(/\n\n/g, "\n");
    })
    .catch((e: any) => {
      console.log("error generating response", e.message)
      return '';
    });
}
