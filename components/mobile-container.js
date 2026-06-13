const MobileContainer = ({ children }) => {
  return (
    <div className="app-surface relative mx-auto min-h-screen w-full max-w-[520px] overflow-x-hidden shadow-[0_0_80px_rgba(23,56,47,0.12)]">
      {children}
    </div>
  );
};

export default MobileContainer;
