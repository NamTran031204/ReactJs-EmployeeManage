import type EmployeeCard from "../../dto/EmployeeCard.ts";
import {useMemo} from "react";


function GroupByTitle({employees}: {employees: EmployeeCard[]}) {
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
            <div className="p-4 border rounded-lg bg-gray-50 w-96">
                <h3 className="font-bold text-lg mb-2">Thống kê theo phòng ban/chức vụ</h3>
                {Array.from(groups.entries()).map(([title, count]) => (
                    <div key={title} className="flex justify-self-center">
                        <span>{title}:</span>
                        <strong>{count}</strong>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GroupByTitle;