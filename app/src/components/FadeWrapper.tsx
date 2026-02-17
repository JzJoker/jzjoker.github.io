import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeWrapperProps {
  children: ReactNode;
  contentKey: string;
}

export function FadeWrapper({ children, contentKey }: FadeWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={contentKey}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
