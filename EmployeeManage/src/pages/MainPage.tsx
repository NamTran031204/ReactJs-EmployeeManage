import {employeeStore} from "../stores/EmployeeStore.ts";
import {observer} from "mobx-react-lite";
import GroupByTitle from "../components/group-title/GroupByTitle.tsx";

const MainPage = observer(() => {
    return (
        <>
            <div className="space-y-8">
                <div className="p-8 bg-white rounded-lg shadow" style={{height: "15vh"}}>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome to khu tự trị Nam Chần
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Hệ thống quản lý nhân viên.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{height:'55vh'}}>
                    <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center h-full">
                        <h2 className="text-lg font-semibold text-gray-500">Tổng số nhân viên</h2>
                        <p className="text-5xl font-bold text-blue-600 mt-2">
                            {employeeStore.employeeCount}
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow overflow-auto h-full">
                        <GroupByTitle employees={employeeStore.employees}/>
                    </div>
                </div>
            </div>
            <footer className="mt-9 bg-amber-50" style={{height: '10vh'}}>
                <div className={"flex flex-wrap justify-center p-5 text-xl font-bold text-blue-900"}>
                    Some coffee? Find me on
                </div>
                <a href={"github.com"} className={"flex flex-wrap justify-center font-bold text-blue-500"}>Github</a>
            </footer>
        </>
    );
});

export default MainPage;