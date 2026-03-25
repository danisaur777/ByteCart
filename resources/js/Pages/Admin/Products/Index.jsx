import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function ProductsIndex({ products }) {
    const { auth } = usePage().props;

    return (
        <AdminLayout user={auth.user} header="Products Management">
            <Head title="Products" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">All Products</h3>
                    <Link href={route('admin.products.create')} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
                        + Add Product
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Image</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Stock</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-4 text-center text-gray-400 italic" colSpan="6">
                                        No products listed yet.
                                    </td>
                                </tr>
                            ) : (
                                products.data.map(product => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="h-10 w-10 object-cover rounded" />
                                            ) : (
                                                <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{product.category?.name || 'Uncategorized'}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">${product.price}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right space-x-2">
                                            <Link href={route('admin.products.edit', product.id)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                                            <Link href={route('admin.products.destroy', product.id)} method="delete" as="button" className="text-red-500 hover:text-red-700 font-medium ml-2">Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="mt-4 flex justify-end">
                    {/* Add actual inertia pagination links later ideally */}
                </div>
            </div>
        </AdminLayout>
    );
}
