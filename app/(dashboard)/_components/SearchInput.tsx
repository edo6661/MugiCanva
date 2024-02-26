"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
interface Props {
  orgId: string;
}
const SearchInput = ({ orgId }: Props) => {
  const router = useRouter();

  const [term, setTerm] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    router.push(`/q?search=${term}`);
  };

  // ! idk why only work in development
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const handleSearch = useDebounceCallback((term: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   term ? params.set("search", term) : params.delete("search");
  //   router.replace(`${pathname}?${params.toString()}`);
  // }, 500);

  return (
    <form className=" relative fl-itc sm:w-full" onSubmit={handleSubmit}>
      <button className="absolute left-2">
        <Search />
      </button>
      <Input
        className="pl-10 w-full"
        placeholder="Search"
        onChange={handleInput}
        value={term}

        // onChange={(e: ChangeEvent<HTMLInputElement>) =>
        //   handleSearch(e.target.value)
        // }
        // defaultValue={searchParams.get("search")?.toString() ?? ""}
      />
    </form>
  );
};

export default SearchInput;
