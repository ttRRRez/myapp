import React, { useState } from 'react';
import { Code2, Loader2, Save } from 'lucide-react';

interface ScriptForm {
  name: string;
  description: string;
}

function App() {
  const [form, setForm] = useState<ScriptForm>({ name: '', description: '' });
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      setGeneratedScript(data.script);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGeneratedScript('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-3 mb-12">
          <Code2 className="w-10 h-10 text-blue-400" />
          <h1 className="text-3xl font-bold">Script Generator AI</h1>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Generate Script</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Script Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition h-32"
                  required
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Generate Script
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Generated Script</h2>
            <pre className="bg-gray-900 p-4 rounded-md overflow-auto h-[calc(100%-4rem)]">
              <code className="text-sm font-mono text-gray-300">
                {generatedScript || '// Your generated script will appear here'}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;