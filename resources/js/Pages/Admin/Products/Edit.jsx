import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';

export default function ProductsEdit({ product, categories }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        category_id: product.category_id,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        image: null,
        _method: 'PUT' // Inertia handles PUT with file uploads this way
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout user={auth.user} header={`Edit Product: ${product.name}`}>
            <Head title={`Edit ${product.name}`} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <form onSubmit={submit} className="space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input 
                                type="number" step="0.01" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                value={data.price} 
                                onChange={e => setData('price', e.target.value)} 
                            />
                            {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input 
                                type="number" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                value={data.stock} 
                                onChange={e => setData('stock', e.target.value)} 
                            />
                            {errors.stock && <div className="text-red-500 text-xs mt-1">{errors.stock}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white" 
                            value={data.category_id} 
                            onChange={e => setData('category_id', e.target.value)}
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500 text-xs mt-1">{errors.category_id}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea 
                            rows={4} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            value={data.description} 
                            onChange={e => setData('description', e.target.value)} 
                        />
                        {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Replace Product Image (Leave blank to keep existing)</label>
                        {product.image_url && (
                             <div className="mb-2">
                                <img src={product.image_url} alt="Current" className="h-16 w-16 object-cover rounded" />
                             </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                            onChange={e => setData('image', e.target.files[0])} 
                        />
                        {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                    </div>

                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Save Changes
                        </button>
                        <Link href={route('admin.products.index')} className="text-gray-600 hover:text-gray-900 font-medium">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
