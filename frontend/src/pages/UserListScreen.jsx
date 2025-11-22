import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { listUsers } from '../features/userSlice';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">NAME</th>
                            <th className="py-2 px-4 border-b">EMAIL</th>
                            <th className="py-2 px-4 border-b">ADMIN</th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="py-2 px-4 border-b">{user._id}</td>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td className="py-2 px-4 border-b">
                                    {user.isAdmin ? (
                                        <FaCheck className="text-green-500 mx-auto" />
                                    ) : (
                                        <FaTimes className="text-red-500 mx-auto" />
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserListScreen;
