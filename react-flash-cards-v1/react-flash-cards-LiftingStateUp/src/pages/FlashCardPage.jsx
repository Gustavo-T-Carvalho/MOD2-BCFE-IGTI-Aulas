import FlashCard from '../components/FlashCard';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import { allFlashCards } from '../data/allFlashCards';
import { useState } from 'react';
import { helperShuffleArray } from '../helpers/arrayHelpers';

export default function FlashCardPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [radioButtonShowtitle, setradioButtonShowtitle] = useState(true);
  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);
    console.log(shuffledCards);
    setAllCards(shuffledCards);
  }

  function handleRadioButtonTitleClick() {
    let updatedCards = [...allCards].map(item => ({
      ...item,
      showTitle: true,
    }));
    setAllCards(updatedCards);
    setradioButtonShowtitle(true);
  }
  function handleRadioShowDescriptionClick() {
    let updatedCards = [...allCards].map(item => ({
      ...item,
      showTitle: false,
    }));
    setAllCards(updatedCards);
    setradioButtonShowtitle(false);
  }
  function handleToggleFlashCard(cardId) {
    let updatedCards = [...allCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setAllCards(updatedCards);
  }
  return (
    <>
      <Header>react-flash-dards-v1</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowtitle}
            onButtonClick={handleRadioButtonTitleClick}
          >
            Mostrar título
          </RadioButton>
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowtitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
