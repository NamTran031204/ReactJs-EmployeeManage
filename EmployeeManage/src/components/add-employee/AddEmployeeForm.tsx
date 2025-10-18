import type { Employee } from '../../dto/Employee.ts';

import {type FormProps} from 'antd';
import { Button, Form, Input, Select } from 'antd';
import QuickAdding from "./QuickAdding.tsx";

const {Option} = Select;

interface AddEmployeeFormProps {
    onAddEmployee: (newEmployeeData: Omit<Employee, 'id' | 'code'>) => void;
}

type FieldType = {
    name: string;
    email: string;
    title: string;
    phone: string;
};

const AddEmployeeForm = ({ onAddEmployee }: AddEmployeeFormProps) => {

    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const dataToSend = {
            ...values,
            phone: values.phone || '',
        };

        onAddEmployee(dataToSend);
        // message.success("Đã thêm nhân viên " + dataToSend.name + " !");
        form.resetFields();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{title: "Front-end Dev", phone: ""}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true , type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Title"
                name="title"
                rules={[{required: true}]}
            >
                <Select>
                    <Option value="Front-end Dev">Front-end Dev</Option>
                    <Option value="Backend Dev">Backend Dev</Option>
                    <Option value="UI/UX Designer">UI/UX Designer</Option>
                    <Option value="Manager">Manager</Option>
                    <Option value="Intern">Intern</Option>
                </Select>

            </Form.Item>

            <Form.Item<FieldType>
                label="Phone"
                name="phone"
                rules={[]}
            >
                <Input />
            </Form.Item>

            <Form.Item label={null} style={{ gap: "2rem" }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <QuickAdding/>
        </Form>
    );
};

export default AddEmployeeForm;