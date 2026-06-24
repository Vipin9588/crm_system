import { ProductCards } from '@/features/product/component/ProductsCards'
import CustomPieChart from '@/Components/chart/PieChart'
import ReusableLineChart from '@/Components/chart/AreaChart'
import { useEffect, useState } from 'react';
import { useAuth } from '@/Context/Authcontext/AuthProvider';
import { DataTable } from '@/Components/table/data-table';
import { getColumns } from './component/columns';
import getProductStats, { Status } from './api/getStatus';

export default function ProductPage() {
    const [status, setStatus] = useState<Status>({
        categories: [],
        totalProducts: 0,
        lowStock: 0,
        inventoryValue: 0,
        products: [],
        monthlyAnalytic: []
    });
    const { user } = useAuth();
    const column = getColumns();

    useEffect(() => {
        if (!user) return
        (async () => {
            try {
                const s = await getProductStats(user?.uid);
                console.log(s)
                if(s===undefined) return;
                setStatus(s);
            } catch (error) {
                console.error(error)
            }
        })();
    }, [])


    

    const colors = [
        "var(--chart-blue)",
        "var(--chart-orange)",
        "var(--chart-green)",
        "var(--chart-red)",
        "var(--chart-purple)",
    ];




    if (!user) return null;

    return (
        <div>
            <ProductCards status={status}/>
            <div className="grid gap-4 lg:grid-cols-[64%_34%] p-4">
                <div className="p-2 border border-accent rounded-md">
                    <ReusableLineChart data={status.monthlyAnalytic} />
                </div>

                <div className="p-2 border border-accent rounded-md ">
                    <CustomPieChart
                        title="Products by Category"
                        data={status.categories}
                        colors={colors}
                    />
                </div>
            </div>
            <div className='p-4  flex flex-col gap-2 '>

                <DataTable columns={column} data={status.products} />

            </div>


        </div>
    )
}
