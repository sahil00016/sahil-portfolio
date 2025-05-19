import connectDB from '../../lib/mongodb';
import Project from '../../models/Project';

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    // Try to create a test project
    const testProject = {
      title: 'Test Project',
      description: 'This is a test project',
      github: 'https://github.com/test',
      tech: 'React, Node.js',
    };

    const project = await Project.create(testProject);
    console.log('Test project created:', project);

    res.status(200).json({ 
      message: 'Database connection successful',
      project: project 
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      error: 'Database test failed',
      details: error.message 
    });
  }
} 