import { ProductCards } from '@/features/product/ProductsCards'
import CustomPieChart from '@/Components/chart/PieChart'
import  ReusableLineChart  from '../chart/AreaChart'
import Product, { type productProps } from '@/features/product/Product';
import ProductListHeader from '@/features/product/ProductListHeader';
export default function ProductPage() {

    const data = [
        { name: "Phone", value: 200 },
        { name: "toys", value: 400 },
        { name: "clothes", value: 500 },
        { name: "shoes", value: 900 },
        { name: "speakers", value: 240 }
    ]

    const products: productProps[] = [
        {
            img: "https://example.com/laptop.jpg",
            name: "Laptop Pro X",
            brand: "TechNova",
            cost: 45000,
            price: 60000,
            status: "In Stock",
        },
        {
            img: "https://example.com/headphones.jpg",
            name: "Wireless Headphones",
            brand: "SoundMax",
            cost: 2000,
            price: 3500,
            status: "Low Stock",
        },
        {
            img: "https://example.com/smartwatch.jpg",
            name: "Smart Watch",
            brand: "FitTrack",
            cost: 5000,
            price: 7500,
            status: "In Stock",
        },
        {
            img: "https://example.com/keyboard.jpg",
            name: "Mechanical Keyboard",
            brand: "KeyMaster",
            cost: 1800,
            price: 3200,
            status: "Out of Stock",
        },
        {
            img: "https://example.com/mouse.jpg",
            name: "Gaming Mouse",
            brand: "GameTech",
            cost: 1200,
            price: 2500,
            status: "In Stock",
        },
        {
            img: "https://example.com/monitor.jpg",
            name: "27-inch Monitor",
            brand: "ViewPlus",
            cost: 10000,
            price: 14500,
            status: "Low Stock",
        },
        {
            img: "https://example.com/speaker.jpg",
            name: "Bluetooth Speaker",
            brand: "AudioBeat",
            cost: 1500,
            price: 2800,
            status: "In Stock",
        },
        {
            img: "https://example.com/tablet.jpg",
            name: "Android Tablet",
            brand: "TechNova",
            cost: 12000,
            price: 17000,
            status: "In Stock",
        },
    ];

   

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
    return (
        <div>
            <ProductCards />
            <div className="grid gap-4 lg:grid-cols-[65%_35%]">
                <div className="p-3">
                    <ReusableLineChart/>
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
            <ProductListHeader />
            <div className='p-4  flex flex-col gap-2 '>
                {
                    products.map((product) => {
                        return <Product
                            key={product.name}
                            img={product.img}
                            name={product.name}
                            brand={product.brand}
                            cost={product.cost}
                            price={product.price}
                            status={product.status}
                        />
                    })
                }
            </div>
        </div>
    )
}
