import { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// ─── Types ────────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  Active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Inactive: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  Lead: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
};

const ORDER_STATUS_COLORS = {
  Completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Refunded: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CUSTOMERS = [
  {
    id: "C001", name: "Sophia Anderson", email: "sophia@techcorp.io", phone: "+1 (415) 234-5678",
    address: "1420 Harbor Blvd, San Francisco, CA 94107", joinDate: "2022-03-14",
    status: "Active", totalOrders: 38, totalSpending: 14820.5, lastActivity: "2024-06-10",
    avatar: "SA",
    orders: [
      { id: "ORD-4821", date: "2024-06-10", amount: 420.0, status: "Completed" },
      { id: "ORD-4756", date: "2024-05-22", amount: 890.5, status: "Completed" },
      { id: "ORD-4640", date: "2024-04-18", amount: 215.0, status: "Refunded" },
      { id: "ORD-4521", date: "2024-03-05", amount: 1100.0, status: "Completed" },
    ],
    notes: "Key enterprise account. Prefers email communication. Renewal in Q3.",
    activity: [
      { date: "2024-06-10", action: "Placed order ORD-4821" },
      { date: "2024-06-05", action: "Opened marketing email campaign" },
      { date: "2024-05-22", action: "Placed order ORD-4756" },
    ],
  },
  {
    id: "C002", name: "Marcus Chen", email: "m.chen@ventures.com", phone: "+1 (312) 876-4321",
    address: "850 N Michigan Ave, Chicago, IL 60611", joinDate: "2021-11-02",
    status: "Active", totalOrders: 57, totalSpending: 29340.0, lastActivity: "2024-06-12",
    avatar: "MC",
    orders: [
      { id: "ORD-4833", date: "2024-06-12", amount: 750.0, status: "Processing" },
      { id: "ORD-4802", date: "2024-06-01", amount: 1200.0, status: "Completed" },
      { id: "ORD-4780", date: "2024-05-14", amount: 320.0, status: "Completed" },
    ],
    notes: "Platinum tier customer. Interested in new product line launches.",
    activity: [
      { date: "2024-06-12", action: "Placed order ORD-4833" },
      { date: "2024-06-10", action: "Called support — resolved" },
    ],
  },
  {
    id: "C003", name: "Priya Patel", email: "priya.patel@globalinc.net", phone: "+1 (617) 543-2109",
    address: "200 State St, Boston, MA 02109", joinDate: "2023-01-28",
    status: "Lead", totalOrders: 4, totalSpending: 1250.0, lastActivity: "2024-05-30",
    avatar: "PP",
    orders: [
      { id: "ORD-4701", date: "2024-05-30", amount: 410.0, status: "Pending" },
      { id: "ORD-4590", date: "2024-03-12", amount: 840.0, status: "Completed" },
    ],
    notes: "Evaluating enterprise plan. Demo scheduled for July.",
    activity: [
      { date: "2024-05-30", action: "Submitted demo request form" },
      { date: "2024-05-18", action: "Attended webinar: Product Deep Dive" },
    ],
  },
  {
    id: "C004", name: "James Okafor", email: "james.o@designhub.co", phone: "+1 (213) 987-6543",
    address: "3400 Sunset Blvd, Los Angeles, CA 90026", joinDate: "2022-07-09",
    status: "Inactive", totalOrders: 12, totalSpending: 3420.75, lastActivity: "2023-12-04",
    avatar: "JO",
    orders: [
      { id: "ORD-3980", date: "2023-12-04", amount: 220.0, status: "Completed" },
      { id: "ORD-3750", date: "2023-09-18", amount: 560.0, status: "Completed" },
    ],
    notes: "Account went quiet after subscription downgrade. Win-back campaign candidate.",
    activity: [
      { date: "2023-12-04", action: "Placed order ORD-3980" },
      { date: "2023-11-20", action: "Downgraded plan to Basic" },
    ],
  },
  {
    id: "C005", name: "Elena Vasquez", email: "elena.v@startuplab.io", phone: "+1 (512) 345-6789",
    address: "701 Brazos St, Austin, TX 78701", joinDate: "2023-09-15",
    status: "Active", totalOrders: 21, totalSpending: 8970.0, lastActivity: "2024-06-11",
    avatar: "EV",
    orders: [
      { id: "ORD-4829", date: "2024-06-11", amount: 680.0, status: "Completed" },
      { id: "ORD-4810", date: "2024-06-03", amount: 1450.0, status: "Completed" },
    ],
    notes: "Fast-growing startup. Likely to upgrade to Team plan next quarter.",
    activity: [
      { date: "2024-06-11", action: "Placed order ORD-4829" },
      { date: "2024-06-08", action: "Referred 2 new users" },
    ],
  },
  {
    id: "C006", name: "Thomas Brennan", email: "t.brennan@consulting.eu", phone: "+44 20 7946 0958",
    address: "12 Canary Wharf, London E14 5AB, UK", joinDate: "2021-05-20",
    status: "Active", totalOrders: 44, totalSpending: 21600.25, lastActivity: "2024-06-09",
    avatar: "TB",
    orders: [
      { id: "ORD-4819", date: "2024-06-09", amount: 920.0, status: "Completed" },
      { id: "ORD-4775", date: "2024-05-20", amount: 1800.0, status: "Completed" },
    ],
    notes: "EMEA region key account. Invoicing handled quarterly.",
    activity: [
      { date: "2024-06-09", action: "Placed order ORD-4819" },
      { date: "2024-06-01", action: "Reviewed Q1 account summary" },
    ],
  },
  {
    id: "C007", name: "Aisha Nakamura", email: "aisha.n@mediagroup.jp", phone: "+81 3-1234-5678",
    address: "2-5-1 Yurakucho, Chiyoda, Tokyo 100-0006", joinDate: "2022-12-01",
    status: "Lead", totalOrders: 2, totalSpending: 390.0, lastActivity: "2024-06-01",
    avatar: "AN",
    orders: [
      { id: "ORD-4712", date: "2024-06-01", amount: 390.0, status: "Pending" },
    ],
    notes: "Inbound from APAC partner referral. High growth potential.",
    activity: [
      { date: "2024-06-01", action: "Signed up via partner referral" },
      { date: "2024-06-01", action: "Placed trial order ORD-4712" },
    ],
  },
  {
    id: "C008", name: "Carlos Rivera", email: "c.rivera@logisticsco.mx", phone: "+52 55 1234 5678",
    address: "Av. Insurgentes Sur 1457, CDMX 03900", joinDate: "2023-04-05",
    status: "Inactive", totalOrders: 7, totalSpending: 2180.0, lastActivity: "2024-01-15",
    avatar: "CR",
    orders: [
      { id: "ORD-4100", date: "2024-01-15", amount: 340.0, status: "Completed" },
    ],
    notes: "Seasonal buyer. Activity drops in H1 each year.",
    activity: [
      { date: "2024-01-15", action: "Placed order ORD-4100" },
    ],
  },
];

const SUMMARY_STATS = {
  totalCustomers: CUSTOMERS.length,
  activeCustomers: CUSTOMERS.filter((c) => c.status === "Active").length,
  newThisMonth: 3,
  revenueGenerated: CUSTOMERS.reduce((s, c) => s + c.totalSpending, 0),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt$ = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function Avatar({ initials, size = "md" }) {
  const colors = {
    SA: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    MC: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    PP: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
    JO: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    EV: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
    TB: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    AN: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300",
    CR: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  };
  const cls = colors[initials] || "bg-slate-100 text-slate-600";
  const sz = size === "lg" ? "w-14 h-14 text-xl" : size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div className={`${cls} ${sz} rounded-full flex items-center justify-center font-semibold shrink-0`}>
      {initials}
    </div>
  );
}

function Badge({ label, colorClass }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}

// ─── Summary Cards ────────────────────────────────────────────────────────────

function SummaryCards() {
  const cards = [
    { label: "Total Customers", value: SUMMARY_STATS.totalCustomers, icon: "👥", sub: "+5 from last month", color: "text-slate-700 dark:text-slate-200" },
    { label: "Active Customers", value: SUMMARY_STATS.activeCustomers, icon: "✅", sub: `${Math.round((SUMMARY_STATS.activeCustomers / SUMMARY_STATS.totalCustomers) * 100)}% of total`, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "New This Month", value: SUMMARY_STATS.newThisMonth, icon: "🆕", sub: "+2 vs last month", color: "text-violet-600 dark:text-violet-400" },
    { label: "Revenue Generated", value: fmt$(SUMMARY_STATS.revenueGenerated), icon: "💰", sub: "All time total", color: "text-blue-600 dark:text-blue-400" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{c.label}</span>
            <span className="text-base">{c.icon}</span>
          </div>
          <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Customer Drawer ──────────────────────────────────────────────────────────

function CustomerDrawer({ customer, onClose }) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "orders", "notes", "activity"];
  const avgOrderValue = customer.totalSpending / customer.totalOrders;

  if (!customer) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col overflow-hidden border-l border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Customer Profile</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Profile */}
        <div className="px-5 py-5 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-4 mb-4">
            <Avatar initials={customer.avatar} size="lg" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{customer.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge label={customer.status} colorClass={STATUS_COLORS[customer.status]} />
                <span className="text-xs text-slate-400 dark:text-slate-500">ID: {customer.id}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { icon: "✉️", val: customer.email },
              { icon: "📞", val: customer.phone },
              { icon: "📍", val: customer.address },
              { icon: "📅", val: `Joined ${fmtDate(customer.joinDate)}` },
            ].map((r) => (
              <div key={r.val} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                <span>{r.icon}</span>
                <span>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          {[
            { label: "Total Orders", value: customer.totalOrders },
            { label: "Total Revenue", value: fmt$(customer.totalSpending) },
            { label: "Avg Order Value", value: fmt$(avgOrderValue) },
            { label: "Last Purchase", value: fmtDate(customer.lastActivity) },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2.5">
              <div className="text-xs text-slate-400 dark:text-slate-500 mb-1">{s.label}</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 shrink-0 px-5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 px-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                tab === t
                  ? "border-violet-600 text-violet-600 dark:text-violet-400 dark:border-violet-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {t === "orders" ? "Orders" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === "overview" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Account Summary</h3>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="flex justify-between"><span>Status</span><Badge label={customer.status} colorClass={STATUS_COLORS[customer.status]} /></div>
                  <div className="flex justify-between"><span>Total Orders</span><span className="font-medium">{customer.totalOrders}</span></div>
                  <div className="flex justify-between"><span>Lifetime Value</span><span className="font-medium">{fmt$(customer.totalSpending)}</span></div>
                  <div className="flex justify-between"><span>Last Activity</span><span className="font-medium">{fmtDate(customer.lastActivity)}</span></div>
                </div>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Order History</h3>
              {customer.orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                  <div>
                    <div className="text-sm font-medium text-slate-800 dark:text-white">{o.id}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{fmtDate(o.date)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{fmt$(o.amount)}</div>
                    <Badge label={o.status} colorClass={ORDER_STATUS_COLORS[o.status]} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "notes" && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Account Notes</h3>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300">
                {customer.notes}
              </div>
            </div>
          )}

          {tab === "activity" && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Activity Log</h3>
              <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-4">
                {customer.activity.map((a, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-white dark:border-slate-900 mt-1"></div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{fmtDate(a.date)}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">{a.action}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Actions Menu ─────────────────────────────────────────────────────────────

function ActionMenu({ customer, onView }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 text-sm">
            {[
              { label: "View Profile", action: () => { onView(customer); setOpen(false); } },
              { label: "Send Email", action: () => setOpen(false) },
              { label: "Edit Customer", action: () => setOpen(false) },
              { label: "Delete", action: () => setOpen(false), danger: true },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${item.danger ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-200"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main CRM Component ───────────────────────────────────────────────────────

export default function CRMCustomerManagement() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const filtered = useMemo(() => {
    let data = CUSTOMERS;
    if (statusFilter !== "All") data = data.filter((c) => c.status === statusFilter);
    if (globalFilter) {
      const q = globalFilter.toLowerCase();
      data = data.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    return data;
  }, [globalFilter, statusFilter]);

  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="rounded border-slate-300 dark:border-slate-600 text-violet-600"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          onClick={(e) => e.stopPropagation()}
          className="rounded border-slate-300 dark:border-slate-600 text-violet-600"
        />
      ),
      size: 40,
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar initials={row.original.avatar} size="sm" />
          <div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white">{row.original.name}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500">{row.original.id}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => <span className="text-sm text-slate-600 dark:text-slate-300">{getValue()}</span>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ getValue }) => <span className="text-sm text-slate-600 dark:text-slate-300">{getValue()}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <Badge label={getValue()} colorClass={STATUS_COLORS[getValue()]} />,
    },
    {
      accessorKey: "totalOrders",
      header: "Orders",
      cell: ({ getValue }) => <span className="text-sm font-medium text-slate-800 dark:text-white">{getValue()}</span>,
    },
    {
      accessorKey: "totalSpending",
      header: "Total Spend",
      cell: ({ getValue }) => <span className="text-sm font-semibold text-slate-900 dark:text-white">{fmt$(getValue())}</span>,
    },
    {
      accessorKey: "lastActivity",
      header: "Last Active",
      cell: ({ getValue }) => <span className="text-sm text-slate-500 dark:text-slate-400">{fmtDate(getValue())}</span>,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ActionMenu customer={row.original} onView={setSelectedCustomer} />
      ),
      size: 48,
    },
  ], []);

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 font-sans">
        {/* Top Nav */}
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">C</div>
            <span className="text-base font-bold text-slate-800 dark:text-white">ClarityHQ</span>
            <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 ml-2">Customer Management</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-bold">AK</div>
          </div>
        </nav>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customers</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{CUSTOMERS.length} total contacts</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-violet-200 dark:shadow-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Customer
            </button>
          </div>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Table Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input
                    type="text"
                    placeholder="Search by name or email…"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-2 pl-3 pr-8 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none cursor-pointer"
                >
                  {["All", "Active", "Inactive", "Lead"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              {selectedCount > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-md font-medium">{selectedCount} selected</span>
                  <button className="text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-medium">Delete</button>
                  <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium">Export</button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id} className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap"
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === "asc" && <span className="text-violet-500">↑</span>}
                            {header.column.getIsSorted() === "desc" && <span className="text-violet-500">↓</span>}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                        {[...Array(9)].map((_, j) => (
                          <td key={j} className="px-4 py-3.5">
                            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-16 text-center">
                        <div className="text-3xl mb-3">🔍</div>
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">No customers found</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">Try adjusting your search or filter</div>
                        <button onClick={() => { setGlobalFilter(""); setStatusFilter("All"); }} className="mt-4 text-xs text-violet-600 dark:text-violet-400 font-medium hover:underline">
                          Clear filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedCustomer(row.original)}
                        className={`border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-colors hover:bg-violet-50/50 dark:hover:bg-violet-900/10 ${row.getIsSelected() ? "bg-violet-50 dark:bg-violet-900/20" : ""}`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3.5">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-slate-200 dark:border-slate-700">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filtered.length)} of {filtered.length} customers
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  ← Prev
                </button>
                {[...Array(table.getPageCount())].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                      table.getState().pagination.pageIndex === i
                        ? "bg-violet-600 text-white font-semibold"
                        : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Drawer */}
        {selectedCustomer && (
          <CustomerDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
        )}
      </div>
    </div>
  );
}