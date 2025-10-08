import type {EmployeeCard} from "../../dto/EmployeeCard.ts";
import {EMPLOYEE_DATA_BASE} from "../EMPLOYEE_DATA_BASE.ts"

export type SearchTree = Map<string, EmployeeCard[]>

export interface RadixTreeNode {
    children: Map<string, RadixTreeNode>;
    employees: EmployeeCard[];
}

function createNode(): RadixTreeNode {
    return {
        children: new Map(),
        employees: []
    }
}

export class Utils {

    public searchTree: RadixTreeNode = createNode();

    private normalizeText(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD') // Tách dấu
            .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
            .replace(/đ/g, 'd') // Thay đ -> d
            .replace(/[^a-z0-9\s]/g, '') // Chỉ giữ chữ, số, khoảng trắng
            .trim();
    }

    init () {
        const tree: RadixTreeNode = createNode();
        const employeeList: EmployeeCard[] = EMPLOYEE_DATA_BASE;
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
    }


    findName (name: string): EmployeeCard[] {
        if (!name || name.trim() === '') return EMPLOYEE_DATA_BASE;
        let res: EmployeeCard[] = [];

        const normalizedName = (this.normalizeText(name)).split(/\s+/).filter(tu => tu.length > 0);

        for (const tu of normalizedName) {
            let tree = this.searchTree;
            for (const char of tu) {
                if (!tree.children.has(char)){
                    return [];
                }

                tree = tree.children.get(char)!;

                const employees: EmployeeCard[] = tree.employees;

                res = res.length === 0 ? employees : res.filter(e => employees.includes(e));
            }
        }

        return res;

        // while (name !== null) {
        //     const char = name.charAt(0);
        //     if (char < 'a' || char > 'z') {
        //         continue;
        //     }
        //     if (!tree.children.has(char)){
        //         return [];
        //     }
        //
        //     tree = tree.children.get(char)!;
        //
        //     const employees: EmployeeCard[] = tree.employees;
        //
        //     if (res === undefined) {
        //         res = employees;
        //     } else {
        //         res.filter(employee => employees.includes(employee));
        //     }
        //
        //     name = name.substring(1, name.length);
        // }

    }


}

const searchService = new Utils();
export default searchService;