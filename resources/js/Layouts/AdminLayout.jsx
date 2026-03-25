import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
    HomeIcon, 
    CubeIcon, 
    FolderIcon, 
    ShoppingCartIcon, 
    UsersIcon, 
    StarIcon, 
    ChartBarIcon, 
    Cog6ToothIcon, 
    ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

export default function AdminLayout({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: HomeIcon },
        { name: 'Products', href: route('admin.products.index'), icon: CubeIcon },
        { name: 'Categories', href: route('admin.categories.index'), icon: FolderIcon },
        { name: 'Orders', href: route('admin.orders.index'), icon: ShoppingCartIcon },
        { name: 'Customers', href: route('admin.customers.index'), icon: UsersIcon },
        { name: 'Reviews', href: route('admin.reviews.index'), icon: StarIcon },
        { name: 'Reports', href: route('admin.reports.index'), icon: ChartBarIcon },
        { name: 'Settings', href: route('profile.edit'), icon: Cog6ToothIcon },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <div className={`flex flex-col bg-blue-50 text-blue-900 w-64 border-r border-blue-200 transition-width duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex items-center justify-center h-16 bg-blue-100 border-b border-blue-200">
                    <span className={`font-bold text-xl uppercase tracking-wider ${!sidebarOpen && 'hidden'}`}>ByteCart Admin</span>
                    <span className={`font-bold text-xl uppercase ${sidebarOpen && 'hidden'}`}>BC</span>
                </div>

                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-100 text-blue-800 border-l-4 border-transparent hover:border-blue-500 pr-6 ${route().current() === item.href ? 'bg-blue-100 border-blue-500 font-semibold' : ''}`}
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <span className={`ml-2 text-sm tracking-wide truncate ${!sidebarOpen && 'hidden'}`}>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Logout */}
                <div className="border-t border-blue-200 p-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        <span className={`${!sidebarOpen && 'hidden'} font-medium`}>Logout</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-blue-500 shadow-sm">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none focus:text-gray-700">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center">
                        <div className="relative border-l pl-4 border-gray-200">
                            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                        </div>
                    </div>
                </header>

                {/* Main */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {header && (
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">{header}</h1>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
