export default function DateInput({
  labelDescription = 'Descrição da label',
  inputValue = '2021-04-13',
  autoFocus = false,
  id = 'id_do_input_date',
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
        type="date"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
