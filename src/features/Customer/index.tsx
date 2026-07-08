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
import { deleteCustomer } from "@/features/Customer/api/customerService";
import { useNotify } from "@/Context/NotifyContext/NotifyContextProvider";
import { Plus } from 'lucide-react';

export default function CustomerPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toastMessage } = useNotify();

  function handleView(customer: Customer) {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  }

  function handleClose() {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCustomer(null), 300);
  }

  function handleEdit(customer: Customer) {
    navigate(`/edit/customer/${customer.customerId}`);
  }

  async function handleDeleteRequest(customer: Customer) {
    if (!user?.uid) return;

    const confirmed = window.confirm(
      `Delete ${customer.name}? This will permanently remove their record. This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteCustomer(user.uid, customer.customerId);
      setCustomers((prev) => prev.filter((c) => c.customerId !== customer.customerId));
      toastMessage(`${customer.name} was deleted.`, "success");
    } catch (err) {
      console.error("Failed to delete customer:", err);
      toastMessage("Failed to delete customer. Please try again.", "error");
    }
  }

  useEffect(() => {
    if (!user?.uid) {
      setCustomers([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const loadCustomers = async () => {
      const customerList = await getCustomerStaus(user.uid);
      if (!cancelled) {
        setCustomers(customerList);
        setLoading(false);
      }
    };

    loadCustomers();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  const columns = getColumns(handleView, handleEdit, handleDeleteRequest);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex justify-end items-center flex-wrap gap-2 px-4 py-3 border-b border-border">
        <button
          onClick={() => navigate("/new/customer")}
          className="flex items-center px-4 py-2 text-sm bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity"
        >
          <Plus/> Add Customer
        </button>
      </div>

      <div className="p-4">
        <Cards customers={customers} loading={loading} />
      </div>

      <div className="p-4 relative">
        {selectedCustomer !== null && (
          <div className="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CustomerSummary customer={selectedCustomer} onClose={handleClose} />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        ) : customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
            <p className="text-sm font-medium text-foreground">No customers yet</p>
            <p className="text-xs text-muted-foreground">
              Click "Add Customer" to create your first record.
            </p>
          </div>
        ) : (
          <DataTable columns={columns} data={customers} />
        )}
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={handleClose}
        />
      )}
    </div>
  );
}