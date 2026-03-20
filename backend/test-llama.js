import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

async function testSambaNova() {
  console.log('🔍 Testing SambaNova API...');
  console.log('API Key exists:', !!process.env.SAMBA_API_KEY);
  console.log('Model:', process.env.SAMBA_MODEL || 'Llama-4-Maverick-17B-128E-Instruct');
  
  if (!process.env.SAMBA_API_KEY) {
    console.error('❌ SAMBA_API_KEY not found in .env');
    console.log('\n📝 Get your key: https://cloud.sambanova.ai');
    return;
  }
  
  const client = new OpenAI({
    baseURL: 'https://api.sambanova.ai/v1',
    apiKey: process.env.SAMBA_API_KEY,
  });
  
  try {
    console.log('📡 Sending test request...');
    const completion = await client.chat.completions.create({
      model: process.env.SAMBA_MODEL || 'Llama-4-Maverick-17B-128E-Instruct',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say "SambaNova API is working!" in exactly 5 words.' }
      ],
      max_tokens: 30,
      temperature: 0,
    });
    
    console.log('✅ API call successful!');
    console.log('Response:', completion.choices[0].message.content);
    console.log('Model used:', completion.model);
  } catch (err) {
    console.error('❌ API call failed:');
    console.error('Status:', err.status);
    console.error('Message:', err.message);
    
    if (err.status === 401) {
      console.log('\n🔑 Invalid API key. Get your key from: https://cloud.sambanova.ai');
    }
    if (err.status === 429) {
      console.log('\n⏰ Rate limited. Wait a moment and try again.');
    }
  }
}

testSambaNova();