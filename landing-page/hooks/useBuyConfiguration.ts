"use client";

import { useState } from "react";

export function useBuyConfiguration(imagesLength: number) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleColorSelect = (colorId: number, index: number) => {
    setSelectedColor(colorId);
    setActiveImageIndex(index);
  };

  const nextSlide = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesLength);
  };

  const prevSlide = () => {
    setActiveImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength);
  };



  return {
    activeImageIndex,
    setActiveImageIndex,
    selectedColor,
    selectedSize,
    setSelectedSize,
    showVideoPopup,
    setShowVideoPopup,
    showOrderModal,
    setShowOrderModal,
    handleColorSelect,
    nextSlide,
    prevSlide
  };
}
