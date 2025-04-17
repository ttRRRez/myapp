import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Function to check if Ollama is running
async function checkOllamaStatus() {
  try {
    await axios.get('http://localhost:11434/api/version');
    return true;
  } catch (error) {
    return false;
  }
}

// Function to generate prompt
function generatePrompt(name, description) {
  return `Generate a JavaScript script based on the following requirements:
Name: ${name}
Description: ${description}

Please generate a JavaScript script that matches the requirements above.`;
}

app.get('/api/status', async (req, res) => {
  const isOllamaRunning = await checkOllamaStatus();
  res.json({ 
    status: isOllamaRunning ? 'running' : 'not_running',
    message: isOllamaRunning ? 'Ollama is running' : 'Ollama is not running. Please start Ollama first.'
  });
});

app.post('/api/generate', async (req, res) => {
  try {
    // Check if Ollama is running
    const isOllamaRunning = await checkOllamaStatus();
    if (!isOllamaRunning) {
      return res.status(503).json({ 
        error: 'Ollama service unavailable',
        message: 'Please make sure Ollama is running and the CodeLlama model is installed.'
      });
    }

    const { name, description } = req.body;

    // Generate prompt
    const prompt = generatePrompt(name, description);

    // Call Ollama API
    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'codellama',
      prompt,
      stream: false
    });

    if (!ollamaResponse.data.response) {
      throw new Error('No response from Ollama');
    }

    res.json({ script: ollamaResponse.data.response });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error.response?.data?.error || error.message || 'Failed to generate script';
    res.status(500).json({ error: errorMessage });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

