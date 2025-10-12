
import './App.css'
import EmployeeList from "./components/employee-list/EmployeeList.tsx";
import {type EmployeeCard} from "./dto/EmployeeCard.ts";
import EmployeeTable from "./components/employee-table/EmployeeTable.tsx";
import * as React from "react";
import searchService from "./components/search/utils.ts";
import SearchEngine from "./components/search/SearchEngine.tsx";
import FilterByTitle from "./components/filter/FilterByTitle.tsx";
import {useCallback, useMemo} from "react";
import QuickAdding from "./components/add-employee/QuickAdding.tsx";
import DeleteAll from "./components/DeleteAll.tsx";
import GroupByTitle from "./components/group-title/GroupByTitle.tsx";
import AddEmployeeForm from "./components/add-employee/AddEmployeeForm.tsx";
import employeeApi from "./services/employeeApi.ts";


function App() {

    const [onSearch, setOnSearch] = React.useState<string>("");
    const [foundObject, setFoundObject] = React.useState<EmployeeCard[]>([]);
    const [hasSearched, setHasSearched] = React.useState<boolean>(false);
    const [filtered, setFiltered] = React.useState<string>("Tất cả");
    const [isVisible, setIsVisible] = React.useState(true);
    const [employeeList, setEmployeeList] = React.useState<EmployeeCard[]>([]);

    const STORAGE_KEY = "employeeList";

    React.useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employees = await employeeApi.getEmployees();
                setEmployeeList(employees);
            } catch (error) {
                console.error("failed: ", error);
            }
        };
        fetchEmployees();
    }, []);

    const handleAddEmployee = useCallback(async (newEmployeeData: Omit<EmployeeCard, 'id' | 'code'>) => {
        try {
            console.log(newEmployeeData);
            const newEmployeeFromApi = await employeeApi.addEmployee(newEmployeeData);
            setEmployeeList(prevList => [...prevList, newEmployeeFromApi]);
        } catch (error) {
            console.error("Failed adding: ", error);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employeeList));
    }, [employeeList]);

    React.useEffect(() => {
        searchService.init(employeeList);
        console.log("init");
    }, [employeeList]);

    const finalEmployeeList: EmployeeCard[] = useMemo(()=>{
        return (hasSearched ? foundObject : employeeList)
            .filter((employee: EmployeeCard) => {
                return filtered===''||filtered === "Tất cả"?true:employee.title == filtered})
    }, [hasSearched, foundObject, employeeList, filtered])

    const uniqueTitles = [...new Set(employeeList.map(emp => emp.title))];
    const countNumberOfEmployee: number = finalEmployeeList.length;

    const handleUpdateEmployee = (updatedEmployee: EmployeeCard) => {
        setEmployeeList(prevList =>
            prevList.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );
    };

  return (
      <>
          <div className={'p-5 min-h-auto'}>
              <h1 className={'text-3xl font-bold mb-6'}>
                  Danh sách nhân viên
              </h1>
          </div>

          <div>
              <p>Tổng số nhân viên: <strong>{countNumberOfEmployee}</strong></p>
              <QuickAdding employeeList={employeeList} setEmployeeList={setEmployeeList}/>
          </div>

          <div className={'flex flex-row justify-between gap-4 max-h-96 overflow-y-auto'}>
              <SearchEngine onSearch={onSearch} setOnSearch={setOnSearch} onResults={(results, searched) => {
                  setFoundObject(results);
                  setHasSearched(searched);
              }}/>

              <FilterByTitle filtered={filtered} setFiltered={setFiltered} uniqueTitles={uniqueTitles}/>
          </div>

          <div >
              <button onClick={() => setIsVisible(!isVisible)} className={"border bg-gray-100 hover:bg-amber-100"} >Ẩn danh sách</button>
          </div>

          {isVisible? (<div className={'flex flex-col gap-8 m-2'}>
              <div className={'p-8 bg-gray-100 min-h-48 border-b-blue-400 rounded-2xl'}>
                  <EmployeeList employees={finalEmployeeList} onChange={handleUpdateEmployee}/>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <EmployeeTable employees={finalEmployeeList}/>
              </div>
          </div>): <></>}

          <div>
              <DeleteAll setEmployees={setEmployeeList}/>
          </div>

          <div>
              <GroupByTitle employees={employeeList}/>
          </div>

          <AddEmployeeForm onAddEmployee={handleAddEmployee} />
      </>
  )
}

export default App
