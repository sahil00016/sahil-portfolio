import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiSettings } from 'react-icons/fi';

const Hero = () => {
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [nameColor, setNameColor] = useState('#64ffda');
  const [titleColor, setTitleColor] = useState('#ccd6f6');

  const colorPalettes = [
    { name: 'Default', nameColor: '#64ffda', titleColor: '#ccd6f6' },
    { name: 'Sunset', nameColor: '#FF6B6B', titleColor: '#FFA07A' },
    { name: 'Ocean', nameColor: '#00B4D8', titleColor: '#90E0EF' },
    { name: 'Forest', nameColor: '#95D5B2', titleColor: '#B7E4C7' },
    { name: 'Purple', nameColor: '#9B5DE5', titleColor: '#C77DFF' },
    { name: 'Gold', nameColor: '#FFD700', titleColor: '#FFC857' },
  ];

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    })
  };

  const name = "Sahil.".split("");

  return (
    <div id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Color Palette Button */}
      <motion.button
        onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
        className="fixed top-24 right-4 z-50 bg-tertiary p-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiSettings className="w-6 h-6 text-secondary" />
      </motion.button>

      {/* Color Palette Modal */}
      <AnimatePresence>
        {isColorPaletteOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-24 right-20 z-50 bg-tertiary p-6 rounded-lg shadow-xl backdrop-blur-lg border border-secondary/20"
          >
            <h3 className="text-lightText font-mono mb-4">Color Themes</h3>
            <div className="space-y-3">
              {colorPalettes.map((palette, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setNameColor(palette.nameColor);
                    setTitleColor(palette.titleColor);
                  }}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex space-x-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: palette.nameColor }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: palette.titleColor }}
                    />
                  </div>
                  <span className="text-lightText text-sm">{palette.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-secondary opacity-10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-secondary font-mono mb-4 relative"
          >
            <span className="absolute -left-8 top-1/2 w-6 h-[2px] bg-secondary transform -translate-y-1/2"></span>
            Hi, my name is
          </motion.p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1 className="text-4xl sm:text-7xl font-bold mb-4 flex flex-wrap">
            {name.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterAnimation}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ color: nameColor }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-3xl sm:text-6xl font-bold mb-8 relative"
          style={{ color: titleColor }}
        >
          <span className="relative">
            I build things for the web.
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1"
              style={{ backgroundColor: nameColor }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="text-lightestText text-lg max-w-2xl mb-12 relative backdrop-blur-sm bg-primary/30 p-6 rounded-lg border border-secondary/20"
        >
          I'm a software developer specializing in building exceptional digital experiences.
          Currently, I'm focused on building accessible, human-centered products.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center md:justify-start space-x-6"
        >
          {[FiGithub, FiLinkedin, FiTwitter].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + index * 0.1 }}
              className="text-lightText hover:text-secondary transition-colors duration-300 relative group"
            >
              <Icon size={24} />
              <motion.span
                className="absolute -bottom-2 left-1/2 w-1 h-1 bg-secondary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ delay: 2.5 + index * 0.1 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-secondary rounded-full p-1"
          >
            <motion.div
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-secondary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 