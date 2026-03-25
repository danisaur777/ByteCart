import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';

export default function CategoriesEdit({ category }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: category.name,
        description: category.description || '',
        image: null,
        _method: 'PUT' // Inertia handles PUT files requests using POST + _method
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.update', category.id));
    };

    return (
        <AdminLayout user={auth.user} header={`Edit Category: ${category.name}`}>
            <Head title={`Edit ${category.name}`} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl">
                <form onSubmit={submit} className="space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input 
                            type="text" 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
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
                        <label className="block text-sm font-medium text-gray-700">Replace Cover Image (Leave blank to keep existing)</label>
                        {category.image && (
                            <div className="mb-2 mt-1">
                                <img src={category.image} alt={category.name} className="h-16 w-16 object-cover rounded shadow" />
                            </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*"
                            className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
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
                        <Link href={route('admin.categories.index')} className="text-gray-600 hover:text-gray-900 font-medium">Cancel</Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
