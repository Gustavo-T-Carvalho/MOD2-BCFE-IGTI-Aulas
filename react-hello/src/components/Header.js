export default function Header({ children, size }) {
  let fontSize = 'text-xl';
  if (size === 'large') {
    fontSize = 'text-2xl';
  }
  return (
    <div className="highlight bg-gray-200 mx-auto p-3">
      <h1 className={`text-center font-semibold ${fontSize}`}>{children}</h1>
    </div>
  );
}
