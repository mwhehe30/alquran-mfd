'use client';

import ButtonBack from '@/components/button-back';
import { getJadwalSholatHarian } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PrayerTimeCard = ({ label, value, isCurrentTime = false }) => (
  <div
    className={`flex justify-between items-center p-4 rounded-xl transition-all duration-200 ${
      isCurrentTime
        ? 'bg-green-100 border-2 border-green-400 shadow-md transform -translate-y-1'
        : 'bg-white hover:bg-green-50 border border-green-200'
    }`}
  >
    <div className='flex items-center space-x-3'>
      <span
        className={`font-semibold ${
          isCurrentTime ? 'text-green-900' : 'text-gray-700'
        }`}
      >
        {label}
      </span>
      {isCurrentTime && (
        <span className='bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse'>
          SEKARANG
        </span>
      )}
    </div>
    <span
      className={`text-lg font-bold ${
        isCurrentTime ? 'text-green-900' : 'text-gray-900'
      }`}
    >
      {value || '-'}
    </span>
  </div>
);

const LoadingSkeleton = () => (
  <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-green-200'>
    <div className='mb-6'>
      <ButtonBack />
    </div>

    <div className='animate-pulse'>
      <div className='h-8 bg-green-200 rounded w-3/4 mx-auto mb-4'></div>
      <div className='h-4 bg-green-200 rounded w-1/2 mx-auto mb-6'></div>

      <div className='space-y-3'>
        {[...Array(9)].map((_, index) => (
          <div key={index} className='h-12 bg-green-200 rounded-xl'></div>
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

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const data = await getJadwalSholatHarian(param.id);
        setJadwal(data);
      } catch (error) {
        console.error('Error fetching jadwal:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJadwal();
  }, [param.id]);

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
      { name: 'Subuh', time: jadwal.subuh, showCurrent: true },
      { name: 'Terbit', time: jadwal.terbit, showCurrent: false },
      { name: 'Dhuha', time: jadwal.dhuha, showCurrent: true },
      { name: 'Dzuhur', time: jadwal.dzuhur, showCurrent: true },
      { name: 'Ashar', time: jadwal.ashar, showCurrent: true },
      { name: 'Maghrib', time: jadwal.maghrib, showCurrent: true },
      { name: 'Isya', time: jadwal.isya, showCurrent: true },
    ];

    for (let prayer of prayers) {
      if (prayer.time && prayer.showCurrent) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerMinutes = hours * 60 + minutes;

        // Check if current time matches this prayer time (within 2 minutes)
        if (Math.abs(currentMinutes - prayerMinutes) <= 2) {
          return prayer.name;
        }
      }
    }

    return null;
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!jadwal) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-6 bg-green-50'>
        <div className='max-w-md w-full text-center'>
          <ButtonBack />
          <div className='mt-6 p-6 bg-white border border-red-200 rounded-2xl shadow-lg'>
            <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-red-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-red-800 mb-2'>
              Gagal Memuat Jadwal
            </h3>
            <p className='text-red-600'>Silakan coba lagi beberapa saat</p>
          </div>
        </div>
      </div>
    );
  }

  const currentPrayer = getCurrentPrayer();

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4'>
      <div className='max-w-md mx-auto'>
        <div className='mb-6'>
          <ButtonBack />
        </div>

        <div className='bg-white shadow-xl rounded-3xl overflow-hidden border border-green-200'>
          {/* Header */}
          <div className='bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center'>
            <div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h1 className='text-2xl font-bold mb-2'>Jadwal Sholat</h1>
            <p className='text-green-100 text-sm mb-3'>
              {jadwal.lokasi} - {jadwal.daerah}
            </p>

            {/* Current Time */}
            <div className='bg-white/10 rounded-lg p-3 mb-3'>
              <p className='text-sm font-medium'>Waktu Sekarang</p>
              <p className='text-2xl font-mono font-bold tracking-wider'>
                {formatTime(currentTime)}
              </p>
            </div>

            <div className='bg-white/10 rounded-lg p-3'>
              <p className='text-sm font-medium'>Tanggal</p>
              <p className='text-lg font-semibold'>{jadwal.tanggal}</p>
            </div>
          </div>

          {/* Prayer Times */}
          <div className='p-6'>
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

          {/* Footer */}
          <div className='bg-green-50 px-6 py-4 border-t border-green-200'>
            <p className='text-center text-sm text-green-600'>
              Jadwal sholat hari ini - {jadwal.tanggal}
            </p>
          </div>
        </div>

        {/* Current Prayer Indicator */}
        {currentPrayer && (
          <div className='mt-6 bg-white rounded-2xl p-4 shadow-lg border-2 border-green-400'>
            <div className='flex items-center justify-center space-x-2 text-green-700'>
              <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              <span className='font-bold text-lg'>
                Sedang Waktu Sholat: {currentPrayer}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
