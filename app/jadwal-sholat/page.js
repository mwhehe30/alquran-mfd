"use client";

import ButtonBack from "@/components/button-back";
import { getSemuaKota } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [kota, setKota] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchKota = async () => {
      const kota = await getSemuaKota();
      setKota(kota);
    };
    fetchKota();
  }, []);

  const filteredKota = kota.filter((item) =>
    item.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <ButtonBack />
      <h1>Jadwal Sholat</h1>
      <input
        type="text"
        placeholder="Cari kota..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <div className="flex flex-col gap-2">
        {filteredKota.map((item) => (
          <Link
            href={`/jadwal-sholat/${item.id}`}
            key={item.id}
            className="px-4 py-2 bg-white rounded-2xl border border-green-200 text-center"
          >
            {item.lokasi}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
