import Link from 'next/link';
import { Home as HomeIcon, ChevronRight } from 'lucide-react';

/**
 * items: [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Bài viết A' }]
 * Trang cuối cùng (không có href) là trang hiện tại
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="my-6">
      <ol className="flex flex-wrap items-center gap-2 text-base">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href || item.label} className="flex items-center gap-2">
              {idx === 0 ? (
                <Link
                  href={item.href || '/'}
                  className="flex items-center px-4 py-1 rounded-full border border-green-700 text-green-700 font-medium bg-white hover:bg-green-50 transition"
                >
                  <HomeIcon size={18} className="mr-1" />
                  {item.label}
                </Link>
              ) : item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="px-4 py-1 rounded-full border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold border border-gray-200 cursor-default">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={18} className="text-gray-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
