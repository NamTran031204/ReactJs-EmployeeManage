import type {Employee} from "../../dto/Employee.ts";
import * as React from "react";
import {useCallback, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Modal} from "antd";

interface Props {
    employee: Employee;
    onChange: (e: Employee) => void;
    onDelete: (e: Employee) => void;
    onEdit: (e: Employee) => void;
}

const EmployeeCard = observer(({employee, onChange, onDelete, onEdit}: Props) => {

    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [editedEmployee, setEditedEmployee] = React.useState<Employee>(employee);

    useEffect(() => {
        setEditedEmployee(employee);
    }, [employee]);

    const bgColor = employee.title == "Manager"? "bg-yellow-100" : "bg-white";

    const handleCancel = () => {
        setIsEditing(false);
        setEditedEmployee(employee);
    }

    const handleSave = () => {
        setIsEditing(false);
        onChange(editedEmployee);
        console.log(editedEmployee.name + " " + employee.name);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setEditedEmployee(prev => ({...prev, [name]: value}));
    };

    const handleDelete = useCallback(() => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa nhân viên "${employee.name}"?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                onDelete(employee);
            },
        });
    }, [employee, onDelete]);

    return (
        <div key={employee.id} className={`${bgColor} p-5 shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-500`}>
            <Modal
                open={isEditing}
                title="Chỉnh sửa thông tin nhân viên"
                onCancel={handleCancel}
                footer={[
                    <button
                        key="save"
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Lưu
                    </button>,
                    <button
                        key="cancel"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Hủy
                    </button>,
                ]}
            >
                <div className="flex flex-col gap-2">
                    <input
                        name="name"
                        value={editedEmployee.name}
                        onChange={handleInputChange}
                        className="text-xl font-bold p-1 rounded"
                    />
                    <input
                        name="title"
                        value={editedEmployee.title}
                        onChange={handleInputChange}
                        className="text-gray-500 uppercase p-1 rounded"
                    />
                    <hr className="my-2" />
                    <input
                        name="email"
                        value={editedEmployee.email}
                        onChange={handleInputChange}
                        className="p-1 rounded"
                        placeholder="Email"
                    />
                    <input
                        name="phone"
                        value={editedEmployee.phone}
                        onChange={handleInputChange}
                        className="p-1 rounded"
                        placeholder="SĐT"
                    />
                </div>
            </Modal>
            <div className={"flex justify-between items-start"}>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
                    <p className="text-gray-500 uppercase ">{employee.title}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        No.{employee.code}
                                    </span>
            </div>

            <hr className="my-4"/>
            <div className="space-y-2">
                <p className="text-gray-700">
                    <span className="font-medium">Email: </span>{employee.email}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">SĐT: </span>{employee.phone}
                </p>
            </div>

            <div className="mt-4 flex-row gap-1">
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => onEdit(employee)}
                        className="w-full text-center px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                        Sửa (use Router)
                    </button>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full text-center px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                        Sửa (use Modal)
                    </button>
                </div>


                <button
                    onClick={handleDelete}
                    className="w-full flex-1 text-center px-4 py-2 bg-red-300 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                >
                    Xóa
                </button>
            </div>
        </div>
    );
})

export default EmployeeCard;