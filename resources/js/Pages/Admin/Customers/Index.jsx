import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function CustomersIndex({ customers }) {
    const { auth } = usePage().props;

    return (
        <AdminLayout user={auth.user} header="Customers Management">
            <Head title="Customers" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Registered Customers</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email Address</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Registered On</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Total Orders</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!customers || customers.data.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-4 text-center text-gray-400 italic" colSpan="6">
                                        No customers registered yet.
                                    </td>
                                </tr>
                            ) : (
                                customers.data.map(customer => (
                                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">#{customer.id}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{customer.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{customer.email}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(customer.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                {customer.orders_count || 0}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right space-x-2">
                                            <Link href={route('admin.customers.show', customer.id)} className="text-blue-600 hover:text-blue-800 font-medium">View Profile</Link>
                                            <Link href={route('admin.customers.destroy', customer.id)} method="delete" as="button" className="text-red-500 hover:text-red-700 font-medium ml-2">Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-end"></div>
            </div>
        </AdminLayout>
    );
}
