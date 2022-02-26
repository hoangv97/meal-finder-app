export default function Button({ title, onClick }) {
  
  return (
    <button
      type="button"
      className="mt-2 mr-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      {title}
    </button>
  )
}