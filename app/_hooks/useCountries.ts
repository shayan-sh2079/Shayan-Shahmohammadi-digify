import { useEffect, useState } from "react";
import useTotalPages from "../_store/useTotalPages";
import useSearchedValue from "../_store/useSearchedValue";
import useIsMobile from "@/hooks/useIsMobile";
import queryClient from "@/services/queryClient";
import { COUNTRIES_KEY } from "@/constants/queryKeys";
import { getCountries } from "@/services/countries";
import { onPageChange } from "@/utils/currPageHandlers";
import useCurrPage from "@/hooks/useCurrPage";
import { CountriesRes } from "@/types/responses";

let isServer = true;

const useCountries = (initialRes: CountriesRes) => {
  const [countries, setCountries] = useState(initialRes.countries);
  const [isLoading, setIsLoading] = useState(false);
  const { totalPages, setTotalPages } = useTotalPages();
  if (totalPages === null && typeof window !== "undefined") {
    setTotalPages(initialRes.pages);
  }
  const { page, itemsPerPage } = useCurrPage();
  const searchedValue = useSearchedValue((state) => state.value);

  const isMobile = useIsMobile();

  const getData = async () => {
    if (isServer) return;
    setIsLoading(true);
    const res = await queryClient.fetchQuery({
      queryKey: [COUNTRIES_KEY, page, itemsPerPage, searchedValue],
      queryFn: async () =>
        await getCountries(page, itemsPerPage, searchedValue),
      staleTime: 10 * 60 * 1000,
    });
    setIsLoading(false);

    if (page === 1 || !isMobile) {
      setCountries(res.countries);
    } else {
      setCountries((prev) => [...prev, ...res.countries]);
    }
    setTotalPages(res.pages);
  };

  useEffect(() => {
    getData();
  }, [page, itemsPerPage, searchedValue]);

  useEffect(() => {
    if (!isMobile) return;
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !isLoading && page < totalPages!) {
        onPageChange(page + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isLoading, onPageChange, page, totalPages]);

  useEffect(() => {
    isServer = false;
  }, []);

  return {
    countries,
    isLoading,
    showCountries: isMobile || (!isMobile && !isLoading),
    noResults: countries.length === 0 && !isLoading,
  };
};

export default useCountries;
