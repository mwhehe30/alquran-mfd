const QURAN_API = "https://equran.id/api/v2";
const DOA_API = "https://doa-doa-api-ahmadramadhan.fly.dev/api";
const PRAYER_API = "https://api.myquran.com/v2/sholat";

const isBrowser = () => typeof window !== "undefined";

const fetchJson = async (url) => {
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

const normalizeSurah = (surah) => ({
  nomor: surah.nomor,
  nama: surah.nama,
  nama_latin: surah.namaLatin,
  jumlah_ayat: surah.jumlahAyat,
  tempat_turun: surah.tempatTurun,
  arti: surah.arti,
  deskripsi: surah.deskripsi,
  audio: surah.audioFull?.["05"] ?? Object.values(surah.audioFull ?? {})[0],
});

export const getSurah = async () => {
  try {
    if (isBrowser()) {
      return await fetchJson("/api/quran");
    }

    const response = await fetchJson(`${QURAN_API}/surat`);
    return response.data.map(normalizeSurah);
  } catch (error) {
    console.error("Error fetching surah:", error);
    return [];
  }
};

export const getDetailSurah = async (nomor) => {
  try {
    if (isBrowser()) {
      return await fetchJson(`/api/quran/${nomor}`);
    }

    const response = await fetchJson(`${QURAN_API}/surat/${nomor}`);
    const surah = response.data;

    return {
      ...normalizeSurah(surah),
      ayat: surah.ayat.map((ayat) => ({
        id: `${surah.nomor}-${ayat.nomorAyat}`,
        nomor: ayat.nomorAyat,
        ar: ayat.teksArab,
        tr: ayat.teksLatin,
        idn: ayat.teksIndonesia,
        audio: ayat.audio?.["05"] ?? Object.values(ayat.audio ?? {})[0],
      })),
    };
  } catch (error) {
    console.error("Error fetching surah detail:", error);
    return null;
  }
};

export const getDoa = async () => {
  try {
    if (isBrowser()) {
      return await fetchJson("/api/doa");
    }

    const response = await fetchJson(DOA_API);
    return response.map((item) => ({
      id: item.id,
      judul: item.doa,
      arab: item.ayat,
      latin: item.latin,
      terjemah: item.artinya,
    }));
  } catch (error) {
    console.error("Error fetching doa:", error);
    return [];
  }
};

export const getSemuaKota = async () => {
  try {
    if (isBrowser()) {
      return await fetchJson("/api/prayer/cities");
    }

    const response = await fetchJson(`${PRAYER_API}/kota/semua`);
    return response.data;
  } catch (error) {
    console.error("Error fetching kota:", error);
    return [];
  }
};

export const getJadwalSholatHarian = async (id) => {
  try {
    if (isBrowser()) {
      return await fetchJson(`/api/prayer/schedule/${id}`);
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const response = await fetchJson(`${PRAYER_API}/jadwal/${id}/${today}`);
    const { lokasi, daerah, jadwal } = response.data;

    return { lokasi, daerah, ...jadwal };
  } catch (error) {
    console.error("Error fetching jadwal sholat:", error);
    return null;
  }
};
