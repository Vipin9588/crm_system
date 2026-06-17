import { ProductCards } from '@/features/product/component/ProductsCards'
import CustomPieChart from '@/Components/chart/PieChart'
import ReusableLineChart from '@/Components/chart/AreaChart'
import ProductListHeader from '@/features/product/component/ProductListHeader';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/Context/Authcontext/AuthProvider';
import { productDatatype } from './productStructer';
import { search } from './api/search';
import { DataTable } from '@/Components/table/data-table';
import { getColumns } from './component/columns';
export default function ProductPage() {
    const [Products, setProducts] = useState<productDatatype[]>([]);
    const [filter, setFilter] = useState<string | null>(null)
    const { user } = useAuth();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const column = getColumns();

    useEffect(() => {
        if (!user) return;

        (async () => {
            if (filter !== null) {
                const p = await search(user.uid, filter)
                setProducts(p);

            } else {
                const p = await search(user.uid)
                setProducts(p)
            }
        })()
    }, [filter, user])


    const productSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(async () => {
            const l = await search(user.uid, e.target.value);
            if (!l) return;
            setProducts(l);
        }, 50);
    };




    const data = [
        { name: "Phone", value: 200 },
        { name: "toys", value: 400 },
        { name: "clothes", value: 500 },
        { name: "shoes", value: 900 },
        { name: "speakers", value: 240 }
    ]


    const inventoryGrowthData = [
        { month: "Jan", products: 120 },
        { month: "Feb", products: 135 },
        { month: "Mar", products: 148 },
        { month: "Apr", products: 160 },
        { month: "May", products: 185 },
        { month: "Jun", products: 210 },
        { month: "Jul", products: 225 },
        { month: "Aug", products: 240 },
    ];

    const categoryData = [
        { name: "Electronics", value: 120 },
        { name: "Fashion", value: 80 },
        { name: "Shoes", value: 50 },
        { name: "Accessories", value: 40 },
        { name: "Toys", value: 30 },
    ];


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
            <ProductCards />
            <div className="grid gap-4 lg:grid-cols-[65%_35%]">
                <div className="p-3">
                    <ReusableLineChart />
                </div>

                <div className="p-3">
                    <CustomPieChart
                        title="Products by Category"
                        data={categoryData}
                        colors={[
                            "var(--chart-blue)",
                            "var(--chart-orange)",
                            "var(--chart-green)",
                            "var(--chart-red)",
                            "var(--chart-purple)",
                        ]}
                    />
                </div>
            </div>
            {/* <ProductListHeader productSearch={productSearch} setFilter={setFilter} /> */}
            <div className='p-4  flex flex-col gap-2 '>
                {/* {
                    Products.map((product, index) => {
                        return <Product
                            key={product.name + index}
                            img={String(product.images[0])}
                            name={product.name}
                            brand={product.brand}
                            cost={product.costPrice}
                            price={product.salePrice}
                            status={checkStatus(Number(product.stock))}
                        />
                    })
                } */}

                <DataTable columns={column} data={Products} />

            </div>


        </div>
    )
}
