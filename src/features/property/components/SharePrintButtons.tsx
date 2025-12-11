// src/components/SharePrintButtons.tsx
'use client'

import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Share, Printer } from 'lucide-react'
import PrintablePropertyPage from './PrintablePropertyPage'

interface FloorPlan {
  img: string
  title: string
  Description?: string
}

interface Property {
  id: number
  slug: string
  title: string
  community: string
  price: string
  beds: string
  baths: string
  garages: string
  sqft: string
  gallery: string[]
  zillow_link?: string | null
  Whats_special?: {
    badges?: string[]
    description?: string
  } | null
  Facts_features?: Array<{
    title: string
    list: string[]
  }>
  floor_plans?: FloorPlan[]
}

type Props = {
  title: string
  text?: string
  className?: string
  property?: Property
}

export default function SharePrintButtons({ title, text, className, property }: Props) {
  const [copied, setCopied] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: title,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  })

  async function handleShare() {
    const shareData = { title, text, url: window.location.href }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // user canceled or share failed — fall through to clipboard
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } else {
        // Legacy fallback
        window.prompt('Copy this link:', shareData.url)
      }
    } catch {
      window.prompt('Copy this link:', shareData.url)
    }
  }

  function handlePrintClick() {
    if (property) {
      // Use react-to-print for enhanced printing
      handlePrint()
    } else {
      // Fallback to regular print
      try {
        window.print()
      } catch {}
    }
  }

  return (
    <>
      <div className={`flex gap-2 ${className || ''}`}>
        <div className="w-full">
          <Button
            type="button"
            variant="outline"
            onClick={handleShare}
            className="w-full"
            aria-label="Share this property"
          >
            <Share className="size-4" aria-hidden />
            <span className="ml-2">{copied ? 'Link copied!' : 'Share'}</span>
          </Button>
        </div>
        <div className="w-full">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrintClick}
            className="w-full"
            aria-label="Print this page"
          >
            <Printer className="size-4" aria-hidden />
            <span className="ml-2">Print</span>
          </Button>
        </div>
      </div>
      
      {/* Hidden printable component */}
      {property && (
        <div style={{ display: 'none' }}>
          <PrintablePropertyPage ref={printRef} property={property} />
        </div>
      )}
    </>
  )
}
