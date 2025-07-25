export function Button({ children, onClick, className = '', variant = 'default', size = 'base' }) {
  const styles = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-blue-600 text-blue-600',
    ghost: 'text-gray-600',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
