"use client";

import { useState } from "react";

export function useBuyConfiguration(imagesLength: number) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const handleColorSelect = (colorId: string, index: number) => {
    setSelectedColor(colorId);
    setActiveImageIndex(index);
  };

  const nextSlide = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesLength);
  };

  const prevSlide = () => {
    setActiveImageIndex((prev) => (prev - 1 + imagesLength) % imagesLength);
  };

  const handleBuy = (colorName: string) => {
    alert(`Đặt mua thành công Galaxy Ring màu ${colorName}, Size: ${selectedSize || 'Chưa chọn'}`);
  };

  return {
    activeImageIndex,
    setActiveImageIndex,
    selectedColor,
    selectedSize,
    setSelectedSize,
    showVideoPopup,
    setShowVideoPopup,
    handleColorSelect,
    nextSlide,
    prevSlide,
    handleBuy
  };
}
