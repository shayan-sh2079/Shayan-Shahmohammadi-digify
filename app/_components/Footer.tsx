"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { onPageChange } from "@/utils/currPageHandlers";
import ItemsPerPageSelect from "./ItemsPerPageSelect";
import useCurrPage from "@/hooks/useCurrPage";
import useTotalPages from "../_store/useTotalPages";
import dynamic from "next/dynamic";

const PaginationDynamic = dynamic(() => import("@/components/ui/Pagination"), {
  ssr: false,
});

export default function Footer() {
  const isMobile = useIsMobile();
  const { page } = useCurrPage();
  const totalPages = useTotalPages((state) => state.totalPages);

  if (isMobile) return null;

  return (
    <footer className={"flex items-center gap-8"}>
      <PaginationDynamic
        currentPage={page}
        totalPages={totalPages ?? 1}
        onPageChange={onPageChange}
      />
      <ItemsPerPageSelect />
    </footer>
  );
}
