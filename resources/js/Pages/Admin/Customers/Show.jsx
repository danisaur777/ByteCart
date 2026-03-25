import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function CustomersShow({ customer }) {
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
        <AdminLayout user={auth.user} header={`Customer Profile: ${customer.name}`}>
            <Head title={`Customer - ${customer.name}`} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Profile Overview Card */}
                <div className="col-span-1 md:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                        <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold mb-4 shadow-sm">
                            {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{customer.email}</p>
                        
                        <div className="w-full mt-6 pt-6 border-t border-gray-100 text-left space-y-3">
                            <div>
                                <span className="block text-xs font-semibold text-gray-500 uppercase">Customer ID</span>
                                <span className="block text-sm font-medium text-gray-900">#{customer.id}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-500 uppercase">Joined On</span>
                                <span className="block text-sm font-medium text-gray-900">{new Date(customer.created_at).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-500 uppercase">Account Role</span>
                                <span className="inline-block mt-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium capitalize">{customer.role}</span>
                            </div>
                            {customer.firebase_uid && (
                                <div>
                                    <span className="block text-xs font-semibold text-gray-500 uppercase">Firebase Linked</span>
                                    <span className="block text-sm font-medium text-green-600">Yes</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="col-span-1 md:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">Recent Orders (Up to 5)</h3>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 rounded-l-lg">Order ID</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Amount</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 rounded-r-lg text-right">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!customer.orders || customer.orders.length === 0 ? (
                                        <tr>
                                            <td className="px-4 py-6 text-center text-gray-400 italic" colSpan="5">
                                                This customer hasn't placed any orders yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        customer.orders.map(order => (
                                            <tr key={order.id} className="border-b border-gray-50 last:border-0">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">#ORD-{order.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">${order.total_amount}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(order.status)}`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right">
                                                    <Link href={route('admin.orders.show', order.id)} className="text-blue-600 hover:text-blue-800 font-medium">Details</Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <Link href={route('admin.customers.index')} className="text-blue-600 hover:text-blue-800 font-medium">
                                &larr; Back to Customers
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
