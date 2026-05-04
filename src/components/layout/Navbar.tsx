import Link from 'next/link'
import MobileMenu from './MobileMenu'


const navItems = [
  { label: 'Products', href: '/' },
  { label: 'How it works', href: '/' },
  { label: 'About Us', href: '/' },
  { label: 'Support', href: '/' },
]

export default function Navbar() {
  return (
    <header className="w-full flex justify-center border-b bg-white">
      <div className="w-full max-w-[1400px] flex items-center justify-between px-4 sm:px-6 md:px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3737C1] flex items-center justify-center">
            <div className="w-3 h-3 bg-[#00C89C] rounded-full" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            RinSetu
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`text-sm font-medium ${
                i === 0
                  ? 'text-[#3737C1] border-b border-[#00C89C]'
                  : 'text-[#4A5565] hover:text-[#3737C1]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button className="px-4 py-2 rounded-full text-[#3737C1] font-semibold hover:bg-gray-100">
            Login
          </button> */}

          <Link 
              href={"/login"}
          className="px-5 py-2 rounded-full bg-[#3737C1] text-white font-semibold shadow-[0px_10px_15px_-3px_#C6D2FF]">
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu navItems={navItems} />

      </div>
    </header>
  )
}