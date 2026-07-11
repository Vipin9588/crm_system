import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { useState, useEffect } from "react";
const statuses = ["pending", "processing", "success", "failed"] as const;

async function getData(): Promise<Payment[]> {
    return Array.from({ length: 50 }, (_, index) => ({
        id: `728ed52f-${index + 1}`,
        amount: 100 + index * 25,
        status: statuses[index % statuses.length],
        email: `user${index + 1}@example.com`,
        contact: 9000000000 + index,
    }));
}


export default function DemoPage() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        async function loadData() {
            const result = await getData();
            setData(result);
        }

        loadData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}