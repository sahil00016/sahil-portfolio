import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  if (req.method === 'PUT') {
    try {
      const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Error updating project' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting project' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 