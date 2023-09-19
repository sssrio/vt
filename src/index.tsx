import axios from 'axios';

var studenAge:number = 0;
var openAiApiKey:string = "";

export default (apiKey: string, age: number) => {
  if(!apiKey || !age){
    throw new Error("Initialization failed! Please check documentation")
  }
  studenAge = age;
  openAiApiKey = apiKey;
  const ask = async (question: string): Promise<string> => {
    const prompt: string = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${question}. Answer this question in a way that a ${studenAge} years old can understand.`,
        },
      ],
    });
    return await axios
      .post("https://api.openai.com/v1/chat/completions", prompt, {
        headers: {
          Authorization: `Bearer ${openAiApiKey}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        const result : string = res.data.choices[0].message.content;
        return result.replace(/\n\n/g, "\n");
      })
      .catch((e: any) => {
        console.log("\x1b[43m","\x1b[34m","\x1b[1m",":: VirtualTeacher :: ","\x1b[0m","\n\t\x1b[31m","\x1b[1m","error generating response,", e.message, "\x1b[0m")
        return '';
      });
  }
  return {
    ask
  }
}
