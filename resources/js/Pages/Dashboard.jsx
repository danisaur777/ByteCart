import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
    PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';

export default function Dashboard({ metrics, charts }) {
    const { auth } = usePage().props;

    const stats = [
        { name: 'Total Sales', value: `$${metrics?.totalSales || '0.00'}`, change: 'All Time', type: 'positive' },
        { name: 'Total Orders', value: metrics?.totalOrders || 0, change: 'All Time', type: 'positive' },
        { name: 'Total Customers', value: metrics?.totalCustomers || 0, change: 'All Time', type: 'positive' },
        { name: 'Low Stock Alerts', value: metrics?.lowStockCount || 0, change: 'Needs Attention', type: 'negative' },
        { name: 'Revenue This Month', value: `$${metrics?.revenueThisMonth || '0.00'}`, change: 'This Month', type: 'positive' },
    ];

    // Colors for pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a28bfe'];

    return (
        <AdminLayout user={auth.user} header="Dashboard Overview">
            <Head title="Admin Dashboard" />

            {/* Widgets Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <span className="text-gray-500 text-sm font-medium">{stat.name}</span>
                        <div className="mt-4 flex items-baseline justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <span className={`text-sm font-semibold ${stat.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
                
                {/* Sales Per Month Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-96 flex flex-col">
                    <h3 className="text-md font-medium text-gray-800 mb-4">Sales Analytics (Last 6 Months)</h3>
                    <div className="flex-1 w-full relative">
                        {charts?.salesPerMonth && charts.salesPerMonth.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={charts.salesPerMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <Tooltip 
                                        formatter={(value) => [`$${value}`, "Sales"]}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 italic">No sales data recorded yet.</div>
                        )}
                    </div>
                </div>

                {/* Right Column Charts */}
                <div className="flex flex-col gap-6">
                    
                    {/* Orders by Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col min-h-[220px]">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Orders By Status</h3>
                        <div className="flex-1 w-full flex items-center justify-center">
                            {charts?.ordersByStatus && charts.ordersByStatus.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={charts.ordersByStatus}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="count"
                                            nameKey="status"
                                        >
                                            {charts.ordersByStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                        />
                                        <Legend 
                                            formatter={(value) => <span className="text-gray-600 font-medium capitalize">{value}</span>}
                                            iconType="circle"
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-gray-400 italic">No order status data available.</p>
                            )}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col min-h-[220px]">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Most Sold Products</h3>
                        <div className="flex-1 w-full">
                            {charts?.topProducts && charts.topProducts.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={charts.topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12, fill: '#4b5563'}} axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            cursor={{fill: '#f9fafb'}}
                                            formatter={(value) => [value, "Units Sold"]}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar dataKey="total_sold" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 italic">No products sold yet.</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
