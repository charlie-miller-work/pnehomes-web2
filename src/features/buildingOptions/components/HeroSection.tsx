import Image from 'next/image'

interface HeroSectionProps {
  coverImage: string
  title: string
}

export default function HeroSection({ coverImage, title }: HeroSectionProps) {
  return (
    <section className="relative isolate h-[60vh] overflow-hidden">
      {/* Fixed parallax background */}
      <div className="fixed inset-0 -z-20">
        <Image
          src={coverImage}
          alt={`${title} hero background`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          quality={85}
        />
      </div>
      
      {/* Gradient overlay - also fixed */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
      
      {/* Content container with relative positioning */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl max-w-[800px] mx-auto break-words">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}