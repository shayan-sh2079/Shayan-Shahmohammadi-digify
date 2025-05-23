import { useSearchParams } from "next/navigation";
import { ITEMS_PER_PAGE_PARAM, PAGE_PARAM } from "@/constants/queryParams";
import { ITEMS_PER_PAGE } from "@/constants/general";

const useCurrPage = () => {
  const searchParams = useSearchParams();
  const page = +(searchParams.get(PAGE_PARAM) ?? 1);
  const itemsPerPage = +(
    searchParams.get(ITEMS_PER_PAGE_PARAM) ?? ITEMS_PER_PAGE
  );

  return { page, itemsPerPage };
};

export default useCurrPage;
