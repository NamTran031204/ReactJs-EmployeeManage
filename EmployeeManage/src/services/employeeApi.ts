import baseApi from './baseApi';
import type { EmployeeCard } from '../dto/EmployeeCard.ts';

const employeeApi = {
    getEmployees: () => baseApi.get<EmployeeCard[]>('/employees'),
    addEmployee: (employeeData: Omit<EmployeeCard, 'id' | 'code'>) =>
        baseApi.post<EmployeeCard>('/employees', employeeData),
    updateEmployee: (id: string | number, employeeData: EmployeeCard) =>
        baseApi.put<EmployeeCard>(`/employees/${id}`, employeeData),
    deleteEmployee: (id: string | number) =>
        baseApi.delete<void>(`/employees/${id}`),
};

export default employeeApi;