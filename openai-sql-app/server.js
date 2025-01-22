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

// OpenAI API Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Reads the API key from the .env file
});
const openai = new OpenAIApi(configuration);

// Debug: Log API Key Status
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set in the .env file');
} else {
  console.log('OPENAI_API_KEY is loaded');
}

// Route for SQL Generation

// The OpenAIApi class is part of the OpenAI Node.js library, 
// and you create an instance of it to interact with the OpenAI API. 
// Then you use methods like createChatCompletion on that instance to perform specific actions, 
// such as generating text or completing a chat.

app.post('/generate-sql', async (req, res) => {
  // Request sent to OpenAI
  try {
    const { prompt } = req.body;
    const response = await openai.createChatCompletion({
    // ** it is createChatCompletion method, not createCompletion **
      model: 'gpt-4',
      // prompt: `Write a SQL script for the following request:\n\n${prompt}`,
      messages: [
        { role: 'system', content: 'You are a helpful assistant that writes SQL scripts. If You get the table name please return the SQL script without any additional explanation or text, otherwise please remind me give you table name' },
        { role: 'assistant', content: 'SELECT * FROM table_name WHERE condition;' },
        { role: 'user', content: `Write a SQL script for the following request:\n\n${prompt}` }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    // if Reponse Received from OpenAI, processing the response
    const generatedSQL = response.data.choices[0].message.content.trim();
    res.status(200).json({ sql: generatedSQL });
  } catch (error) {
    console.error('Error generating SQL:', error);
    res.status(500).json({ error: 'Failed to generate SQL' });
  }
});

// Start the Server
const PORT = process.env.PORT || 3000; // Use port from environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});