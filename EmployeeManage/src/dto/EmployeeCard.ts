import { v4 as uuidv4 } from 'uuid';

export interface EmployeeCard {
    id: number | string;
    code: string;
    name: string;
    title: string;
    email: string;
    phone: string;
}

export function createEmployeeCard(initial: Partial<EmployeeCard>): EmployeeCard {
    return {
        id: !initial.id? uuidv4(): initial.id,
        code: !initial.code?`EMP000`: initial.code,
        name: !initial.name?"Nhân Viên Mới": initial.name,
        title: !initial.title? "Chưa có chức vụ": initial.title,
        email: !initial.email? `new.employee@company.com`: initial.email,
        phone: !initial.phone?"Chưa có SĐT": initial.phone
    }
}

