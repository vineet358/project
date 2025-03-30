"use client";

import { motion } from "framer-motion";

interface FloatingActionButtonProps {
  label: string;
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-50 bg-blue-600 text-white 
        shadow-lg flex items-center justify-center focus:outline-none
        hover:bg-blue-700 hover:shadow-xl w-14 h-14 rounded-full p-0
      "
      aria-label={label}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 20 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </motion.svg>
    </motion.button>
  );
};

export default FloatingActionButton;
