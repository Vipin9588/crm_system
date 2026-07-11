import { useState, useMemo, type ComponentType, type ReactNode, useEffect } from "react";
import { useFormik, type FormikErrors, type FormikTouched } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Package,
  User,
  Calendar,
  Hash,
  ChevronDown,
  Check,
  ShoppingCart,
} from "lucide-react";
import { useNotify } from "../../../Context/NotifyContext/NotifyContextProvider";
import { useAuth } from "../../../Context/Authcontext/AuthProvider";
import { AddToCollection } from "../../../services/userService";
import countDoc from "../../../services/countDoc";
import { getOrderById, updateOrder } from "../../Order/api/orderService";
import type { Order } from "../../Order/api/orderStatus";

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

interface StatusOption {
  value: Order["status"];
  label: string;
  dot: string;
}

interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

interface OrderFormValues {
  userId: string;
  orderId: string;
  createdAt: string;
  customerId: string;
  status: Order["status"];
  deliveryDate: string;
  items: OrderItem[];
}

interface SubmittedOrder extends OrderFormValues {
  total: number;
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: "pending", label: "Pending", dot: "var(--warning)" },
  { value: "processing", label: "Processing", dot: "var(--chart-blue)" },
  { value: "shipped", label: "Shipped", dot: "var(--chart-purple)" },
  { value: "delivered", label: "Delivered", dot: "var(--success)" },
  { value: "cancelled", label: "Cancelled", dot: "var(--danger)" },
];

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  return `ORD-${ts}`;
}

function nowISOLocal(): string {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type OrderFormErrors = Partial<Record<keyof OrderFormValues, string>>;

function validateOrderForm(values: OrderFormValues, isEditMode: boolean): OrderFormErrors {
  const errors: OrderFormErrors = {};

  if (!values.customerId) {
    errors.customerId = "Select a customer";
  }

  if (!values.status) {
    errors.status = "Select a status";
  }

  if (!values.deliveryDate) {
    errors.deliveryDate = "Pick a delivery date";
  } else if (!isEditMode && values.deliveryDate < todayISODate()) {
    // Only enforce "not in the past" for brand new orders; an existing
    // order's delivery date may legitimately already be in the past.
    errors.deliveryDate = "Delivery date can't be before today";
  }

  if (!values.items || values.items.length === 0) {
    errors.items = "Add at least one product";
  } else if (values.items.some((i) => !i.productId || !i.quantity || i.quantity < 1)) {
    errors.items = "Each product needs a quantity of at least 1";
  }

  return errors;
}

interface FieldShellProps {
  label: string;
  htmlFor: string;
  icon?: ComponentType<{ className?: string }>;
  error?: string;
  touched?: boolean;
  children: ReactNode;
  hint?: string;
}

function FieldShell({ label, htmlFor, icon: Icon, error, touched, children, hint }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/80"
      >
        {Icon ? <Icon className="size-3.5 text-muted-foreground" /> : null}
        {label}
      </label>
      {children}
      {hint && !(touched && error) ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
      {touched && error ? (
        <span className="text-xs font-medium text-destructive">{error}</span>
      ) : null}
    </div>
  );
}

interface CustomerPickerProps {
  value: string;
  onChange: (id: string, customer: Customer | undefined) => void;
  error?: string;
  touched?: boolean;
}

function CustomerPicker({ value, onChange, error, touched }: CustomerPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;
    let cancelled = false;

    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const list = await countDoc<any>(user.uid, "Customers");
        const customerList: Customer[] = list.map((c: any) => ({
          id: c.customerId,
          name: c.name,
          email: c.email,
        }));
        if (!cancelled) setCustomers(customerList);
      } catch (err) {
        console.error("Failed to load customers", err);
        if (!cancelled) setCustomers([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCustomers();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  // If a customerId was set before this list finished loading (edit mode
  // pre-fill), let the parent know the full customer record once we have it.
  useEffect(() => {
    if (!value || customers.length === 0) return;
    const match = customers.find((c) => c.id === value);
    if (match) onChange(value, match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers, value]);

  const selected = customers.find((c) => c.id === value);

  const filtered = useMemo(() => {
    if (!query.trim()) return customers;
    const q = query.toLowerCase();
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [query, customers]);

  return (
    <FieldShell label="Customer" htmlFor="customerId" icon={User} error={error} touched={touched}>
      <div className="relative">
        <button
          id="customerId"
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex w-full items-center justify-between rounded-md border bg-card px-3 py-2.5 text-left text-sm transition-colors ${
            touched && error ? "border-destructive" : "border-input"
          } hover:border-ring/60 focus:outline-none focus:ring-2 focus:ring-ring/40`}
        >
          {selected ? (
            <span className="flex items-center gap-2 truncate">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">
                {initials(selected.name)}
              </span>
              <span className="truncate">
                <span className="font-medium text-foreground">{selected.name}</span>
                <span className="ml-1.5 text-muted-foreground">{selected.email}</span>
              </span>
            </span>
          ) : value ? (
            <span className="text-muted-foreground">Loading customer…</span>
          ) : (
            <span className="text-muted-foreground">
              {loading ? "Loading customers…" : "Search or select a customer…"}
            </span>
          )}
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-md border border-border bg-popover shadow-lg">
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <Search className="size-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a name or email…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <ul className="max-h-56 overflow-y-auto py-1">
                {loading ? (
                  <li className="px-3 py-3 text-sm text-muted-foreground">Loading customers…</li>
                ) : filtered.length === 0 ? (
                  <li className="px-3 py-3 text-sm text-muted-foreground">No customers found</li>
                ) : (
                  filtered.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(c.id, c);
                          setOpen(false);
                          setQuery("");
                        }}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-accent"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground">
                          {initials(c.name)}
                        </span>
                        <span className="flex-1 truncate">
                          <span className="block font-medium text-foreground">{c.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {c.email}
                          </span>
                        </span>
                        {c.id === value && <Check className="size-4 text-primary" />}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </FieldShell>
  );
}

interface ProductSearchProps {
  excludeIds: string[];
  onAdd: (product: Product) => void;
}

function ProductSearch({ excludeIds, onAdd }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;

    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const list = await countDoc<any>(user.uid, "Products");
        const productList: Product[] = list.map((p: any) => ({
          id: p?.id,
          name: p?.name,
          sku: p?.sku ?? "—",
          stock: p?.stock ?? 0,
          price: p?.salePrice ?? 0,
        }));
        if (!cancelled) setProducts(productList);
      } catch (err) {
        console.error("Failed to load products", err);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => !excludeIds.includes(p.id))
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }, [query, excludeIds, products]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring/40">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products by name or SKU…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-popover py-1 shadow-lg">
            {loading ? (
              <li className="px-3 py-3 text-sm text-muted-foreground">Loading products…</li>
            ) : filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-muted-foreground">
                No matching products{excludeIds.length ? " (or already added)" : ""}
              </li>
            ) : (
              filtered.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onAdd(p);
                      setQuery("");
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm hover:bg-accent"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                        <Package className="size-4" />
                      </span>
                      <span>
                        <span className="block font-medium text-foreground">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          SKU {p.sku} · {p.stock} in stock
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-medium text-foreground">
                      {formatCurrency(p.price)}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}

interface StatusSelectProps {
  value: Order["status"];
  onChange: (value: Order["status"]) => void;
  error?: string;
  touched?: boolean;
}

function StatusSelect({ value, onChange, error, touched }: StatusSelectProps) {
  const [open, setOpen] = useState(false);
  const current = STATUS_OPTIONS.find((s) => s.value === value);

  return (
    <FieldShell label="Status" htmlFor="status" error={error} touched={touched}>
      <div className="relative">
        <button
          id="status"
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex w-full items-center justify-between rounded-md border bg-card px-3 py-2.5 text-left text-sm transition-colors ${
            touched && error ? "border-destructive" : "border-input"
          } hover:border-ring/60 focus:outline-none focus:ring-2 focus:ring-ring/40`}
        >
          {current ? (
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: current.dot }} />
              {current.label}
            </span>
          ) : (
            <span className="text-muted-foreground">Select status…</span>
          )}
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-md border border-border bg-popover py-1 shadow-lg">
              {STATUS_OPTIONS.map((s) => (
                <li key={s.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(s.value);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    <span className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: s.dot }} />
                      {s.label}
                    </span>
                    {s.value === value && <Check className="size-4 text-primary" />}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </FieldShell>
  );
}

export default function OrderForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [orderId] = useState<string>(() => (isEditMode && id ? id : generateOrderId()));
  const [createdAt] = useState<string>(nowISOLocal);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
  const { user } = useAuth();
  const { toastMessage } = useNotify();

  const [existingOrder, setExistingOrder] = useState<{
    createdAt: string;
    customerId: string;
    deliveryDate: string;
    status: Order["status"];
    items: OrderItem[];
  } | null>(null);
  const [loadingExisting, setLoadingExisting] = useState(isEditMode);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode || !user?.uid || !id) return;

    let cancelled = false;
    setLoadingExisting(true);
    setLoadError(null);

    (async () => {
      try {
        const order = await getOrderById(user.uid, id);
        if (cancelled) return;
        if (!order) {
          setLoadError("Order not found.");
        } else {
          setExistingOrder({
            createdAt: order.createdAt,
            customerId: order.customerId,
            deliveryDate: order.deliveryDate,
            status: order.status,
            items: order.items.map((i) => ({
              productId: i.productId,
              name: i.name,
              sku: "—",
              price: i.price,
              quantity: i.quantity,
            })),
          });
        }
      } catch (err) {
        console.error("Failed to load order:", err);
        if (!cancelled) setLoadError("Failed to load order.");
      } finally {
        if (!cancelled) setLoadingExisting(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isEditMode, user?.uid, id]);

  const initialValues = useMemo<OrderFormValues>(() => {
    if (isEditMode && existingOrder) {
      return {
        userId: user?.uid ?? "",
        orderId,
        createdAt: existingOrder.createdAt,
        customerId: existingOrder.customerId,
        status: existingOrder.status,
        deliveryDate: existingOrder.deliveryDate,
        items: existingOrder.items,
      };
    }
    return {
      userId: user?.uid ?? "",
      orderId,
      createdAt,
      customerId: "",
      status: "pending",
      deliveryDate: "",
      items: [],
    };
  }, [orderId, createdAt, user?.uid, isEditMode, existingOrder]);

  const formik = useFormik<OrderFormValues>({
    initialValues,
    enableReinitialize: true,
    validate: (values) => validateOrderForm(values, isEditMode),
    onSubmit: async (values, helpers) => {
      if (!user?.uid) {
        toastMessage("You must be signed in to save an order", "error");
        return;
      }
      const total = values.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const payload: SubmittedOrder = { ...values, userId: user.uid, total };

      try {
        if (isEditMode) {
          await updateOrder(user.uid, values.orderId, payload);
          toastMessage(`${values.orderId} updated.`, "success");
          navigate("/order");
        } else {
          await AddToCollection("Orders", payload);
          toastMessage(
            `${values.orderId} created with ${values.items.length} item(s), total ${formatCurrency(
              payload.total
            )}`,
            "success"
          );
          helpers.resetForm();
          setSelectedCustomer(undefined);
        }
      } catch (err) {
        console.error(`Failed to ${isEditMode ? "update" : "create"} order`, err);
        toastMessage(`Couldn't ${isEditMode ? "update" : "create"} the order. Please try again.`, "error");
      }
    },
  });

  const { values, errors, touched, setFieldValue, setFieldTouched, handleSubmit, isSubmitting } =
    formik;

  const fieldErrors = errors as FormikErrors<OrderFormValues>;
  const fieldTouched = touched as FormikTouched<OrderFormValues>;
  const itemsError = typeof fieldErrors.items === "string" ? fieldErrors.items : undefined;

  const addProduct = (product: Product) => {
    const newItem: OrderItem = {
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: 1,
    };
    setFieldValue("items", [...values.items, newItem]);
  };

  const updateQty = (productId: string, qty: number) => {
    const clamped = Math.max(1, Math.min(999, qty || 1));
    setFieldValue(
      "items",
      values.items.map((i) => (i.productId === productId ? { ...i, quantity: clamped } : i))
    );
  };

  const removeItem = (productId: string) => {
    setFieldValue("items", values.items.filter((i) => i.productId !== productId));
  };

  const subtotal = values.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalUnits = values.items.reduce((sum, i) => sum + i.quantity, 0);

  if (!user) {
    return (
      <div className="flex min-h-full w-full items-center justify-center bg-background p-8">
        <p className="text-sm text-muted-foreground">Sign in to manage orders.</p>
      </div>
    );
  }

  if (isEditMode && loadingExisting) {
    return (
      <div className="min-h-full w-full bg-background p-4 sm:p-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-96 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isEditMode && loadError) {
    return (
      <div className="min-h-full w-full bg-background p-4 sm:p-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <button
            type="button"
            onClick={() => navigate("/order")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Orders
          </button>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-destructive">
            {loadError}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-background p-4 sm:p-8">
      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-3xl flex-col gap-6" noValidate>
        <div className="flex flex-col gap-1 border-b border-border pb-5">
          <div className="flex items-center justify-between gap-3">
            <h1
              className="font-semibold text-foreground"
              style={{ fontSize: "var(--font-lg)" }}
            >
              {isEditMode ? "Edit Order" : "New Order"}
            </h1>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {isEditMode ? values.status : "Draft"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {isEditMode
              ? "Update the customer, status, delivery date, or products for this order."
              : "Fill in customer and product details to create an order."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 rounded-md border border-border bg-muted/40 p-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Hash className="size-4 text-muted-foreground" />
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Order ID
                </div>
                <div className="font-mono text-sm font-medium text-foreground">{values.orderId}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Created
                </div>
                <div className="text-sm font-medium text-foreground">
                  {new Date(values.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">Customer</h2>
          <CustomerPicker
            value={values.customerId}
            onChange={(id, c) => {
              setFieldValue("customerId", id);
              setSelectedCustomer(c);
            }}
            error={fieldErrors.customerId}
            touched={fieldTouched.customerId}
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <h2 className="col-span-full text-sm font-semibold text-foreground">Order information</h2>

          <StatusSelect
            value={values.status}
            onChange={(v) => setFieldValue("status", v)}
            error={fieldErrors.status}
            touched={fieldTouched.status}
          />

          <FieldShell
            label="Delivery date"
            htmlFor="deliveryDate"
            icon={Calendar}
            error={fieldErrors.deliveryDate}
            touched={fieldTouched.deliveryDate}
          >
            <input
              id="deliveryDate"
              type="date"
              min={isEditMode ? undefined : todayISODate()}
              value={values.deliveryDate}
              onChange={(e) => setFieldValue("deliveryDate", e.target.value)}
              onBlur={() => setFieldTouched("deliveryDate", true)}
              className={`rounded-md border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors ${
                fieldTouched.deliveryDate && fieldErrors.deliveryDate
                  ? "border-destructive"
                  : "border-input"
              } hover:border-ring/60 focus:ring-2 focus:ring-ring/40`}
            />
          </FieldShell>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Products</h2>
            <span className="text-xs text-muted-foreground">
              {values.items.length} item{values.items.length !== 1 ? "s" : ""}
            </span>
          </div>

          <ProductSearch excludeIds={values.items.map((i) => i.productId)} onAdd={addProduct} />
          {fieldTouched.items && itemsError && (
            <span className="text-xs font-medium text-destructive">{itemsError}</span>
          )}

          {values.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border py-8 text-center">
              <ShoppingCart className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No products added yet</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {values.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center gap-3 rounded-md border border-border bg-card p-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Package className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      SKU {item.sku} · {formatCurrency(item.price)} each
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-md border border-input">
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                      className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQty(item.productId, parseInt(e.target.value, 10))}
                      className="w-10 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                      className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <div className="w-20 shrink-0 text-right text-sm font-semibold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="flex flex-col gap-2 rounded-md border border-border bg-muted/40 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Customer</span>
            <span className="font-medium text-foreground">
              {selectedCustomer ? selectedCustomer.name : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total units</span>
            <span className="font-medium text-foreground">{totalUnits}</span>
          </div>
          <div className="my-1 h-px bg-border" />
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold text-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => {
              if (isEditMode) {
                navigate("/order");
              } else {
                formik.resetForm();
                setSelectedCustomer(undefined);
              }
            }}
            className="rounded-md px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
          >
            {isEditMode ? "Cancel" : "Reset"}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting
              ? isEditMode
                ? "Saving…"
                : "Creating order…"
              : isEditMode
              ? "Save changes"
              : "Create order"}
          </button>
        </div>
      </form>
    </div>
  );
}