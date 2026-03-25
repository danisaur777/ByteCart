import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';

export default function ReviewsIndex() {
    const { auth } = usePage().props;

    return (
        <AdminLayout user={auth.user} header="Reviews Management">
            <Head title="Reviews" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Customer Reviews</h3>
                {/* Placeholder Table */}
                <p className="text-gray-500 italic text-center py-4">No reviews submitted yet.</p>
            </div>
        </AdminLayout>
    );
}
