import Image from "next/image";
import { AddWideOrganization } from "./AddOrganization";

export default function EmptyOrganization() {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center">
      <Image src="/bocchi.png" alt="Empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <AddWideOrganization />
      </div>
    </div>
  );
}
