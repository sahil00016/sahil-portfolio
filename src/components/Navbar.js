import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const navItems = [
    { id: 1, link: 'home', label: 'Home' },
    { id: 2, link: 'about', label: 'About' },
    { id: 3, link: 'projects', label: 'Projects' },
    { id: 4, link: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-primary text-lightText z-50">
      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-secondary font-mono">Portfolio</h1>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {navItems.map(({ id, link, label }) => (
          <motion.li
            key={id}
            className="px-4 cursor-pointer font-medium hover:text-secondary duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to={link} smooth duration={500}>
              {label}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div onClick={handleClick} className="md:hidden z-10 cursor-pointer">
        {!nav ? <Bars3Icon className="w-6 h-6" /> : <XMarkIcon className="w-6 h-6" />}
      </div>

      {/* Mobile Menu */}
      <motion.ul
        className={`${
          nav ? 'flex' : 'hidden'
        } absolute top-0 left-0 w-full h-screen bg-primary flex-col justify-center items-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: nav ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map(({ id, link, label }) => (
          <li key={id} className="py-6 text-4xl">
            <Link
              onClick={handleClick}
              to={link}
              smooth
              duration={500}
              className="hover:text-secondary duration-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navbar; 