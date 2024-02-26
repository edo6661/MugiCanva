import Image from "next/image";

export const EmptySearch = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center">
      <Image src="/megumin.png" height={200} width={200} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">No results found!</h2>
      <p className="text-muted-foreground textg-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
};
