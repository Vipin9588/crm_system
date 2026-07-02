import { ProductCards } from '@/features/product/component/ProductsCards'
import CustomPieChart from '@/Components/chart/PieChart'
import ReusableLineChart from '@/Components/chart/AreaChart'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Context/Authcontext/AuthProvider';
import { DataTable } from '@/Components/table/data-table';
import { getColumns } from './component/columns';
import getProductStats, { Status } from './api/getStatus';
import { useNotify } from '@/Context/NotifyContext/NotifyContextProvider';
import deleteProduct from './api/deleteProducts';
import type { productDatatype } from './productStructer';

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
    const navigate = useNavigate();
    const { toastMessage } = useNotify();

    const fetchStatus = async () => {
        if (!user) return
        try {
            const s = await getProductStats(user?.uid);
            console.log(s)
            if (s === undefined) return;
            setStatus(s);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchStatus();
    }, [])


    const handleEdit = (product: productDatatype) => {
        navigate(`/editProduct/${product.id}`);
    }

    const handleView = (product: productDatatype) => {
        navigate(`/product/${product.id}`);
    }


    const handleDelete = async (product: productDatatype) => {
    if (!user) {
        toastMessage("Please login first", "error");
        return;
    }

    const sure = window.confirm(
        `Delete "${product.name}"? This cannot be undone.`
    );

    if (!sure) return;

    try {
        const deleted = await deleteProduct(product.id, user.uid);

        if (!deleted) {
            toastMessage("Could not delete product", "error");
            return;
        }

        toastMessage("Product deleted successfully", "success");

        setStatus((prev) => ({
            ...prev,
            products: prev.products.filter((p) => p.id !== product.id),
            totalProducts: prev.totalProducts - 1,
        }));
    } catch (err) {
        console.error(err);
        toastMessage("Something went wrong", "error");
    }
};
    const column = getColumns({ onEdit: handleEdit, onView: handleView, onDelete: handleDelete });

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
            <ProductCards status={status} />
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