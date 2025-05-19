import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { projects } = req.body;
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    
    // Write the updated projects to the JSON file
    fs.writeFileSync(filePath, JSON.stringify({ projects }, null, 2));
    
    res.status(200).json({ message: 'Projects updated successfully' });
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ message: 'Error updating projects' });
  }
} 