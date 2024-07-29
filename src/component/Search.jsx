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
        <form onSubmit={handleSearch} className="flex flex-col items-center mb-6">
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
