"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const images = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    title: "Mountain Lake",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1682687221038-404670f09439",
    title: "Coastal Sunset",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    title: "Forest Path",
  },
  // Add more images as needed
];

export function Gallery() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage);
    
    if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
      router.push(`/photos/${images[currentIndex + 1].id}`);
      setSelectedImage(images[currentIndex + 1].id);
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      router.push(`/photos/${images[currentIndex - 1].id}`);
      setSelectedImage(images[currentIndex - 1].id);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <motion.div
          key={image.id}
          className={cn(
            "relative aspect-square overflow-hidden rounded-lg cursor-pointer",
            "hover:shadow-xl transition-shadow duration-300"
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            setSelectedImage(image.id);
            router.push(`/photos/${image.id}`, { scroll: false });
          }}
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      ))}
    </div>
  );
}