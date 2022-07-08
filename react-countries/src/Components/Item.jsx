export default function Item({ children: value = 'Valor', label = 'Campo' }) {
  return (
    <span className="text-sm">
      <strong>{label}</strong> {value}
    </span>
  );
}
