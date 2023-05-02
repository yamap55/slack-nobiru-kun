// deno run --allow-all ./sample/openai.ts
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { Configuration, OpenAIApi } from "npm:openai";

const { OPENAI_API_KEY } = config();

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "OpenAPIとはなんですか？完結に説明してください。",
  temperature: 0.3,
  max_tokens: 500,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
});
console.log(response.data.choices[0].text);
