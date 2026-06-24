const SkeletonCard = () => {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-2xl
        bg-slate-900
        border
        border-slate-800
      "
    >
      <div
        className="
          h-[350px]
          bg-slate-800
        "
      />

      <div className="p-4">
        <div
          className="
            h-6
            bg-slate-800
            rounded
            mb-4
          "
        />

        <div
          className="
            h-4
            bg-slate-800
            rounded
          "
        />
      </div>
    </div>
  );
};

export default SkeletonCard;