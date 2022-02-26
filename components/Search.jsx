import { useDebouncedCallback } from 'use-debounce';

export default function Search({ title, input, setInput }) {
  const debounced = useDebouncedCallback((value) => {
      setInput(value);
    },
    // delay in ms
    400
  );
  
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        { title }
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="name"
          id="name"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder=""
          defaultValue={input}
          onChange={e => debounced(e.target.value)}
        />
      </div>
    </div>
  )
}
