import { getNewId } from '../services/idService';

export default function TextArea({
  labelDescription = 'Descrição da label',
  textAreaValue = 'valor padrão do input',
  id = getNewId(),
  onTextAreaChange = null,
  maxLength = 230,
  rows = 4,
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      console.log(newValue);
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm text-gray-600 mb-4" htmlFor={id}>
        {labelDescription}
      </label>
      <textarea
        id={id}
        maxLength={maxLength}
        rows={rows}
        className="p-2 border"
        value={textAreaValue}
        onChange={handleInputChange}
      />
      <div className="text-right mr-1">
        <span>
          {currentCharacterCount}/ {maxLength}
        </span>
      </div>
    </div>
  );
}
