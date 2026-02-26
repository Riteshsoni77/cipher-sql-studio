import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export const askLLM = async (userInput) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userInput, 
        },
      ],
      model: "openai/gpt-oss-120b", 
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: true,
      reasoning_effort: "medium",
      stop: null,
    });

    let response = '';
    for await (const chunk of chatCompletion) {
      response += chunk.choices[0]?.delta?.content || '';
    }

    return response; 
  } catch (error) {
    console.error("Error in askLLM:", error);
    throw error; 
  }
};
