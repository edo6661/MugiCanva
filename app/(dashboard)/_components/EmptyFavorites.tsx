import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center">
      <Image src="/futaba.png" height={200} width={200} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">No favorite boards!</h2>
      <p className="text-muted-foreground textg-sm mt-2">
        Try favoriting a board
      </p>
    </div>
  );
};
