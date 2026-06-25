import { useEffect, useState } from "react";
import type { Customer } from "./types";
import Cards from "./components/Cards";
import { DataTable } from "@/Components/table/data-table";
import { getColumns } from "./components/column";
import CustomerSummary from "./components/CustomerSummary";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/Authcontext/AuthProvider";
import { getCustomerStaus } from "./api/getCustomers";

export const customerData = [
  {
    customerId: "CUST001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    contact: "+91 9876543210",
    status: "Lead",
    totalOrders: 0,
    createdAt: "2026-01-15",
    image: "https://i.pravatar.cc/150?img=1",
    socialLinks: ["https://linkedin.com/in/rahulsharma", "https://twitter.com/priyaverma"],
  },
  {
    customerId: "CUST002",
    name: "Priya Verma",
    email: "priya@example.com",
    contact: "+91 9876543211",
    status: "Contacted",
    totalOrders: 0,
    createdAt: "2026-02-10",
    image: "https://i.pravatar.cc/150?img=5",
    socialLinks: ["https://twitter.com/priyaverma"],
  },
  {
    customerId: "CUST003",
    name: "Amit Kumar",
    email: "amit@example.com",
    contact: "+91 9876543212",
    status: "Interested",
    totalOrders: 1,
    createdAt: "2026-02-22",
    image: "https://i.pravatar.cc/150?img=8",
    socialLinks: [],
  },
  {
    customerId: "CUST004",
    name: "Neha Gupta",
    email: "neha@example.com",
    contact: "+91 9876543213",
    status: "Customer",
    totalOrders: 5,
    createdAt: "2026-03-05",
    image: "https://i.pravatar.cc/150?img=9",
    socialLinks: ["https://linkedin.com/in/nehagupta"],
  },
  {
    customerId: "CUST005",
    name: "Vikas Singh",
    email: "vikas@example.com",
    contact: "+91 9876543214",
    status: "Customer",
    totalOrders: 8,
    createdAt: "2026-03-18",
    image: "https://i.pravatar.cc/150?img=11",
    socialLinks: [],
  },
  {
    customerId: "CUST006",
    name: "Anjali Mehta",
    email: "anjali@example.com",
    contact: "+91 9876543215",
    status: "Inactive",
    totalOrders: 2,
    createdAt: "2026-04-01",
    image: "https://i.pravatar.cc/150?img=16",
    socialLinks: [],
  },
  {
    customerId: "CUST007",
    name: "Rohit Jain",
    email: "rohit@example.com",
    contact: "+91 9876543216",
    status: "Lead",
    totalOrders: 0,
    createdAt: "2026-04-12",
    image: "https://i.pravatar.cc/150?img=18",
    socialLinks: [],
  },
  {
    customerId: "CUST008",
    name: "Sneha Kapoor",
    email: "sneha@example.com",
    contact: "+91 9876543217",
    status: "Customer",
    totalOrders: 12,
    createdAt: "2026-05-08",
    image: "https://i.pravatar.cc/150?img=20",
    socialLinks: ["https://linkedin.com/in/snehakapoor"],
  },
  {
    customerId: "CUST009",
    name: "Arjun Patel",
    email: "arjun@example.com",
    contact: "+91 9876543218",
    status: "Interested",
    totalOrders: 1,
    createdAt: "2026-05-20",
    image: "https://i.pravatar.cc/150?img=22",
    socialLinks: [],
  },
  {
    customerId: "CUST010",
    name: "Karan Malhotra",
    email: "karan@example.com",
    contact: "+91 9876543219",
    status: "Customer",
    totalOrders: 15,
    createdAt: "2026-06-02",
    image: "https://i.pravatar.cc/150?img=25",
    socialLinks: [],
  },
];


export default function CustomerPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customers,setCustomers]  = useState<Customer[] | []>([]);
  const {user} =  useAuth();
  const navigate = useNavigate();

  function handleSelect(customer: Customer) {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  }

  function handleClose() {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCustomer(null), 300);
  }
   
  useEffect(()=>{
     if(!user) return;
     const getC= async()=>{
      const customerList =  await getCustomerStaus(user?.uid);
      console.log("vvsvsdv",customerList)
      setCustomers(customerList);
    }

    getC();
     
  },[])

  const column = getColumns(handleSelect)
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex justify-between items-center flex-wrap gap-2 px-4 py-3 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">Customers</h1>
        <button
          onClick={() => navigate("/new/customer")}
          className="flex items-center px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          <IoIosAdd size={26} />  Add Customer
        </button>
      </div>

      <div className="p-4">
        <Cards />
      </div>


      <div className="p-4 relative">
        {
          selectedCustomer !== null && <div className="z-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CustomerSummary customer={selectedCustomer} />
          </div>
        }
        <DataTable columns={column} data={customers} />
      </div>



      {drawerOpen && (
        <div>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
            onClick={handleClose} />
        </div>
      )}
    </div>
  );
}