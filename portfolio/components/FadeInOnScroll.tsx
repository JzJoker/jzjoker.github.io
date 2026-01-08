'use client'; 

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
}

const FadeInOnScroll = ({ children, delay = 0 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }} 
      className=" shadow-md border-1 border-gray w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
