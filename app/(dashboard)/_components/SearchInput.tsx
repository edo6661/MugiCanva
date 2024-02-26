"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "usehooks-ts";
import qs from "query-string";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
interface Props {
  orgId: string;
}
const SearchInput = ({ orgId }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className=" relative fl-itc sm:w-full">
      <Search className="absolute left-2" />
      <Input
        className="pl-10 w-full"
        placeholder="Search"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
