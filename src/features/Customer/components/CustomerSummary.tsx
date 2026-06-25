import { FaInstagram, FaFacebookF, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

type CustomerProps = {
    customerId: string,
    name: string,
    email: string,
    contact: string,
    status: string,
    totalOrders: number,
    createdAt: string,
    socialLink: string[],
    pic: string
};

type SocialMeta = {
    icon: React.ReactNode;
    bg: string;
    fg: string;
    label: string;
};

function getSocialMeta(link: string): SocialMeta | null {
    if (link.includes("instagram.com")) {
        return {
            icon: <FaInstagram size={14} />,
            bg: "bg-pink-50",
            fg: "text-pink-600",
            label: "Instagram",
        };
    }
    if (link.includes("x.com") || link.includes("twitter.com")) {
        return {
            icon: <RiTwitterXFill size={14} />,
            bg: "bg-neutral-100",
            fg: "text-neutral-700",
            label: "X",
        };
    }
    if (link.includes("facebook.com")) {
        return {
            icon: <FaFacebookF size={14} />,
            bg: "bg-blue-50",
            fg: "text-blue-600",
            label: "Facebook",
        };
    }
    if (link.includes("wa.me") || link.includes("whatsapp.com")) {
        return {
            icon: <FaWhatsapp size={14} />,
            bg: "bg-green-50",
            fg: "text-green-600",
            label: "WhatsApp",
        };
    }

    if (link.includes("linkedin.com")) {
        return {
            icon: <FaLinkedin size={14} />,
            bg: "bg-blue-50",
            fg: "text-blue-600",
            label: "Linkdin"
        }
    }

    return null;
}

function initials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

export default function CustomerSummary({ customer }: { customer: CustomerProps }) {
    console.log("customer summry ",customer)
    const validLinks = customer.socialLink
        .map((link) => ({ link, meta: getSocialMeta(link) }))
        .filter((entry): entry is { link: string; meta: SocialMeta } => entry.meta !== null);

    return (
        <div className="w-full max-w-sm rounded-xl border border-neutral-200  relative   bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wide text-secondary-foreground">
                    Customer
                </span>
                <span className="font-mono text-[11px] text-neutral-400">#{customer.customerId}</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
                {customer.pic ? (
                    <img
                        src={customer.pic}
                        alt={customer.name}
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-neutral-200"
                    />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600 ring-1 ring-neutral-200">
                        {initials(customer.name) || "?"}
                    </div>
                )}
                <div className="min-w-0">
                    <h1 className="truncate text-base font-semibold text-neutral-900">{customer.name}</h1>
                    <p className="truncate text-sm text-neutral-500">{customer.email}</p>
                </div>
            </div>

            {customer.contact && (
                <div className="mt-3 text-sm text-neutral-600">{customer.contact}</div>
            )}

            {validLinks.length > 0 && (
                <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-4">
                    {validLinks.map(({ link, meta }) => (
                        <a
                            key={link}
                            href={link}
                            target="_blank"

                            rel="noopener noreferrer"
                            aria-label={meta.label}
                            title={meta.label}
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${meta.bg} ${meta.fg} transition-transform hover:scale-105`}
                        >
                            {meta.icon}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}