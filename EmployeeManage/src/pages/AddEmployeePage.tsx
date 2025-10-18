import AddEmployeeForm from "../components/add-employee/AddEmployeeForm.tsx";
import {observer} from "mobx-react-lite";
import {employeeStore} from "../stores/EmployeeStore.ts";

const AddEmployeePage = observer(() => {

    return (
        <>
            <AddEmployeeForm onAddEmployee={employeeStore.addEmployee}/>
        </>
    );
});

export default AddEmployeePage;