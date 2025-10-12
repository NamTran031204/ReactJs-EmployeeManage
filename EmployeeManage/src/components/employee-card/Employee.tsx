import type {EmployeeCard} from "../../dto/EmployeeCard.ts";
import * as React from "react";
import {memo, useCallback} from "react";

interface Props {
    employee: EmployeeCard;
    onChange: (e: EmployeeCard) => void;
}

const Employee = memo(({employee, onChange}: Props) => {

    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [editedEmployee, setEditedEmployee] = React.useState<EmployeeCard>(employee);

    const bgColor = employee.title == "Manager"? "bg-yellow-100" : "bg-white";

    const handleViewDetails = useCallback( () => {
        console.log("Chi tiết nhân viên:", employee);
    }, [employee]);

    const handleCancel = () => {
        setIsEditing(false);
        setEditedEmployee(employee);
    }

    const handleSave = () => {
        setIsEditing(false);
        onChange(editedEmployee);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setEditedEmployee(prev => ({...prev, [name]: value}));
    };

    if (isEditing) {
        return (
            <div className={`${bgColor} p-5 shadow-lg border border-blue-500 flex flex-col gap-2`}>
                <input name="name" value={editedEmployee.name} onChange={handleInputChange} className="text-xl font-bold p-1 rounded" />
                <input name="title" value={editedEmployee.title} onChange={handleInputChange} className="text-gray-500 uppercase p-1 rounded" />
                <hr className="my-2"/>
                <input name="email" value={editedEmployee.email} onChange={handleInputChange} className="p-1 rounded" placeholder="Email" />
                <input name="phone" value={editedEmployee.phone} onChange={handleInputChange} className="p-1 rounded" placeholder="SĐT" />
                <div className="mt-4 flex gap-2">
                    <button onClick={handleSave} className="w-full text-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Lưu</button>
                    <button onClick={handleCancel} className="w-full text-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Hủy</button>
                </div>
            </div>
        );
    }

    return (
        <div key={employee.id} className={`${bgColor} p-5 shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-500`}>
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
                <button
                    onClick={handleViewDetails}
                    className="w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                    Xem chi tiết
                </button>

                <button
                    onClick={() => setIsEditing(true)}
                    className="w-full text-center px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                    Sửa
                </button>
            </div>
        </div>
    );
})

export default Employee;