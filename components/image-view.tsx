"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export function ImageView({ id }: { id: string }) {
  const router = useRouter();
  const currentImage = images.find((img) => img.id === id);
  const currentIndex = images.findIndex((img) => img.id === id);

  const [direction, setDirection] = useState(0);

  const navigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setDirection(newIndex > currentIndex ? 1 : -1);
      router.push(`/photos/${images[newIndex].id}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        navigate(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        navigate(currentIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (!currentImage) return null;

  return (
    <div className="relative w-full h-[80vh]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentImage.id}
          custom={direction}
          initial={{ x: 300 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300 * direction, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full h-full"
        >
          <Image
            src={currentImage.url}
            alt={currentImage.title}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => navigate(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => navigate(currentIndex + 1)}
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-20 left-0 right-0">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => navigate(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                  currentImage.id === image.id
                    ? "ring-2 ring-primary"
                    : "opacity-50"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}