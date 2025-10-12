import * as React from 'react';
import { useState } from 'react';
import type { EmployeeCard } from '../../dto/EmployeeCard.ts';

interface AddEmployeeFormProps {
    onAddEmployee: (newEmployeeData: Omit<EmployeeCard, 'id' | 'code'>) => void;
}

interface FormErrors {
    name?: string;
    email?: string;
}

const AddEmployeeForm = ({ onAddEmployee }: AddEmployeeFormProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('Frontend Dev');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Họ tên không được để trống.';
        }
        if (!email.includes('@')) {
            newErrors.email = 'Email phải chứa ký tự @.';
        }
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onAddEmployee({ name, email, title, phone });

        setName('');
        setEmail('');
        setPhone('');
        setTitle('Frontend Dev');
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 my-4 border rounded-lg bg-white shadow-md w-full max-w-lg mx-auto text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Thêm nhân viên mới</h3>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full p-2 border rounded-md 'border-gray-300'}`}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Phòng ban</label>
                <select
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="Frontend Dev">Frontend Dev</option>
                    <option value="Backend Dev">Backend Dev</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Manager">Manager</option>
                    <option value="Intern">Intern</option>
                </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Thêm nhân viên
            </button>
        </form>
    );
};

export default AddEmployeeForm;