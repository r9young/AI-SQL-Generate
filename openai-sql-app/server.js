// #### Explanation
// - `express.json()` is used to parse JSON bodies in the request.
// - We receive the `prompt` from the request body.
// - We use the OpenAI `createCompletion` method to get the generated SQL.  
//   - **model**: `text-davinci-003` is a good general-purpose model for text generation.  
//   - **prompt**: We prepend the user’s request with a short instruction (`Write a SQL script for the following request:`).  
//   - **max_tokens**: Limits the length of the generated output.  
//   - **temperature**: Controls randomness; `0.7` is a moderate choice.  
// - We send back the generated SQL in our response as `sql`.

// Rename server.js to server.mjs (or keep .js if "type":"module" is set)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate-sql', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write a SQL script for the following request:\n\n${prompt}`,
      max_tokens: 200,
      temperature: 0.7,
    });
    const generatedSQL = response.data.choices[0].text.trim();
    res.status(200).json({ sql: generatedSQL });
  } catch (error) {
    console.error('Error generating SQL:', error);
    res.status(500).json({ error: 'Failed to generate SQL' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
