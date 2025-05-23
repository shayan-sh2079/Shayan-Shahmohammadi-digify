"use client";

import SearchBar from "@/components/ui/SearchBar";
import { onPageChange } from "@/utils/currPageHandlers";
import useIsMobile from "@/hooks/useIsMobile";
import ItemsPerPageSelect from "./ItemsPerPageSelect";
import useSearchedValue from "../_store/useSearchedValue";

export default function Header() {
  const isMobile = useIsMobile();
  const setSearchedValue = useSearchedValue((state) => state.setValue);

  return (
    <header className={"flex items-center gap-4"}>
      <SearchBar
        onChange={(value) => {
          setSearchedValue(value);
          onPageChange(1);
        }}
      />
      {isMobile && <ItemsPerPageSelect />}
    </header>
  );
}
