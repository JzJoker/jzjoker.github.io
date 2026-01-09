'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  text: string;
  delay?: number;
  className?: string;
}

const TextEffect = ({ text, delay = 0.05, className}: Props) => {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap gap-1 overflow-hidden ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(10px)', scale: 1 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            delay: 1.5 + (index * delay), 
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default TextEffect;