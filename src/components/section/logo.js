import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex justify-center items-center mr-4">
      <Link href='/'>
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-[#3A6B4C]" strokeWidth={1.5} />
          <span className="text-2xl font-bold text-[#2B463C] tracking-tight">
            Sprout
          </span>
        </div>
      </Link>
    </div>
  );
}