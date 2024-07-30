import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (location.trim()) {
            navigate(`/weather/${location}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-row gap-8 items-start  mb-2">
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-900 "
            >
                Search
            </button>
        </form>
    );
};

export default Search;
