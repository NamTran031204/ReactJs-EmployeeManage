import type {Employee} from "../../dto/Employee.ts";
import EmployeeCard from "./EmployeeCard.tsx";
import {observer} from "mobx-react-lite";

interface EmployeeListProps {
    employees: Employee[];
    onChange: (e: Employee) => void;
    onDelete: (e: Employee) => void;
    onEdit: (e: Employee) => void;
}

const CARD_HEIGHT = 220;

const EmployeeList = observer(({employees, onChange, onDelete, onEdit}: EmployeeListProps) => {

    const listHeight = 2 * CARD_HEIGHT + 16;

    return (
        <>
            <div
                className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-auto"}
                style={{ minHeight: listHeight, maxHeight: listHeight }}
            >
                {
                    employees.length === 0
                        ?(
                            <div className="col-span-full flex items-center justify-center h-full">
                                <p className="text-gray-500 text-lg">Không có kết quả</p>
                            </div>
                        )
                        : employees.map((employee: Employee) => {
                            return (
                                <EmployeeCard key={employee.id} employee={employee} onChange={onChange} onDelete={onDelete} onEdit={onEdit} />
                            )
                        })
                }
            </div>
        </>

    );
});

export default EmployeeList;