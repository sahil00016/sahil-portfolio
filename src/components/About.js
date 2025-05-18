import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'React.js', icon: '⚛️' },
    { name: 'Flutter', icon: '📱' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Node.js', icon: '🚀' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Dart', icon: '🎯' },
    { name: 'JavaScript', icon: '⚡' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const handleDownloadResume = () => {
    window.open('/resume/web_dev.pdf', '_blank');
  };

  return (
    <div id="about" className="min-h-screen py-20 bg-primary relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h2 className="text-4xl font-bold text-lightText mb-6">
                About Me
                <motion.span
                  className="absolute -bottom-2 left-0 w-1/3 h-1 bg-secondary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4 text-lightestText"
            >
              <motion.p variants={item} className="relative pl-6 border-l-2 border-secondary">
              Hey there! I'm Sahil Sonker, a full-stack developer passionate about building dynamic, user-centric web and mobile apps. My journey started at the Indian Institute of Information Technology, Vadodara, mastering tools like ReactJS, Flutter, and TypeScript. Crafting a real-time chat app with Flutter and Firebase was a game-changer, igniting my drive to create seamless digital experiences through clean, innovative code.
              </motion.p>
              <motion.p variants={item} className="relative pl-6 border-l-2 border-secondary">
              Recently, I wrapped up a frontend developer internship at Code Inbound LLP (Nov 2024–May 2025), where I built real-time dashboards for Network Monitoring Systems, boosting UI responsiveness by 25%. My projects, like an AI-powered code editor with Gemini API and a MERN-based event platform, showcase my focus on performance and usability. With skills in Dart, JavaScript, and modern frameworks, I'm eager to keep delivering cutting-edge full-stack solutions.
              </motion.p>
              <motion.p variants={item} className="font-mono text-secondary">
                Here are a few technologies I've been working with recently:
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center space-x-3 bg-tertiary p-3 rounded-lg transform hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="text-lightestText">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Resume Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-secondary text-primary font-mono font-medium rounded-lg overflow-hidden transition-all duration-300 hover:bg-secondary/90"
              >
                <span className="relative z-10 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Decorative Elements */}
              <motion.div
                className="absolute -inset-0.5 bg-secondary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-tertiary rounded-lg p-2">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/20 to-transparent rounded-lg" />
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src="/images/profile.jpg"
                    alt="Sahil Sonker"
                    className="w-full h-full object-cover object-center relative z-10 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-primary/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center"
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-secondary font-mono text-sm">That's me!</p>
                </motion.div>
              </div>
            </div>

            {/* Experience Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2"
            >
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-secondary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 