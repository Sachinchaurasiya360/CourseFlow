const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

const Aimodel = async (question) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {question}
    });
    console.log(response.text);
    return response.text
  } catch (error) {
    console.error(error)
    return null
  }
};

Aimodel("Who is the prime minister of india "); 
