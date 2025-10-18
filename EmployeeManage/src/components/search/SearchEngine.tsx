import * as React from "react";
import {observer} from "mobx-react-lite";

interface SearchEngineProps {
    onSearch: string;
    setOnSearch: (value: string) => void;
}

const SearchEngine = observer(({onSearch, setOnSearch}: SearchEngineProps)=> {

    const onSearchChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setOnSearch(e.target.value);
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <form className="max-w-md w-96" onSubmit={handleSearchSubmit}>
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search"
                           id="default-search"
                           value={onSearch}
                           onChange={onSearchChange}
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Tìm kiếm tên, chức vụ, email,..." required/>
                    <button type="submit"
                            className="text-gray-50 absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >Search
                    </button>
                </div>
            </form>
        </>
    );
});

export default SearchEngine;