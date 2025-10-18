import baseApi from './baseApi';
import type { Employee } from '../dto/Employee.ts';

const employeeApi = {
    getEmployees: () => baseApi.get<Employee[]>('/employees'),
    addEmployee: (employeeData: Omit<Employee, 'id' | 'code'>) =>
        baseApi.post<Employee>('/employees', employeeData),
    updateEmployee: (id: string | number, employeeData: Employee) =>
        baseApi.put<Employee>(`/employees/${id}`, employeeData),
    deleteEmployee: (id: string | number) =>
        baseApi.delete<void>(`/employees/${id}`),
};

export default employeeApi;