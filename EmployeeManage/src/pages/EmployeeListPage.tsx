import SearchEngine from "../components/search/SearchEngine.tsx";
import FilterByTitle from "../components/filter/FilterByTitle.tsx";
import EmployeeList from "../components/employee-list/EmployeeList.tsx";
import {observer} from "mobx-react-lite";
import {employeeStore} from "../stores/EmployeeStore.ts";
import {useNavigate, useParams} from "react-router-dom";
import type {Employee} from "../dto/Employee.ts";
import EditEmployee from "./EditEmployee.tsx";

const EmployeeListPage = observer(() => {

    const params = useParams();
    const editingId = params.id;
    const editingEmployee = employeeStore.employees.find(e => String(e.id) === editingId);

    const navigate = useNavigate();

    const handleEdit = (employee: Employee) => {
        navigate(`/list/edit/${employee.id}`);
    };

    const page = employeeStore.page;
    const limit = employeeStore.limit;

    const employees = employeeStore.filteredEmployees;
    const total = employees.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedEmployees = employees.slice((page - 1) * limit, page * limit);

    const handlePageChange = (newPage: number) => {
        employeeStore.setPage(newPage);
    };

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

              <div className="flex-1 p-5 bg-gray-100 rounded-t-2xl overflow-hidden">
                  {editingEmployee ? (
                      <EditEmployee editingEmployee={editingEmployee} />
                  ) : (
                      <div className={"flex flex-col"}>
                          <EmployeeList
                              employees={paginatedEmployees}
                              onChange={employeeStore.updateEmployee}
                              onDelete={employeeStore.deleteEmployee}
                              onEdit={handleEdit}
                          />

                          <div className="flex justify-center mt-8 gap-4">
                              <button
                                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                  disabled={page <= 1}
                                  onClick={() => handlePageChange(page - 1)}
                              >
                                  Trang trước
                              </button>
                              <span className="px-2 py-1">{page} / {totalPages}</span>
                              <button
                                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                  disabled={page >= totalPages}
                                  onClick={() => handlePageChange(page + 1)}
                              >
                                  Trang sau
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </>
    );
})

export default EmployeeListPage;