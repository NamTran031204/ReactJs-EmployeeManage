import {memo} from 'react';
import {employeeStore} from "../../stores/EmployeeStore.ts";

const QuickAdding = memo(()=> {

    return (
        <>
            <button onClick={() => employeeStore.addEmployee()} className={"bg-blue-200 rounded-xl p-1 hover:shadow-xl hover:bg-blue-400 align-middle"}>
                Add new employee
            </button>
        </>
    );
});

export default QuickAdding;