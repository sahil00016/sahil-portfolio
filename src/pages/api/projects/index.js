import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log('MongoDB connected successfully'); // Debug log

    if (req.method === 'GET') {
      try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        console.log('Projects fetched:', projects.length); // Debug log
        res.status(200).json(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Error fetching projects: ' + error.message });
      }
    } else if (req.method === 'POST') {
      try {
        console.log('Received project data:', req.body); // Debug log
        const project = await Project.create(req.body);
        console.log('Project created:', project); // Debug log
        res.status(201).json(project);
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Error creating project: ' + error.message });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error: ' + error.message });
  }
} 