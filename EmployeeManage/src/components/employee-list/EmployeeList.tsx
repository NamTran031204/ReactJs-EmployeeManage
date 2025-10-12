import type {EmployeeCard} from "../../dto/EmployeeCard.ts";
import Employee from "../employee-card/Employee.tsx";
import {memo} from "react";

interface EmployeeListProps {
    employees: EmployeeCard[];
    onChange: (e: EmployeeCard) => void;
}

const EmployeeList = memo(({employees, onChange}: EmployeeListProps) => {

    return (
        <>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-96 overflow-y-auto p-2"}>
                {
                    employees.length === 0
                        ?(
                            <div className="col-span-full flex items-center justify-center h-full">
                                <p className="text-gray-500 text-lg">Không có kết quả</p>
                            </div>
                        )
                    : employees.map((employee: EmployeeCard) => {
                        return (
                            <Employee key={employee.id} employee={employee} onChange={onChange}/>
                        )
                    })
                }
            </div>
        </>

    );
});

export default EmployeeList;