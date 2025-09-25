const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
const chatbot = async (question) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });
    console.log(response.text);
    return response.text;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports={chatbot}
