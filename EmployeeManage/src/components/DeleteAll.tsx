import type {EmployeeCard} from "../dto/EmployeeCard.ts";

interface DeleteAllProps {
    // employees: EmployeeCard[];
    setEmployees: (newEmployees: EmployeeCard[]) => void;
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