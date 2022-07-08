export default function CheckboxInput({
  labelDescription = 'Descrição da label',
  inputValue,
  autoFocus = false,
  id = 'id_do_input_checkbox',
  onCheckboxChange = null,
}) {
  function handleInputChange({ currentTarget }) {
    if (onCheckboxChange) {
      onCheckboxChange();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2 my-4">
      <input
        autoFocus={autoFocus}
        id={id}
        className="p-1 border"
        type="checkbox"
        value={inputValue}
        onChange={handleInputChange}
      />
      <label className="text-sm mb-1 " htmlFor={id}>
        {labelDescription}
      </label>
    </div>
  );
}
