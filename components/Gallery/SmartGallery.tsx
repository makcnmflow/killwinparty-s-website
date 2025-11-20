import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../../types';

export const SmartGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // CRITICAL LOGIC: Vite Import Meta Glob
  // In a real Vite project, this automatically imports all files from the directory.
  // Since this is a generated response, we wrap logic to provide fallbacks if the folder is empty.
  const images = useMemo<GalleryItem[]>(() => {
    try {
      // Define the glob pattern
      // The 'as: url' option returns the path as a string rather than a module
      // Cast import.meta to any to avoid TS error if Vite types aren't loaded
      const meta = import.meta as any;
      const globImport = meta.glob('/src/assets/gallery/*.(png|jpe?g|svg|webp|gif)', {
        eager: true,
        as: 'url',
      });

      const items = Object.entries(globImport).map(([path, url]) => {
        // Extract filename for alt text
        const name = path.split('/').pop()?.split('.')[0] || 'Gallery Image';
        return {
          id: path,
          src: url as string,
          alt: name.replace(/[-_]/g, ' '),
        };
      });

      // FALLBACK SIMULATION (If user hasn't added files yet, show beautiful placeholders)
      if (items.length === 0) {
        console.log("No local images found in /src/assets/gallery, using placeholders.");
        return Array.from({ length: 9 }).map((_, i) => ({
          id: `placeholder-${i}`,
          src: `https://picsum.photos/seed/${i + 55}/800/1000`,
          alt: `Abstract Composition ${i + 1}`,
        }));
      }

      return items;
    } catch (e) {
      // Fallback if not running in Vite environment
      return Array.from({ length: 9 }).map((_, i) => ({
          id: `placeholder-${i}`,
          src: `https://picsum.photos/seed/${i + 55}/800/1000`,
          alt: `Abstract Composition ${i + 1}`,
        }));
    }
  }, []);

  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <ImageIcon className="text-purple-400" />
        </div>
        <div>
           <h2 className="text-3xl font-bold">Visual Log</h2>
           <p className="text-white/40 text-sm">Auto-synced from /assets/gallery</p>
        </div>
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            layoutId={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <ZoomIn className="text-white" size={32} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="text-sm font-medium text-white capitalize">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <motion.img
              layoutId={selectedImage.id}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] rounded-lg shadow-[0_0_50px_rgba(100,50,255,0.2)]"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            <div className="absolute bottom-8 text-center">
               <h3 className="text-xl text-white font-bold capitalize">{selectedImage.alt}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};