import type {EmployeeCard} from "../dto/EmployeeCard.ts";

function EmployeeList({employees}: {employees: EmployeeCard[]}) {

    return (
        <>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-96 overflow-y-auto p-2"}>
                {
                    employees.length === 0
                        ?(
                            <div className="col-span-full flex items-center justify-center h-full">
                                <p className="text-gray-500 text-lg">Không có kết quả</p>
                            </div>
                        )
                    : employees.map((employee: EmployeeCard) => {
                        const bgColor = employee.title == "Manager"? "bg-yellow-100" : "bg-white";
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
                            </div>
                        )
                    })
                }
            </div>
        </>

    );
}

export default EmployeeList;