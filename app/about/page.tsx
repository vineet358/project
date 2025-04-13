'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const team = [
  { id: 1011, name: 'Aarav S.', role: 'Frontend Engineer' },
  { id: 1027, name: 'Neha R.', role: 'UI/UX Designer' },
  { id: 1005, name: 'Ishaan K.', role: 'Backend Developer' },
  { id: 1035, name: 'Priya M.', role: 'Fullstack Dev' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

export default function TeamSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 dark:bg-[#0a0a0a] text-center transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
          🧑‍💻 Meet the Dev Team
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 pacifico">
          4 Engineers, One Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 text-base md:text-lg">
          We’re a small group of passionate engineering students building tech, writing about it, and having fun along the way.
        </p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className={`flex justify-center items-center relative w-[250px] h-[360px] mx-auto rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 ${
                index % 2 === 0 ? 'translate-y-3' : '-translate-y-3'
              } bg-white dark:bg-[#1A1A1A]`}
            >
              <Image
                src={`https://picsum.photos/id/${member.id}/260/550`}
                alt={member.name}
                width={260}
                height={550}
                className="object-cover w-full h-full"
              />
                <div className="absolute bottom-1 w-[96%] px-3 py-2 backdrop-blur-md bg-white/30 dark:bg-black/30 text-left text-sm text-gray-800 dark:text-gray-100 rounded-xl flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-base">{member.name}</h3>
                    <p className="text-xs opacity-80">{member.role}</p>
                </div>
                <button className="group w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-white/15 dark:text-gray-100 dark:hover:bg-white/20 transition-colors duration-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    </button>

                </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
