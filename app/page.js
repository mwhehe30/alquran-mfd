import {
  ArrowUpRight,
  BookHeart,
  BookOpen,
  Clock3,
  Headphones,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const menu = [
  {
    href: "/alquran/surah",
    title: "Baca Al-Qur'an",
    subtitle: "114 surah & terjemahan",
    icon: BookOpen,
    className: "bg-[#0f6b56] text-white",
  },
  {
    href: "/alquran/murotal",
    title: "Murotal",
    subtitle: "Dengarkan tilawah",
    icon: Headphones,
    className: "bg-[#d7a94a] text-[#17382f]",
  },
  {
    href: "/jadwal-sholat",
    title: "Jadwal Salat",
    subtitle: "Waktu ibadah harian",
    icon: Clock3,
    className: "bg-white text-[#17382f]",
  },
  {
    href: "/doa",
    title: "Doa Harian",
    subtitle: "Doa pilihan sehari-hari",
    icon: BookHeart,
    className: "bg-white text-[#17382f]",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen px-5 pb-10 pt-7">
      <header className="mb-7 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#0f6b56]">
            Assalamu&apos;alaikum
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-[#17382f]">
            Nur Quran
          </h1>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#17382f] text-[#d7a94a] shadow-lg">
          <Sparkles className="size-5" />
        </div>
      </header>

      <section className="ornament relative mb-7 overflow-hidden rounded-[32px] bg-[#0a4b3e] px-6 py-7 text-white shadow-[0_22px_50px_rgba(10,75,62,.24)]">
        <div className="absolute -right-14 -top-14 size-44 rounded-full border border-white/10" />
        <div className="absolute -right-6 -top-6 size-28 rounded-full border border-white/10" />
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6c775]">
          Pengingat Hari Ini
        </p>
        <p
          dir="rtl"
          lang="ar"
          className="arabic-text relative z-10 mb-3 text-right text-[29px] font-semibold"
        >
          أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ
        </p>
        <p className="max-w-[300px] text-sm leading-6 text-emerald-50/80">
          Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs font-medium text-emerald-100/70">
            QS. Ar-Ra&apos;d: 28
          </span>
          <Link
            href="/alquran/surah/13#ayat-28"
            className="flex items-center gap-1 text-xs font-bold text-[#e6c775]"
          >
            Baca ayat <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d09c35]">
            Jelajahi
          </p>
          <h2 className="mt-1 text-xl font-bold">Temani ibadahmu</h2>
        </div>
        <MapPin className="size-5 text-[#0f6b56]" />
      </div>

      <section className="grid grid-cols-2 gap-3">
        {menu.map(({ href, title, subtitle, icon: Icon, className }) => (
          <Link
            key={href}
            href={href}
            className={`${className} group min-h-40 rounded-[26px] border border-[#17382f]/8 p-5 shadow-[0_12px_30px_rgba(23,56,47,.07)] transition hover:-translate-y-1`}
          >
            <div className="mb-7 flex size-11 items-center justify-center rounded-2xl bg-current/10">
              <Icon className="size-5" />
            </div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-xs leading-5 opacity-65">{subtitle}</p>
          </Link>
        ))}
      </section>

      <Link
        href="/alquran/marks"
        className="soft-card mt-4 flex items-center justify-between rounded-[26px] p-5 transition hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#f5ead0] text-[#b7801d]">
            <BookHeart className="size-5" />
          </div>
          <div>
            <p className="font-bold">Ayat tersimpan</p>
            <p className="mt-0.5 text-xs text-[#718078]">
              Lanjutkan renungan terakhir
            </p>
          </div>
        </div>
        <ArrowUpRight className="size-5 text-[#0f6b56]" />
      </Link>
    </main>
  );
}
