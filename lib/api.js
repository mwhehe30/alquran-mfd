export const getSurah = async () => {
  try {
    const res = await fetch("https://quran-api.santrikoding.com/api/surah", {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching surah:", error);
    return [];
  }
};

export const getDetailSurah = async (nomor) => {
  try {
    const res = await fetch(
      `https://quran-api.santrikoding.com/api/surah/${nomor}`,
      {
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching surah:", error);
    return [];
  }
};

export const getDoa = async () => {
  try {
    const res = await fetch("https://open-api.my.id/api/doa", {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching doa:", error);
    return [];
  }
};

export const getSemuaKota = async () => {
  try {
    const res = await fetch("https://api.myquran.com/v2/sholat/kota/semua", {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching kota:", error);
    return [];
  }
};

export const getJadwalSholatHarian = async (id) => {
  try {
    const date = new Date();
    const today = date.toLocaleDateString("en-CA"); // format YYYY-MM-DD

    const res = await fetch(
      `https://api.myquran.com/v2/sholat/jadwal/${id}/${today}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const json = await res.json();
    const {
      data: { lokasi, daerah, jadwal },
    } = json;

    return { lokasi, daerah, ...jadwal };
  } catch (error) {
    console.error("Error fetching jadwal sholat:", error);
    return null;
  }
};
