import { useState, useEffect } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Timer from './components/Timer';
import DateInput from './components/DateInput';
import TextInput from './components/TextInput';
import CheckboxInput from './components/CheckboxInput';

import { getNewId } from './services/idService';
import { getAgeFrom } from './helpers/getAge';
import OnlineOffline from './components/OnlineOffline';
// import Teste from './components/Teste';

export default function App() {
  // Versão sem destructuring
  // const state = useState('Gustavo');
  // const name = state[0];
  // const setName = state[1];

  //Dependencias do useEffect

  const [name, setName] = useState('Gustavo');
  const [date, setDate] = useState('1996-08-03');
  const [showTimer, setShowTimer] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    document.title = name;
  }, [name]);

  useEffect(() => {
    //online
    //offline
    function toggleOnline() {
      console.log('toggleOnline');
      setIsOnline(true);
    }
    function toggleOffline() {
      console.log('toggleOffline');
      setIsOnline(false);
    }

    window.addEventListener('online', toggleOnline);
    window.addEventListener('offline', toggleOffline);

    return () => {
      window.removeEventListener('online', toggleOnline);
      window.removeEventListener('offline', toggleOffline);
    };
  }, []);

  function handleNameChange(newName) {
    setName(newName);
  }

  function handleDateChange(newDate) {
    setDate(newDate);
  }

  function toggleShowTimer() {
    setShowTimer(currentShowTimer => !currentShowTimer);
  }

  return (
    <>
      <Header size="large">react Hello</Header>
      {/* <Header>react Hello</Header> */}
      <Main>
        <OnlineOffline isOnline={isOnline}></OnlineOffline>
        {showTimer && (
          <div className="text-right mt-4">
            <Timer></Timer>
          </div>
        )}

        <CheckboxInput
          id={getNewId()}
          labelDescription="Mostrar timer"
          inputValue={showTimer}
          onCheckboxChange={toggleShowTimer}
        ></CheckboxInput>

        <TextInput
          id={getNewId()}
          labelDescription="Digite o seu nome"
          inputValue={name}
          onInputChange={handleNameChange}
          autoFocus
        ></TextInput>

        <DateInput
          id={getNewId()}
          labelDescription="Preencha a sua data de nascimento"
          inputValue={date}
          onInputChange={handleDateChange}
        ></DateInput>

        <p>
          O seu nome é {name}, com {name.length} e você possui{' '}
          {getAgeFrom(date)} anos
        </p>
      </Main>
    </>
  );
}

/* <Teste
  number={10}
  string="Teste"
  visible
  data={{ a: 1, b: 2 }}
  onClick={() => console.log('click')}
></Teste> */
