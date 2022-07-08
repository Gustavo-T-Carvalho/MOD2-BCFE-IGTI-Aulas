export default function Header({ children }) {
  return (
    <div className="highlight bg-blue-200 mx-auto p-3">
      <h1 className={`text-center font-semibold`}>{children}</h1>
    </div>
  );
}
