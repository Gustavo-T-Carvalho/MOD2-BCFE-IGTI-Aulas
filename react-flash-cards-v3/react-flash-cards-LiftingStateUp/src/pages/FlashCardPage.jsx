import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import FlashCard from '../components/FlashCard';
import FlashCardItem from '../components/FlashCardItem';
import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Error from '../components/Error';
import FlashCardForm from '../components/FlashCardForm';

import { ClipLoader } from 'react-spinners';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import {
  apiCreateFlashCard,
  apiDeleteFlashCard,
  apiEditFlashCard,
  apiGetAllFlashCards,
} from '../services/apiService';
import { getNewId } from '../services/idService';

export default function FlashCardPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowtitle, setradioButtonShowtitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);
  useEffect(() => {
    // Promises
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });

    // IIF
    // (async function getAllCards() {
    //   const backEndAllCards = await apiGetAllFlashCards();
    //   setAllCards(backEndAllCards);
    // })()

    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }
    getAllCards();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffleClick() {
    const shuffledCards = helperShuffleArray(studyCards);
    console.log(shuffledCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioButtonTitleClick() {
    let updatedCards = [...studyCards].map(item => ({
      ...item,
      showTitle: true,
    }));
    setStudyCards(updatedCards);
    setradioButtonShowtitle(true);
  }

  function handleRadioShowDescriptionClick() {
    let updatedCards = [...studyCards].map(item => ({
      ...item,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setradioButtonShowtitle(false);
  }

  function handleToggleFlashCard(cardId) {
    let updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  async function handleDeleteFlashCard(cardId) {
    try {
      await apiDeleteFlashCard(cardId);
      setAllCards(allCards.filter(card => card.id !== cardId));
      toast.success('Card Excluido com sucesso');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    console.log(card);
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }
  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      try {
        const newFlashCard = await apiCreateFlashCard(title, description);
        setAllCards([...allCards, newFlashCard]);
        toast.success(`Card ${title} incluido com sucesso`);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const updatedFlashCard = await apiEditFlashCard(
          selectedFlashCard.id,
          title,
          description
        );

        setAllCards(
          [...allCards].map(card => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }
            return card;
          })
        );
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError('');
        toast.success(`Card ${title} alterado com sucesso`);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <ClipLoader></ClipLoader>
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                  key={FlashCard.id}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo flash card
              </Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffleClick}>
                Embaralhar cards
              </Button>
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
              {studyCards.map(({ id, title, description, showTitle }) => {
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Header>react-flash-dards-v3</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
