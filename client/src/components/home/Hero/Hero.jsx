import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-slate-950 to-blue-500/20" />

      {/* Glow */}

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-red-500/20 blur-[120px]" />

      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 mb-6">
            AI Powered Movie Discovery
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Discover Movies
            <span className="text-red-500"> You'll Love</span>
          </h1>

          <p className="mt-8 text-lg text-slate-400 max-w-2xl">
            Personalized recommendations powered by machine learning,
            TMDB data, and intelligent content analysis.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;