import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';

export default function OrdersShow({ order }) {
    const { auth } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        status: order.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.orders.update', order.id));
    };

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
        <AdminLayout user={auth.user} header={`Order Details: #ORD-${order.id}`}>
            <Head title={`Order #ORD-${order.id}`} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Information & Status Update */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">Summary</h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Customer:</span>
                                <span className="font-medium text-gray-900">{order.user?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium text-gray-900">{new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment:</span>
                                <span className="font-medium uppercase text-gray-900">{order.payment_status}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t">
                                <span className="font-semibold text-gray-800">Total:</span>
                                <span className="font-bold text-lg text-blue-600">${order.total_amount}</span>
                            </div>
                        </div>

                        <form onSubmit={submit} className="mt-8 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Update Order Status</h4>
                            <div className="flex items-center space-x-3">
                                <select 
                                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white" 
                                    value={data.status} 
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    Save
                                </button>
                            </div>
                            {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                        </form>
                    </div>
                </div>

                {/* Order Items */}
                <div className="col-span-1 md:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Purchased Items</h3>
                            <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusStyle(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600">Qty</th>
                                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!order.items || order.items.length === 0 ? (
                                        <tr>
                                            <td className="px-4 py-4 text-center text-gray-400 italic" colSpan="4">No items attached.</td>
                                        </tr>
                                    ) : (
                                        order.items.map(item => (
                                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center space-x-3">
                                                        {item.product?.image_url ? (
                                                            <img src={item.product.image_url} alt={item.product.name} className="h-10 w-10 object-cover rounded shadow-sm" />
                                                        ) : (
                                                            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs shadow-sm">No Img</div>
                                                        )}
                                                        <span className="text-sm font-medium text-gray-900">{item.product?.name || 'Deleted Product'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">${item.price}</td>
                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.quantity}</td>
                                                <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                            <Link href={route('admin.orders.index')} className="text-blue-600 hover:text-blue-800 font-medium">
                                &larr; Back to Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
