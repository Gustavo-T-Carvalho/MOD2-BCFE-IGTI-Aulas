import { useState } from 'react';
import Header from '../Components/Header';
import Main from '../Components/Main';
import TextInput from '../Components/TextInput';
import Countries from '../Components/Countries';
import { allCountries } from '../Data/countries';
import Country from '../Components/Country';
export default function ReactCountriesPages() {
  const [countryFilter, setCountryFilter] = useState('bra');
  const [visitedCountries, setvisitedCountries] = useState([]);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
  }

  function toggleVisitedCountry(countryId) {
    let newVisitedCountries = [...visitedCountries];
    const isCountryVisited = newVisitedCountries.indexOf(countryId) !== -1;

    if (isCountryVisited) {
      newVisitedCountries = newVisitedCountries.filter(
        visitedCountyId => visitedCountyId !== countryId
      );
    } else {
      newVisitedCountries.push(countryId);
    }

    setvisitedCountries(newVisitedCountries);
  }
  const countryFIlterLowerCase = countryFilter.toLocaleLowerCase().trim();
  const filteredCountries =
    countryFIlterLowerCase.length >= 3
      ? allCountries.filter(({ nameLowerCase }) => {
          return nameLowerCase.includes(countryFIlterLowerCase);
        })
      : allCountries;

  return (
    <>
      <Header>React-countries</Header>

      <Main>
        <TextInput
          id="inputCountryFilter"
          labelDescription="Informe o nome do país(pelo menos 3 caracteres)"
          inputValue={countryFilter}
          autofocus
          onInputChange={handleCountryFilterChange}
        ></TextInput>

        <Countries>
          <h2 className="text-center font-semibold">
            '{filteredCountries.length} país(es)'
          </h2>
          <h3 className="text-center font-semibold text-sm">
            '{visitedCountries.length} país(es) visitados'
          </h3>
          {filteredCountries.map(country => {
            const isVisited = visitedCountries.indexOf(country.id) !== -1;
            return (
              <Country
                isVisited={isVisited}
                onCountryClick={toggleVisitedCountry}
                key={country.id}
              >
                {country}
              </Country>
            );
          })}
        </Countries>

        {/* <Countries
          visitedCountries={visitedCountries}
          onCountryClick={toggleVisitedCountry}
        >
          {filteredCountries}
        </Countries> */}
      </Main>
    </>
  );
}
