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
  const [showTitle, setshowTitle] = useState(true);
  function handleButtonClick() {
    console.log('handle');
    const shuffledCards = helperShuffleArray(allCards);
    console.log(shuffledCards);
    setAllCards(shuffledCards);
  }

  function handleRadioButtonTitleClick() {
    setshowTitle(true);
  }
  function handleRadioShowDescriptionClick() {
    setshowTitle(false);
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
            buttonChecked={showTitle}
            onButtonClick={handleRadioButtonTitleClick}
          >
            Mostrar título
          </RadioButton>
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!showTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description }) => {
            return (
              <FlashCard
                key={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
