export async function fetchOceanTraits(text) {
    const response = await fetch('https://ocean-model.onrender.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch OCEAN traits');
    }
  
    const data = await response.json();
    return data;
  }