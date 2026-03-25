import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function OrdersIndex({ orders }) {
    const { auth } = usePage().props;

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout user={auth.user} header="Orders Management">
            <Head title="Orders" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Order ID</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Customer</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Total</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Payment</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!orders || orders.data.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-4 text-center text-gray-400 italic" colSpan="7">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.data.map(order => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">#ORD-{order.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{order.user?.name || 'Unknown User'}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">${order.total_amount}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {order.payment_status}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right">
                                            <Link href={route('admin.orders.show', order.id)} className="text-blue-600 hover:text-blue-800 font-medium">View Details</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="mt-4 flex justify-end"></div>
            </div>
        </AdminLayout>
    );
}
