import Item from './Item';

export default function Country({
  children: country,
  onCountryClick = null,
  isVisited = false,
}) {
  const demographicDensity = country.population / country.area;
  const { flag, name, capital, region, population, area } = country;
  if (!country) {
    return <div>Impossível renderizar o país</div>;
  }

  function handleCountryClick() {
    if (onCountryClick) {
      onCountryClick(country.id);
    }
  }
  const isVisitedClassName = isVisited ? 'bg-green-100' : '';
  return (
    <div
      onClick={handleCountryClick}
      className={`border p-2 m-2 flex flex-row items-center space-x-2 cursor-pointer ${isVisitedClassName}`}
    >
      <img
        className="w-48"
        src="https://img.freepik.com/vetores-gratis/ilustracao-de-bandeira-brasil_53876-27017.jpg"
        alt={'Bandeira do ' + name}
      />
      <ul>
        <li>
          <Item label="Nome: ">{name}</Item>
        </li>
        <li>
          <Item label="Capital: ">{capital}</Item>
        </li>
        <li>
          <Item label="Região: ">{region}</Item>
        </li>
        <li>
          <Item label="População: ">{population}</Item>
        </li>
        <li>
          <Item label="Área: ">{area}</Item>
        </li>
        <li>
          <Item label="Densidade demográfica: ">{demographicDensity}</Item>
        </li>
      </ul>
      ;
    </div>
  );
}
