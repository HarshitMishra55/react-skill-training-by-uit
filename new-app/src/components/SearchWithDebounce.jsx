import { useEffect, useState } from "react";

function SearchWithDebounce() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                if (!response.ok) {
                    throw new Error("Failed to fetch all Users");
                }

                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (!debouncedSearch.trim()) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter((users) => {
            const searchLower = debouncedSearch.toLocaleLowerCase();
            const nameMatch = users.name.toLocaleLowerCase().includes(searchLower);
            const emailMatch = users.email.toLocaleLowerCase().includes(searchLower);
            return nameMatch || emailMatch;
        });

        setFilteredUsers(filtered);
    }, [debouncedSearch, users]);

    const handleChangeSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setDebouncedSearch('');
    };

    if (loading) {
        return (
            <div>
                <p>Loading Users....</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>Error : {error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Realtime search character by character</h2>

            <input
                type="text"
                placeholder="Search by name and email"
                value={searchTerm}
                onChange={handleChangeSearch}
            ></input>

            {searchTerm && (
                <button
                    onClick={handleClearSearch}
                >X Clear</button>
            )}

            <div>
                {debouncedSearch ? (
                    <p>Searching for : "{debouncedSearch}"</p>
                ) : (
                    <p>Start Tying to search</p>
                )}
            </div>

            <p>
                Showing {filteredUsers.length} out of {users.length}
            </p>

            {filteredUsers.length > 0 ? (
                <div>
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="user-card">
                            <h3>{highlightText(user.name, debouncedSearch)}</h3>
                            <p>{highlightText(user.email, debouncedSearch)}</p>
                            <p>{user.company.name}</p>
                            <p>{user.website}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Users found matching "{debouncedSearch}". Try a different Search</p>
            )}
        </div>
    );
}

function highlightText(text, highlight) {
    if (!highlight.trim()) {
        return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, index) => {
                regex.test(part) ?
                    (
                        <strong key={index}>{part}</strong>
                    ) : (
                        <span key={index}>{part}</span>
                    )
            })}
        </span>
    );
}
export default SearchWithDebounce