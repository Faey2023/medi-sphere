'use client';

import { motion } from 'framer-motion';

const Newsletter = () => {

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-10 w-full bg-cyan-900 text-cyan-50 py-10 px-6 text-center"
    >
      <h2 className="text-2xl font-bold  sm:text-3xl">
        Subscribe to Our Newsletter
      </h2>
      <p className="mt-2">
        Get updates on latest medicines, offers, and health tips.
      </p>

      <form
        className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full max-w-sm rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-300"
        />
        <button
          type="submit"
          className="rounded-md bg-cyan-700 px-6 py-2 text-white transition-all duration-300 hover:bg-cyan-800"
        >
          Subscribe
        </button>
      </form>
    </motion.section>
  );
};

export default Newsletter;
