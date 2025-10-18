import {observer} from "mobx-react-lite";
import {message} from "antd";
import type {Employee} from "../dto/Employee.ts";
import {employeeStore} from "../stores/EmployeeStore.ts";
import * as React from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    editingEmployee: Employee;
}

const EditEmployee = observer(({editingEmployee} : Props) => {

    const navigate = useNavigate();
    const [formState, setFormState] = React.useState<Employee>({...editingEmployee});

    React.useEffect(() => {
        setFormState({...editingEmployee});
    }, [editingEmployee]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormState(prev => ({...prev, [name]: value}));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await employeeStore.updateEmployee(formState);
        message.success("Đã cập nhật thông tin nhân viên!");
        navigate('/list');
    };

    const handleCancel = () => {
        navigate('/list');
    };

    return (
        <form onSubmit={handleSave} className="max-w-lg mx-auto bg-white p-8 rounded shadow space-y-4">
            <h2 className="text-2xl font-bold mb-4">Chỉnh sửa thông tin nhân viên</h2>
            <div>
                <label className="block mb-1 font-medium">Họ tên</label>
                <input
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Chức vụ</label>
                <input
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">SĐT</label>
                <input
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                />
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Lưu
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                    Hủy
                </button>
            </div>
        </form>
    );
})

export default EditEmployee