"use client";

import ButtonBack from "@/components/button-back";
import { getDoa } from "@/lib/api";
import { useEffect, useState } from "react";

const Page = () => {
  const [doa, setDoa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoa = async () => {
      try {
        setIsLoading(true);
        const res = await getDoa();
        setDoa(res);
      } catch (error) {
        console.error("Error fetching doa:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoa();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm mt-1">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <ButtonBack />

      <div className="space-y-6">
        {doa.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                      {item.judul}
                    </h2>
                    <p className="text-sm text-gray-500">Doa ke-{index + 1}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 mb-6 border-r-4 border-green-500">
                <div
                  dir="rtl"
                  className="text-2xl md:text-3xl leading-loose text-right font-arabic text-gray-800 tracking-wide"
                >
                  {item.arab}
                </div>
              </div>

              <div className="mb-4 p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-emerald-800">
                    Bacaan (Latin)
                  </span>
                </div>
                <p className="font-medium text-emerald-800 tracking-wider italic leading-relaxed">
                  {item.latin}
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-800">
                    Artinya
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  &quot;{item.terjemah}&quot;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
