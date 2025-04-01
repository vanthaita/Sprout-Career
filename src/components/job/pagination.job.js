'use client'
import React from 'react'
import { ChevronLeft, ChevronRight, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Pagination = ({ 
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {}
}) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages)
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <div className="text-sm text-[#554640]/90">
        Showing page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 p-0 border-[#e4d9c8] text-[#554640] hover:bg-[#3A6B4C]/10 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'solid' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`h-9 w-9 p-0 ${
              page === currentPage 
                ? 'bg-[#3A6B4C] text-white hover:bg-[#2E5540]' 
                : 'border-[#e4d9c8] text-[#554640] hover:bg-[#3A6B4C]/10'
            }`}
          >
            {page}
          </Button>
        ))}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="px-2 text-[#554640]/80">...</span>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 p-0 border-[#e4d9c8] text-[#554640] hover:bg-[#3A6B4C]/10 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#554640]/80">
        <Sprout className="h-4 w-4 text-[#3A6B4C]" />
        <span>{totalPages * 10} opportunities cultivated</span>
      </div>
    </div>
  )
}

export default Pagination