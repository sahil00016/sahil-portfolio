import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState(() => {
    // Initialize projects from localStorage if available
    const savedProjects = localStorage.getItem('portfolioProjects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isPortfolioAdmin') === 'true';
  });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: null,
    github: '',
    live: '',
    tech: '',
  });

  // Add useEffect to save projects to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    console.log('Projects updated:', projects); // Debug log
  }, [projects]);

  // Secret admin activation function
  const activateAdmin = () => {
    const password = prompt('Enter admin password:');
    if (password === 'sahil016') { // You can change this password
      localStorage.setItem('isPortfolioAdmin', 'true');
      setIsAdmin(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditMode) {
          setEditingProject({ ...editingProject, image: reader.result });
        } else {
          setNewProject({ ...newProject, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode && editingProject) {
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      );
      setProjects(updatedProjects);
      setEditingProject(null);
      setIsEditMode(false);
    } else {
      const newProjectData = { 
        ...newProject, 
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      setProjects(prevProjects => [...prevProjects, newProjectData]);
      console.log('Adding new project:', newProjectData); // Debug log
    }
    setIsModalOpen(false);
    setNewProject({
      title: '',
      description: '',
      image: null,
      github: '',
      live: '',
      tech: '',
    });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div id="projects" className="min-h-screen py-20 relative" onDoubleClick={activateAdmin}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-secondary/5"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                rotate: [0, Math.random() * 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-lightText mb-4 relative inline-block">
            My Projects
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-secondary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h2>
          <p className="text-lightestText mb-8">Some things I've built</p>
          {isAdmin && (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium bg-secondary text-primary rounded-lg hover:bg-opacity-80 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative flex items-center space-x-2">
                <FiPlus className="w-5 h-5" />
                <span>Add New Project</span>
              </span>
            </motion.button>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="bg-tertiary rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 relative"
            >
              {/* Edit and Delete Buttons - Only show for admin */}
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2 z-20">
                  <motion.button
                    onClick={() => handleEdit(project)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-tertiary rounded-full text-secondary hover:bg-primary transition-colors duration-300 shadow-lg"
                    title="Edit project"
                  >
                    <FiEdit2 size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(project.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-tertiary rounded-full text-red-400 hover:text-red-500 hover:bg-primary transition-colors duration-300 shadow-lg"
                    title="Delete project"
                  >
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
              )}

              {/* Project Image Section */}
              {project.image && (
                <div className="relative group aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90 flex items-center justify-center"
                  >
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-secondary hover:text-white transition-colors duration-300"
                      >
                        <FiGithub size={24} />
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-secondary hover:text-white transition-colors duration-300"
                        >
                          <FiExternalLink size={24} />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Project Links Section (when no image) */}
              {!project.image && (
                <div className="p-4 flex justify-end space-x-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-secondary hover:text-white transition-colors duration-300"
                  >
                    <FiGithub size={24} />
                  </motion.a>
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-secondary hover:text-white transition-colors duration-300"
                    >
                      <FiExternalLink size={24} />
                    </motion.a>
                  )}
                </div>
              )}

              {/* Project Details */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-lightText mb-2">{project.title}</h3>
                <p className="text-lightestText mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(',').map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-secondary text-sm bg-primary/50 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {tech.trim()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add/Edit Project Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-tertiary p-8 rounded-lg w-full max-w-md relative"
              >
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setEditingProject(null);
                  }}
                  className="absolute top-4 right-4 text-lightText hover:text-secondary transition-colors"
                >
                  <FiX size={24} />
                </button>
                <h3 className="text-2xl font-bold text-lightText mb-6">
                  {isEditMode ? 'Edit Project' : 'Add New Project'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-lightText mb-2">Title</label>
                    <input
                      type="text"
                      value={isEditMode ? editingProject.title : newProject.title}
                      onChange={(e) => {
                        if (isEditMode) {
                          setEditingProject({ ...editingProject, title: e.target.value });
                        } else {
                          setNewProject({ ...newProject, title: e.target.value });
                        }
                      }}
                      className="w-full bg-primary text-lightText p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lightText mb-2">Description</label>
                    <textarea
                      value={isEditMode ? editingProject.description : newProject.description}
                      onChange={(e) => {
                        if (isEditMode) {
                          setEditingProject({ ...editingProject, description: e.target.value });
                        } else {
                          setNewProject({ ...newProject, description: e.target.value });
                        }
                      }}
                      className="w-full bg-primary text-lightText p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                      rows="3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lightText mb-2">Project Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-lightText"
                    />
                    {isEditMode && editingProject.image && (
                      <div className="mt-2">
                        <p className="text-sm text-lightestText mb-1">Current image:</p>
                        <img
                          src={editingProject.image}
                          alt="Current project"
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-lightText mb-2">GitHub URL</label>
                    <input
                      type="url"
                      value={isEditMode ? editingProject.github : newProject.github}
                      onChange={(e) => {
                        if (isEditMode) {
                          setEditingProject({ ...editingProject, github: e.target.value });
                        } else {
                          setNewProject({ ...newProject, github: e.target.value });
                        }
                      }}
                      className="w-full bg-primary text-lightText p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lightText mb-2">Live URL (Optional)</label>
                    <input
                      type="url"
                      value={isEditMode ? editingProject.live : newProject.live}
                      onChange={(e) => {
                        if (isEditMode) {
                          setEditingProject({ ...editingProject, live: e.target.value });
                        } else {
                          setNewProject({ ...newProject, live: e.target.value });
                        }
                      }}
                      className="w-full bg-primary text-lightText p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                      placeholder="https://your-project-url.com"
                    />
                  </div>
                  <div>
                    <label className="block text-lightText mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={isEditMode ? editingProject.tech : newProject.tech}
                      onChange={(e) => {
                        if (isEditMode) {
                          setEditingProject({ ...editingProject, tech: e.target.value });
                        } else {
                          setNewProject({ ...newProject, tech: e.target.value });
                        }
                      }}
                      className="w-full bg-primary text-lightText p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                      placeholder="React, Tailwind, Node.js"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsEditMode(false);
                        setEditingProject(null);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-lightText hover:text-secondary transition-colors duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-secondary text-primary rounded-lg hover:bg-opacity-80 transition-all duration-300"
                    >
                      {isEditMode ? 'Save Changes' : 'Add Project'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects; 