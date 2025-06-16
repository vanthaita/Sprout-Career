import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToHome = ({ label = 'Back to Home', className = '' }) => (
  <div className={`mt-12 flex justify-center pb-16 ${className}`}>
    <Button
      asChild
      variant="outline"
      className="group bg-gradient-to-r from-green-50 to-white border-2 border-green-600 text-green-700 font-semibold shadow-md hover:shadow-lg hover:from-green-100 hover:to-green-50 transition-all duration-200 rounded-full px-8 py-3 text-lg flex items-center gap-2"
    >
      <Link href="/" className="flex items-center">
        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 group-hover:scale-110 transition-transform duration-200" />
        {label}
      </Link>
    </Button>
  </div>
);

export default BackToHome; 