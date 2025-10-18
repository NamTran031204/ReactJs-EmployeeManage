import type {Employee} from "../../dto/Employee.ts";
import {observer} from "mobx-react-lite";

const EmployeeTable = observer(({employees}: {employees:Employee[]}) => {
    return (
    <>
        <div className={"text-blue-900 w-full align-middle uppercase font-bold text-xl text-center"}>
            <h3>Bảng nhân viên</h3>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-400 dark:text-black">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Mã nhân viên
                </th>
                <th scope="col" className="px-6 py-3">
                    Họ tên
                </th>
                <th scope="col" className="px-6 py-3">
                    Chức vụ
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    SĐT
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {
                employees.map ((employee: Employee) => {
                    return (
                        <tr key={employee.id} className="odd:bg-white odd:dark:bg-white
                                even:bg-gray-50 even:dark:bg-blue-50 border-b dark:border-gray-700 border-gray-200 text-black">
                            <th scope="row" className="px-6 py-4 font-medium text-shadow-black whitespace-nowrap dark:text-black">
                                {employee.code}
                            </th>
                            <td className="px-6 py-4">
                                {employee.name}
                            </td>
                            <td className="px-6 py-4">
                                {employee.title}
                            </td>
                            <td className="px-6 py-4">
                                {employee.email}
                            </td>
                            <td className="px-6 py-4">
                                {employee.phone}
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </>

    );
});

export default EmployeeTable;