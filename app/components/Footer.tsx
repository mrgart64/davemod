import Link from 'next/link';
import Image from 'next/image';
import { Phone, CameraIcon, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    // { label: "Beranda", href: "#home" },
  ];

  const contactInfo = [
    {
      label: "WhatsApp",
      value: "+62 822-1150-9216",
      href: "https://wa.me/6282211509216",
      icon: Phone,
    },
    {
      label: "Instagram",
      value: "@mrgart64",
      href: "https://instagram.com/mrgart64",
      icon: CameraIcon,
    },
    {
      label: "Website",
      value: "basis64.com",
      href: "https://basis64.com",
      icon: Globe,
    },
  ];

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 mt-12">
      <div className="bg-white border border-neutral-300 rounded-t-2xl shadow-sm transition-all hover:border-neutral-300 overflow-hidden">

        {/* Konten Utama Footer */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start md:items-center">

          {/* KOLOM KIRI: Logo & Sub-judul */}
          <div className="md:col-span-5 flex items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 text-white flex items-center justify-center">
              <img
                src="/images/bs64.webp"
                alt="Logo BASIS-64"
                width={128}
                height={128}
                className="w-14 h-14 object-contain"
                loading="eager"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-neutral-900 tracking-wider leading-none uppercase">
                BASIS-64
              </span>
              <span className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] uppercase mt-1 leading-none">
                BUSINESS & DEVELOPMENT
              </span>
            </div>
          </div>

          {/* KOLOM TENGAH/KANAN: Informasi Kontak */}
          <div className="md:col-span-7 flex flex-wrap md:justify-end gap-6 text-xs sm:text-sm">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-neutral-600 hover:text-blue-600 transition-colors duration-200 group"
                >
                  <div className="p-2 rounded-xl bg-neutral-100 group-hover:bg-blue-50 text-neutral-500 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <span className="font-medium text-neutral-700 group-hover:text-blue-600">
                      {contact.value}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Navigasi Tambahan */}
          {navigationLinks.length > 0 && (
            <div className="md:col-span-12 flex flex-wrap justify-start md:justify-end gap-x-6 gap-y-2 border-t border-neutral-100 pt-4">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-xs sm:text-sm font-medium text-neutral-500 hover:text-blue-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

        </div>

        {/* Baris Hak Cipta Paling Bawah */}
        <div className="border-t border-neutral-300 bg-neutral-50/50 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-neutral-400 text-center sm:text-left">
            &copy; {currentYear} <span className="font-semibold text-neutral-600">BASIS-64</span>. Hak Cipta Dilindungi.
          </p>
          <p className="text-[11px] text-neutral-400/80">
            Built with Next.js & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}