import { useEffect, useState } from 'react';

export default function FlashCard({
  title = 'Titulo do card',
  description = 'Descrição do card',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
  id = 'id',
}) {
  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm';
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }
  return (
    <div
      className={`shadow-lg m-2 p-4 w-80 h-48 flex
                  flex-row items-center justify-center
                  font-semibold ${fontSizeClassName} cursor-pointer`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
