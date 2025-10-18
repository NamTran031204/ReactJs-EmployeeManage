import type {Employee} from "../dto/Employee.ts";

interface DeleteAllProps {
    // employees: EmployeeCard[];
    setEmployees: (newEmployees: Employee[]) => void;
}

function DeleteAll({setEmployees}: DeleteAllProps) {

    return (
        <>
            <button onClick={() => setEmployees([])}>
                Delete All
            </button>
        </>
    );
}

export default DeleteAll;