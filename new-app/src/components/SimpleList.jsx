import { useEffect, useState } from "react";

function SimpleList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);

                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error("Failed to fetch Users");
                }
                const data = await response.json();
                setUsers(data);
                setError(null);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchUser();

        // CLEANUP
    }, []);

    if (loading) {
        return (
            <div>
                <h2>Simple List</h2>
                <p>Loading Users....</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <h2>Simple List</h2>
                <p>Error : {error}</p>
            </div>
        );
    }
    return (
        <div>
            <h2>Simple List</h2>
            <p>
                This Component Fetches all users at once when its first loads
            </p>
            <div>
                <table border={1}>
                    {users.map((user) => (
                        <tr>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                <p>{user.email}</p>
                            </td>
                            <td>
                                <p>{user.company.name}</p>
                            </td>
                        </tr>

                    ))}
                </table>
            </div>
            <p>Total Users : {users.length}</p>
        </div >
    );
}
export default SimpleList