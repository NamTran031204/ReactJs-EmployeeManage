import {memo, useCallback} from 'react';
import {createEmployeeCard, type EmployeeCard} from "../../dto/EmployeeCard.ts";
import searchService from "../search/utils.ts";

interface QuíckAddingProps {
    employeeList: EmployeeCard[];
    setEmployeeList: (value: EmployeeCard[]) => void;
}

const QuickAdding = memo(({employeeList, setEmployeeList}: QuíckAddingProps)=> {

    const handleAddEmployee = useCallback(() => {
        const newEmployee: EmployeeCard = createEmployeeCard({});
        setEmployeeList([...employeeList, newEmployee]);

        searchService.addEmployeeToTree(newEmployee);
    }, [employeeList]);

    return (
        <>
            <button onClick={handleAddEmployee} className={"bg-gray-100 border-2 p-2 hover:shadow-xl hover:bg-amber-100"}>
                Add new employee
            </button>
        </>
    );
});

export default QuickAdding;