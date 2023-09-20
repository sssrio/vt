import axios from 'axios';
const fetch = require('node-fetch');
var studenAge:number = 0;
var openAiApiKey:string = "";
var result: string = "";

export default (options:any) => {
  console.log(options)
  if(!options.apiKey || !options.age){
    console.log(options.apiKey,options.age)
    throw new Error("Initialization failed! Please check documentation")
  }
  studenAge = options.age;
  openAiApiKey = options.apiKey;

  const ask = async (question: string): Promise<object> => {
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
      .then(async(res: any) => {
        result = res.data.choices[0].message.content;
        result = result.replace(/\n\n/g, "\n");
        
        // if(options.mode.toLowerCase() === "audio"){
        //   console.log("generating audio")
        //   const config = {
        //     method: 'POST',
        //     headers: {
        //       accept: 'text/event-stream', 
        //       'content-type': 'application/json',
        //       Authorization:`Bearer ${options.playHTKey}`,
        //       'X-USER-ID': options.playHTUserId
        //     },
        //     body: JSON.stringify({
        //       text: result,
        //       voice: 'larry',
        //       quality: 'medium',
        //       output_format: 'mp3',
        //       speed: 0.8,
        //       sample_rate: 24000
        //     })
        //   };
          
        //   fetch("https://play.ht/api/v2/tts", config)
        //     .then(res => {console.log(res); return res.json()})
        //     .then(json => console.log({json}))
        //     .catch(err => console.error('error:' + err));
        // }
        return {text: result, audio: ""}
      })
      .catch((e: any) => {
        console.log("\x1b[43m","\x1b[34m","\x1b[1m",":: VirtualTeacher :: ","\x1b[0m","\n\t\x1b[31m","\x1b[1m","error generating response,", e.message, "\x1b[0m")
        return {text: "", audio: ""}
      });
  }
  return {
    ask
  }
}
