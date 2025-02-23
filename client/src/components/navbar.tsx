import { motion } from "framer-motion";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="flex flex-1 justify-center">
          <motion.h1 
            className="text-xl font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Task Manager
          </motion.h1>
        </div>
      </div>
    </nav>
  );
}
