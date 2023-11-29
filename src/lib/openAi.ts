import OpenAI from "openai";
import { prompt } from "../utils";

async function getRequirements(req: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const request = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: prompt + req },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  const textAsJSON = JSON.parse(request.choices[0].message.content || "{}");
  const requirements = [] as string[];

  textAsJSON.requirements.forEach((requirement: any) => {
    requirements.push(requirement);
  });

  return requirements;
}

export { getRequirements };
