import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/images/palawan-1.webp",
  "/images/palawan-2.webp",
  "/images/palawan-3.jpg",
  "/images/palawan-4.jpg",
];

export function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Image
            src={src}
            alt={`Palawan scenery ${index + 1}`}
            width={300}
            height={200}
            className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </motion.div>
      ))}
    </div>
  );
}
