import {useState} from 'react';

interface SearchBarProps{
    onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {

    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); //send to parent 
    }
  
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <input
          type="search"
          placeholder="Search a keyword"
          className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 ..."
          value={query}               
          onChange={handleChange}     
        />
      </div>
    </div>
  );
}

export default SearchBar