'use client';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout'; // Use specific Admin Layout
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaUserMd, FaUsers, FaNewspaper, FaClipboardList, FaTrash } from 'react-icons/fa';

import VitalsCard from '@/components/dashboard/VitalsCard'; // Reusing for stats cards

export default function AdminDashboard() {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.type !== 'admin') {
            router.push('/dashboard');
        } else if (user) {
            fetchData();
        }
    }, [user, router]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const statsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users?limit=50`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStats(statsRes.data);
            setUsers(usersRes.data.users);
        } catch (error) {
            console.error("Error fetching admin data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete user ${name}? This cannot be undone.`)) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData(); // Refresh
            } catch (error) {
                alert("Failed to delete user");
            }
        }
    };

    if (!user || user.type !== 'admin') return null;

    return (
        <ProtectedRoute>
            <AdminLayout>
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Manage users and view system statistics.</p>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading Admin Data...</div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            <VitalsCard title="Total Users" value={stats?.users || 0} unit="" icon={FaUsers} colorClass="text-blue-600 bg-blue-50" trend="stable" trendValue="" />
                            <VitalsCard title="Doctors" value={stats?.doctors || 0} unit="" icon={FaUserMd} colorClass="text-green-600 bg-green-50" trend="stable" trendValue="" />
                            <VitalsCard title="Appointments" value={stats?.appointments || 0} unit="" icon={FaClipboardList} colorClass="text-purple-600 bg-purple-50" trend="stable" trendValue="" />
                            <VitalsCard title="Articles" value={stats?.articles || 0} unit="" icon={FaNewspaper} colorClass="text-orange-600 bg-orange-50" trend="stable" trendValue="" />
                        </div>

                        {/* User Management Table */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">User Management</h3>
                                <span className="text-sm text-gray-500">Showing last 50 users</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Joined</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                                                <td className="px-6 py-4">{u.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.type === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                        u.type === 'doctor' ? 'bg-green-100 text-green-700' :
                                                            'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {u.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-right">
                                                    {u.type !== 'admin' && (
                                                        <button
                                                            onClick={() => handleDeleteUser(u._id, u.name)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </AdminLayout>
        </ProtectedRoute>
    );
}
