import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../../types';

export const SmartGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const images = useMemo<GalleryItem[]>(() => {
    try {
      // Cast import.meta to any to avoid TS error
      const meta = import.meta as any;
      // Updated to look in the current directory instead of src/assets
      const globImport = meta.glob('./*.(png|jpe?g|svg|webp|gif)', {
        eager: true,
        as: 'url',
      });

      const items = Object.entries(globImport).map(([path, url]) => {
        const name = path.split('/').pop()?.split('.')[0] || 'Image';
        return {
          id: path,
          src: url as string,
          alt: name.replace(/[-_]/g, ' '),
        };
      });

      return items;
    } catch (e) {
      return [];
    }
  }, []);

  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <ImageIcon className="text-purple-400" />
        </div>
        <div>
           <h2 className="text-3xl font-bold">Gallery</h2>
        </div>
      </div>

      {/* Masonry-style Grid */}
      {images.length > 0 ? (
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
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-white/40">
          <p>No images found in gallery folder.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full">
              <X size={32} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
            
            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
               <h3 className="text-xl text-white font-bold capitalize drop-shadow-lg">{selectedImage.alt}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};