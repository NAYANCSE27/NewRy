import React from 'react';

const SideBar = () => {
    return (
        <div className={`transition-all duration-3000 bg-primary h-screen flex flex-col overflow-hidden ${showSideBar ? 'w-48' : 'w-0'} `}>
            <div className="text-2xl font-bold mt-10 ml-10 text-gray-200">
                <h1>NewRy</h1>
            </div>
            <div className="flex flex-col mt-20">
                {
                    menuItems.map((item) => {
                        return (
                            <Link
                                to={`${item.path}`}
                                className={`pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm ${location.pathname.includes(item.path) && 'bg-[#145c2aaf] text-yellow-200 font-bold'}`}
                            >
                                {item.title}
                            </Link>
                        )
                    }
                }
            </div>
        </div>
    )
}

export default SideBar;