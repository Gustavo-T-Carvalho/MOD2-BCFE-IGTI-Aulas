import { useEffect, useState } from 'react';

export default function FlashCard({
  title = 'Titulo do card',
  description = 'Descrição do card',
  showFlashCardTitle = true,
}) {
  const [showTitle, setshowTitle] = useState(showFlashCardTitle);
  useEffect(() => {
    setshowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]);

  const fontSizeClassName = showTitle ? 'text-xl' : 'text-sm';
  function handleClick() {
    // setshowTitle(!showTitle)
    setshowTitle(currentShowTitle => !currentShowTitle);
  }
  return (
    <div
      className={`shadow-lg m-2 p-4 w-80 h-48 flex
                  flex-row items-center justify-center
                  font-semibold ${fontSizeClassName} cursor-pointer`}
      style={{ fontFamily: "'JetBrains Mono', 'monospace'" }}
      onClick={handleClick}
    >
      {showTitle ? title : description}
    </div>
  );
}
