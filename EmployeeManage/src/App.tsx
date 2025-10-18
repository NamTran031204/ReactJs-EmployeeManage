
import './App.css'
import * as React from "react";

import {Link, Outlet, useLocation} from 'react-router-dom';
import {Spin} from 'antd';
import {employeeStore} from "./stores/EmployeeStore.ts";
import {observer} from "mobx-react-lite";



const App = observer(()=>  {

    const location = useLocation();

    React.useEffect(() => {
        employeeStore.fetchEmployees();
    }, []);

    const menuItems = [
        { key: '/', label: 'TRANG CHỦ' },
        { key: '/list', label: 'DANH SÁCH NHÂN VIÊN' },
        { key: '/table', label: 'BẢNG NHÂN VIÊN' },
        { key: '/add', label: 'THÊM NHÂN VIÊN' },
    ];

    return (
        <div className="flex h-screen w-full bg-gray-100">
            <aside className="w-1/5 bg-[#0092bd] text-white flex flex-col">
                <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-blue-400">
                    <img src="/logo.svg" alt="logo" className="h-8 w-8 mr-4" />
                </div>
                <nav className="flex-grow">
                    <ul>
                        {menuItems.map(item => (
                            <li key={item.key}>
                                <Link
                                    to={item.key}
                                    className={`block w-full h-20 px-4 py-3 transition-colors text-center justify-items-center
                                        ${location.pathname === item.key
                                        ? 'bg-[#0068c8]'
                                        : 'hover:bg-[#007fcb]'
                                    }`
                                    }
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <div className="w-4/5 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-[#4149b2] text-white flex items-center px-6 shadow-md z-10">
                    <h1 className="text-xl font-semibold text-shadow-amber-900">React Management</h1>
                </header>

                <main className="flex-1 p-6 bg-[#f3f4fc] overflow-y-auto">
                    {employeeStore.isLoading ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </div>
    );
});

export default App
