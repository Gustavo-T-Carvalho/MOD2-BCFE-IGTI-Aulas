import { getNewId } from '../services/idService';

export default function TextInput({
  labelDescription = 'Descrição da label',
  inputValue = 'valor padrão do input',
  autoFocus = false,
  id = getNewId,
  onInputChange = null,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm text-gray-600 mb-4" htmlFor={id}>
        {labelDescription}
      </label>
      <input
        autoFocus={autoFocus}
        id={id}
        className="p-2 border"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
