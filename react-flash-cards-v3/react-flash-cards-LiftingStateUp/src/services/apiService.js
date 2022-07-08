import { read, exclude, create, edit } from './httpService';
import { getNewId } from './idService';

export async function apiGetAllFlashCards() {
  const allFlashCards = await read('/flashCards');
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = await create('/flashcards', {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
}

export async function apiEditFlashCard(cardId, title, description) {
  const updatedFlashCard = await edit(`/flashcards/${cardId}`, {
    title,
    description,
  });
  return updatedFlashCard;
}
