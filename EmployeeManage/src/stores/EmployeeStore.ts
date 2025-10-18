import {createEmployee, type Employee} from "../dto/Employee.ts";
import {makeAutoObservable, runInAction} from "mobx";
import employeeApi from "../services/employeeApi.ts";
import searchService from "../components/search/utils.ts";
import {message} from "antd";

class EmployeeStore {
    employees: Employee[] = [];
    filter: string = "Tất cả";
    isLoading: boolean = false;

    searchTerm: string = "";

    page: number = 1;
    limit: number = 6;

    constructor() {
        makeAutoObservable(this);
    }

    fetchEmployees = async () => {
        try {
            this.isLoading = true;
            const employees = await employeeApi.getEmployees();
            runInAction(() => {
                this.employees = employees;
                searchService.init(employees);
                this.isLoading = false;
            })
        } catch (error) {
            console.error("failed on fetch: ", error);
            this.isLoading = false;
        }
    }

    addEmployee = async (employeeData?: Omit<Employee, 'id' | 'code'>) => {
        try {
            const dataToAdd = employeeData || createEmployee({});
            const newEmployee = await employeeApi.addEmployee(dataToAdd);
            runInAction(() => {
                this.employees.push(newEmployee);
                searchService.init(this.employees);
                message.success("Đã thêm nhân viên " + newEmployee.name?newEmployee.name:"rỗng" + " !");
            })
        } catch (error) {
            console.error("failed on add employee: ", error);
        }
    }

    updateEmployee = async (updatedEmployee: Employee) => {
        try {
            await employeeApi.updateEmployee(updatedEmployee.id, updatedEmployee);
            runInAction(() => {
                this.employees = this.employees.map((employee: Employee) => {
                    if (employee.id === updatedEmployee.id) {
                        return updatedEmployee;
                    }
                    return employee;
                });
                searchService.init(this.employees);
                console.log("updatedEmployee", updatedEmployee);
            });
        } catch (error) {
            console.error("failed on update: ", error);
        }
    }

    deleteEmployee = async (employee: Employee) => {
        try {
            await employeeApi.deleteEmployee(employee.id);
            runInAction(() => {
                console.log("deleteEmployee: ", employee);
                const index = this.employees.indexOf(employee);
                searchService.deleteEmployee(employee);
                this.employees.splice(index, 1);
            });
        } catch (error) {
            console.error("failed on delete: ", error);
        }
    }

    resetPage = () => {
        this.page = 1;
    }

    setPage = (page: number) => {
        this.page = page;
    }

    setLimit = (limit: number) => {
        this.limit = limit;
    }

    setEmployee = (employees: Employee[]) => {
        this.employees = employees;
    }

    setFilter = (title: string) => {
        this.filter = title;
        this.resetPage();
    }

    setSearchTerm = (term: string)=> {
        this.searchTerm = term;
        this.resetPage();
    }

    get filteredEmployees(): Employee[] {
        const sourceList = this.searchTerm !== ""
            ? searchService.findName(this.searchTerm)
            : this.employees;

        if (this.filter === 'Tất cả' || !this.filter) {
            return sourceList;
        }

        // this.resetPage();
        return sourceList.filter(emp => emp.title === this.filter);
    }

    get employeeCount() {
        return this.employees.length;
    }

    get uniqueTitle() {
        return [...new Set(this.employees.map(emp => emp.title))]
    }
}

export const employeeStore = new EmployeeStore();