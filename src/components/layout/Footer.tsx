import {

  MapPin,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0B1B3A] text-gray-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#3737C1] rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-[#00C89C] rounded-full" />
              </div>
              <h2 className="text-white text-xl font-bold">RinSetu</h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Empowering India with fast, secure, and hassle-free digital loans.
              We believe credit should be accessible to everyone, everywhere.
            </p>

            {/* Social */}
            {/* <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Icon size={18} />
                </div>
              ))}
            </div> */}
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>Personal Loan</li>
              <li>Business Loan</li>
              <li>Education Loan</li>
              <li>Home Renovation</li>
              <li>Check Credit Score</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Partners</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>

            <div className="space-y-4 text-sm">

              <div className="flex gap-3">
                <MapPin className="text-[#6366F1] mt-1" size={18} />
                <p>
                  Level 4, Innov8 Coworking, Koramangala,
                  Bengaluru, Karnataka 560034
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="text-[#6366F1]" size={18} />
                <span>1800-123-4567</span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="text-[#6366F1]" size={18} />
                <span>support@rinsetu.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          {/* Left */}
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#00C89C]" />
            <span>RBI Registered NBFC</span>
          </div>

          {/* Center */}
          <div className="flex gap-6 flex-wrap justify-center">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Grievance Redressal</span>
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            © 2026 RinSetu Finance. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}