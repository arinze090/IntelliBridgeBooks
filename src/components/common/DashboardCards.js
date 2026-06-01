import { Link } from "react-router-dom";

export function DashboardCards({
  title,
  countValue,
  icon: Icon,
  iconBg = "bg-green-500",
  to,
}) {
  return (
    <Link
      to={to}
      className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 no-underline"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {title}
        </h4>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${iconBg}`}
        >
          <Icon size={18} />
        </div>
      </div>

      {/* Value */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 break-words">
        {countValue}
      </h2>
    </Link>
  );
}
