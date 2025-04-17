// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';
// import axios from 'axios';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY
// );

// // Function to get similar scripts from Supabase for RAG
// async function getSimilarScripts(description) {
//   const { data, error } = await supabase
//     .from('scripts')
//     .select('*')
//     .textSearch('description', description)
//     .limit(3);

//   if (error) throw error;
//   return data;
// }

// // Function to generate prompt with examples
// function generatePrompt(name, description, similarScripts) {
//   const examples = similarScripts.map(script => `
// Example:
// Name: ${script.name}
// Description: ${script.description}
// Code:
// ${script.code}
// `).join('\n');

//   return `Generate a JavaScript script based on the following requirements:
// Name: ${name}
// Description: ${description}

// Here are some similar examples for reference:
// ${examples}

// Please generate a JavaScript script that matches the requirements above.`;
// }

// app.post('/api/generate', async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     // Get similar scripts for RAG
//     const similarScripts = await getSimilarScripts(description);

//     // Generate prompt with examples
//     const prompt = generatePrompt(name, description, similarScripts);

//     // Call Ollama API
//     const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
//       model: 'codellama',
//       prompt
//     });

//     // Store the generated script in Supabase
//     const { data: scriptData, error: scriptError } = await supabase
//       .from('scripts')
//       .insert([
//         {
//           name,
//           description,
//           code: ollamaResponse.data.response,
//           created_at: new Date()
//         }
//       ]);

//     if (scriptError) throw scriptError;

//     res.json({ script: ollamaResponse.data.response });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to generate script' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });*

console.log('test'); 