'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  text: string;
  delay?: number;
  className?: string;
}

const TextEffect = ({ text, delay = 0.4, className}: Props) => {
  const letters = text.split('');

  return (
    <div className={`flex gap-0.5 overflow-hidden ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(10px)', scale: 1 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
            delay: index * delay, 
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default TextEffect;
