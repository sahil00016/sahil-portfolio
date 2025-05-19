import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project.'],
  },
  image: {
    type: String,
  },
  github: {
    type: String,
    required: [true, 'Please provide a GitHub URL for this project.'],
  },
  live: {
    type: String,
  },
  tech: {
    type: String,
    required: [true, 'Please provide technologies used in this project.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema); 