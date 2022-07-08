import { useEffect, useState } from 'react';
import TextInput from './InputText';
import TextArea from './TextArea';
import Button from './Button';
import Error from './Error';
export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  console.log(flashCard);
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  function handleInputChange(newTitle) {
    setTitle(newTitle);
  }

  function handleTextAreaChange(newDescription) {
    console.log('textArea');
    setDescription(newDescription);
  }

  function clearFields() {
    setTitle('');
    setDescription('');
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      if (onPersist) {
        onPersist(title, description);

        clearFields();
      }
    } else {
      setError('Título e descrição são obrigatorios');
    }
  }

  function handleFormReset(event) {
    clearFields();
  }

  function validateForm() {
    setError('');
    return title.trim() !== '' && description.trim() !== '';
  }

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Manutenção de flash Cards</h2>
      <TextInput
        labelDescription="Titulo"
        inputValue={title}
        onInputChange={handleInputChange}
      ></TextInput>
      <TextArea
        labelDescription="Descrição"
        textAreaValue={description}
        onTextAreaChange={handleTextAreaChange}
      ></TextArea>
      <div className="flex items-center justify-between">
        {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}

        <div>
          <Button colorClass="bg-red-200" type="reset">
            Limpar
          </Button>
          <Button colorClass="bg-green-400" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
