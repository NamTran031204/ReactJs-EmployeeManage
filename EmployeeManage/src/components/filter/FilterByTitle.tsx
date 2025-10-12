import {memo} from "react";

interface FilterByTitleProps {
    filtered: string;
    setFiltered: (value: string) => void;
    uniqueTitles: string[];
}

const FilterByTitle = memo(({ filtered, setFiltered, uniqueTitles }: FilterByTitleProps)=>  {
    return (
        <div className="m-6 max-w-md ">
            <label htmlFor="title-filter" className="block mb-2 text-sm font-medium text-gray-900">Lọc theo chức vụ</label>
            <select
                id="title-filter"
                value={filtered}
                onChange={(e) => setFiltered(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="">Tất cả</option>
                {uniqueTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                ))}
            </select>
        </div>
    );
});

export default FilterByTitle;