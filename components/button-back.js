"use client";

const ButtonBack = () => {
  return (
    <div className="my-6">
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
      >
        Kembali
      </button>
    </div>
  );
};

export default ButtonBack;
