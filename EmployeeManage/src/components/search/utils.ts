import type {Employee} from "../../dto/Employee.ts";
import EMPLOYEES from "../../assets/EMPLOYEE_DATA_BASE.json";

export type SearchTree = Map<string, Employee[]>

export interface RadixTreeNode {
    children: Map<string, RadixTreeNode>;
    employees: Employee[];
}

function createNode(): RadixTreeNode {
    return {
        children: new Map(),
        employees: []
    }
}

export class Utils {

    public searchTree: RadixTreeNode = createNode();
    employees: Employee[] = EMPLOYEES;

    private normalizeText(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD') // Tách dấu
            .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
            .replace(/đ/g, 'd') // Thay đ -> d
            .replace(/[^a-z0-9\s]/g, '') // Chỉ giữ chữ, số, khoảng trắng
            .trim();
    }

    init (employees: Employee[]) {
        this.employees = employees;
        const tree: RadixTreeNode = createNode();
        const employeeList: Employee[] = employees;
        tree.employees = [...employeeList];

        for (const employee of employeeList) {
            const ten = this.normalizeText(employee.name);
            const cacTu = ten.split(/\s+/).filter(tu => tu.length > 0);

            for (const tu of cacTu) {
                let currentNode = tree;

                for (const chuCai of tu) {
                    if (!currentNode.children.has(chuCai)) {
                        currentNode.children.set(chuCai, createNode());
                    }

                    currentNode = currentNode.children.get(chuCai)!;
                    if (!currentNode.employees.includes(employee)) {
                        currentNode.employees.push(employee);
                    }
                }
            }
        }

        this.searchTree = tree;
        console.log("init thành công");
    }

    addEmployeeToTree (employee: Employee){
        const name = employee.name;
        if (!name || name.trim() === '') return;
        const normalizedName = (this.normalizeText(name)).split(/\s+/).filter(tu => tu.length > 0);

        let tree = this.searchTree;
        tree.employees.push(employee);

        for (const tu of normalizedName) {
            tree = this.searchTree;
            for (const char of tu) {
                if (tree.children.has(char)){
                    tree = tree.children.get(char)!;
                    tree.employees.push(employee);
                }else {
                    tree.children.set(char, createNode());
                    tree = tree.children.get(char)!;
                    tree.employees.push(employee);
                }
            }
        }
    }


    findName (name: string): Employee[] {
        if (!name || name.trim() === '') return this.employees;
        let res: Employee[] = [];

        const normalizedName = (this.normalizeText(name)).split(/\s+/).filter(tu => tu.length > 0);

        for (const tu of normalizedName) {
            let tree = this.searchTree;
            for (const char of tu) {
                if (!tree.children.has(char)){
                    return [];
                }

                tree = tree.children.get(char)!;

                const employees: Employee[] = tree.employees;

                res = res.length === 0 ? employees : res.filter(e => employees.includes(e));
            }
        }

        return res;

    }

    updateEmployee (oldEmployee: Employee, newEmployee: Employee){
        this.deleteEmployee(oldEmployee);
        this.addEmployeeToTree(newEmployee);
    }

    deleteEmployee (employee: Employee){
        const name = employee.name;
        const tree = this.searchTree;
        for (const tu of name) {
            let currentNode = tree;
            for (const char of tu) {
                if (currentNode.children.has(char)){
                    const deleteId = currentNode.employees.indexOf(employee);
                    currentNode.employees.splice(deleteId, 1);
                    currentNode = currentNode.children.get(char)!;
                }
            }
        }
        this.searchTree = tree;
    }


}

const searchService = new Utils();
export default searchService;