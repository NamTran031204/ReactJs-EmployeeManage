import SearchEngine from "../components/search/SearchEngine.tsx";
import FilterByTitle from "../components/filter/FilterByTitle.tsx";
import EmployeeTable from "../components/employee-table/EmployeeTable.tsx";
import {observer} from "mobx-react-lite";
import {employeeStore} from "../stores/EmployeeStore.ts";

const EmployeeTablePage = observer(() => {


    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0 p-5 text-center">
                    <h1 className={'text-5xl font-bold mb-1'}>
                        Danh sách nhân viên
                    </h1>
                </div>

                <div className="flex-shrink-0 flex flex-row justify-between items-center gap-4 px-5">
                    <SearchEngine onSearch={employeeStore.searchTerm} setOnSearch={employeeStore.setSearchTerm} />
                    <FilterByTitle filtered={employeeStore.filter} setFiltered={employeeStore.setFilter} uniqueTitles={employeeStore.uniqueTitle}/>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <EmployeeTable employees={employeeStore.filteredEmployees}/>
                </div>
            </div>
        </>
    );
});

export default EmployeeTablePage;