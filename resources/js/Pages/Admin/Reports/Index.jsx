import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';

export default function ReportsIndex() {
    const { auth } = usePage().props;

    return (
        <AdminLayout user={auth.user} header="Reports & Analytics">
            <Head title="Reports" />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Business Insights</h3>
                <p className="text-gray-500 italic text-center py-4">Analytics dashboard generating data...</p>
            </div>
        </AdminLayout>
    );
}
