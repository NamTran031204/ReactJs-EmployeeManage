import type {Employee} from "../../dto/Employee.ts";
import {memo, useMemo} from "react";

const GroupByTitle = memo(({employees}: {employees: Employee[]}) => {
    const groups = useMemo(() => {
        const counts = new Map<string, number>();
        employees.forEach(employee => {
            const currentCount = counts.get(employee.title) || 0;
            counts.set(employee.title, currentCount + 1);
        })
        return counts;
    },[employees])

    return (
        <>
            <div>
                <h3 className="font-bold text-lg mb-4 text-gray-700">Thống kê theo phòng ban</h3>
                <div className="space-y-3">
                    {Array.from(groups.entries()).map(([title, count]) => (
                        <div key={title} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                            <span className="text-gray-600 font-medium">{title}:</span>
                            <strong className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{count}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

export default GroupByTitle;