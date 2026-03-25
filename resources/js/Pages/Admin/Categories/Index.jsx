import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function CategoriesIndex({ categories }) {
    const { auth } = usePage().props;

    return (
        <AdminLayout user={auth.user} header="Categories Management">
            <Head title="Categories" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900">All Categories</h3>
                    <Link href={route('admin.categories.create')} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
                        + Add Category
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Image</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Category Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Description</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Total Products</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.data.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-4 text-center text-gray-400 italic" colSpan="5">
                                        No categories created yet.
                                    </td>
                                </tr>
                            ) : (
                                categories.data.map(category => (
                                    <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {category.image ? (
                                                <img src={category.image} alt={category.name} className="h-10 w-10 object-cover rounded shadow-sm" />
                                            ) : (
                                                <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs shadow-sm">No Img</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{category.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">{category.description || '-'}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{category.products_count || 0}</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right space-x-2">
                                            <Link href={route('admin.categories.edit', category.id)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</Link>
                                            <Link href={route('admin.categories.destroy', category.id)} method="delete" as="button" className="text-red-500 hover:text-red-700 font-medium ml-2">Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-end">
                    {/* Add actual inertia pagination later */}
                </div>
            </div>
        </AdminLayout>
    );
}
