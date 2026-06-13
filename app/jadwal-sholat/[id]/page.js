'use client';

import ButtonBack from '@/components/button-back';
import { ErrorState } from '@/components/data-state';
import { getJadwalSholatHarian } from '@/lib/api';
import { Clock3 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const PrayerTimeCard = ({ label, value, isCurrentTime = false }) => (
  <div
    className={`flex items-center justify-between rounded-2xl border p-4 transition ${
      isCurrentTime
        ? 'border-[#d7a94a]/50 bg-[#f8f0dc]'
        : 'border-[#17382f]/8 bg-[#f7f5ee]'
    }`}
  >
    <div className='flex items-center space-x-3'>
      <span
        className={`font-semibold ${
          isCurrentTime ? 'text-[#8d6618]' : 'text-[#17382f]'
        }`}
      >
        {label}
      </span>
      {isCurrentTime && (
        <span className='rounded-lg bg-[#d7a94a] px-2 py-1 text-[10px] font-bold text-[#17382f]'>
          SEKARANG
        </span>
      )}
    </div>
    <span
      className={`text-lg font-bold ${
        isCurrentTime ? 'text-[#8d6618]' : 'text-[#0f6b56]'
      }`}
    >
      {value || '-'}
    </span>
  </div>
);

const LoadingSkeleton = () => (
  <div className='min-h-screen px-5 py-5'>
    <div className='mb-6'>
      <ButtonBack />
    </div>

    <div className='animate-pulse rounded-[30px] border border-[#17382f]/8 bg-white/75 p-5'>
      <div className='mb-4 h-8 w-3/4 rounded-2xl bg-[#dbe9e3]'></div>
      <div className='mb-6 h-4 w-1/2 rounded-xl bg-[#e8edea]'></div>

      <div className='space-y-3'>
        {[...Array(9)].map((_, index) => (
          <div key={index} className='h-14 rounded-2xl bg-[#edf4f0]'></div>
        ))}
      </div>
    </div>
  </div>
);

const Page = () => {
  const param = useParams();
  const [jadwal, setJadwal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchJadwal = useCallback(async () => {
    setIsLoading(true);
    const data = await getJadwalSholatHarian(param.id);
    setJadwal(data);
    setIsLoading(false);
  }, [param.id]);

  useEffect(() => { fetchJadwal(); }, [fetchJadwal]);

  // Format current time to HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  // Get current prayer time
  const getCurrentPrayer = () => {
    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: 'Subuh', time: jadwal.subuh },
      { name: 'Dhuha', time: jadwal.dhuha },
      { name: 'Dzuhur', time: jadwal.dzuhur },
      { name: 'Ashar', time: jadwal.ashar },
      { name: 'Maghrib', time: jadwal.maghrib },
      { name: 'Isya', time: jadwal.isya },
    ]
      .filter((prayer) => prayer.time)
      .map((prayer) => {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        return { ...prayer, minutes: hours * 60 + minutes };
      });

    return [...prayers].reverse().find((prayer) => currentMinutes >= prayer.minutes)?.name ?? null;
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!jadwal) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center p-5'>
        <div className='max-w-md w-full text-center'>
          <ButtonBack />
          <div className='mt-6'>
            <ErrorState message='Jadwal salat gagal dimuat dari server.' onRetry={fetchJadwal} />
          </div>
        </div>
      </div>
    );
  }

  const currentPrayer = getCurrentPrayer();

  return (
    <div className='min-h-screen px-5 py-6'>
      <div className='max-w-md mx-auto'>
        <div className='mb-6'>
          <ButtonBack />
        </div>

        <div>
          {/* Header */}
          <div className='ornament rounded-[30px] bg-[#0a4b3e] p-6 text-white shadow-[0_18px_50px_rgba(23,56,47,.1)]'>
            <Clock3 className='mb-8 size-7 text-[#e6c775]' />
            <p className='text-xs font-semibold uppercase tracking-[.18em] text-emerald-100/70'>Waktu ibadah</p>
            <h1 className='mt-2 text-3xl font-bold'>Jadwal Salat</h1>
            <p className='mt-2 text-sm text-emerald-50/70'>
              {jadwal.lokasi} - {jadwal.daerah}
            </p>

            <div className='mt-6 grid grid-cols-2 gap-2'>
            <div className='rounded-2xl bg-white/10 p-3'>
              <p className='text-xs text-emerald-50/65'>Waktu sekarang</p>
              <p className='mt-1 font-mono text-xl font-bold tracking-wider'>
                {formatTime(currentTime)}
              </p>
            </div>

            <div className='rounded-2xl bg-white/10 p-3'>
              <p className='text-xs text-emerald-50/65'>Tanggal</p>
              <p className='mt-1 text-sm font-semibold'>{jadwal.tanggal}</p>
            </div>
            </div>
          </div>

          <div className='mt-4 rounded-[26px] border border-[#17382f]/8 bg-white/75 p-5 shadow-[0_8px_26px_rgba(23,56,47,.05)]'>
            <p className='mb-4 text-xs font-bold uppercase tracking-[.14em] text-[#d09c35]'>Jadwal hari ini</p>
            <div className='grid gap-3'>
              <PrayerTimeCard label='Imsak' value={jadwal.imsak} />
              <PrayerTimeCard
                label='Subuh'
                value={jadwal.subuh}
                isCurrentTime={currentPrayer === 'Subuh'}
              />
              <PrayerTimeCard label='Terbit' value={jadwal.terbit} />
              <PrayerTimeCard
                label='Dhuha'
                value={jadwal.dhuha}
                isCurrentTime={currentPrayer === 'Dhuha'}
              />
              <PrayerTimeCard
                label='Dzuhur'
                value={jadwal.dzuhur}
                isCurrentTime={currentPrayer === 'Dzuhur'}
              />
              <PrayerTimeCard
                label='Ashar'
                value={jadwal.ashar}
                isCurrentTime={currentPrayer === 'Ashar'}
              />
              <PrayerTimeCard
                label='Maghrib'
                value={jadwal.maghrib}
                isCurrentTime={currentPrayer === 'Maghrib'}
              />
              <PrayerTimeCard
                label='Isya'
                value={jadwal.isya}
                isCurrentTime={currentPrayer === 'Isya'}
              />
            </div>
          </div>

          <div className='mt-3 rounded-2xl bg-[#edf4f0] px-5 py-4'>
            <p className='text-center text-xs text-[#0f6b56]'>
              Jadwal salat hari ini - {jadwal.tanggal}
            </p>
          </div>
        </div>

        {/* Current Prayer Indicator */}
        {currentPrayer && (
          <div className='mt-4 rounded-[22px] border border-[#d7a94a]/45 bg-[#f8f0dc] p-4'>
            <div className='flex items-center justify-center gap-2 text-[#8d6618]'>
              <div className='size-2.5 animate-pulse rounded-full bg-[#d7a94a]'></div>
              <span className='font-bold'>
                Sedang waktu salat: {currentPrayer}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
