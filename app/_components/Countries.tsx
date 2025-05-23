"use client";

import { CountriesRes } from "@/types/responses";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ITEMS_PER_PAGE_PARAM, PAGE_PARAM } from "@/constants/queryParams";
import { getCountries } from "@/services/countries";
import useIsMobile from "@/hooks/useIsMobile";
import CountryCard from "./CountryCard";
import Pagination from "@/components/ui/Pagination";
import Select from "@/components/ui/Select";
import SearchBar from "@/components/ui/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { COUNTRIES_KEY } from "@/constants/queryKeys";
import queryClient from "@/services/queryClient";
import CardSkeleton from "@/components/ui/CardSkeleton";

interface Props {
  initialPage: number;
  initialItemsPerPage: number;
  initialRes: CountriesRes;
}

let isServer = true;

export default function Countries(props: Props) {
  const [countries, setCountries] = useState(props.initialRes.countries);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [totalPage, setTotalPage] = useState(props.initialRes.pages);
  const page = +(searchParams.get(PAGE_PARAM) ?? props.initialPage);
  const itemsPerPage = +(
    searchParams.get(ITEMS_PER_PAGE_PARAM) ?? props.initialItemsPerPage
  );
  const [searchedValue, setSearchedValue] = useState("");

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
    setTotalPage(res.pages);
  };

  console.log(isMobile);
  useEffect(() => {
    getData();
  }, [page, itemsPerPage, searchedValue]);

  const onPageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set(PAGE_PARAM, newPage.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
  }, []);

  const onItemsPerPageChange = useCallback(
    (newItemsPerPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(ITEMS_PER_PAGE_PARAM, newItemsPerPage.toString());
      params.set(PAGE_PARAM, "1");
      window.history.pushState(null, "", `?${params.toString()}`);
    },
    [searchParams],
  );

  useEffect(() => {
    if (!isMobile) return;
    function handleScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !isLoading && page < totalPage) {
        onPageChange(page + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isLoading, onPageChange, page, totalPage]);

  useEffect(() => {
    isServer = false;
  }, []);

  return (
    <div className={"flex flex-col gap-6 p-8"}>
      <div className={"flex items-center gap-4"}>
        <SearchBar
          onChange={(value) => {
            setSearchedValue(value);
            onPageChange(1);
          }}
        />
        {isMobile && (
          <Select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            label={"items pre page"}
            options={[10, 15, 20]}
          />
        )}
      </div>

      <div className={"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"}>
        {(isMobile || (!isMobile && !isLoading)) &&
          countries.map((country) => (
            <CountryCard country={country} key={country.name.common} />
          ))}
        {isLoading &&
          Array.from(Array(4).keys()).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
      </div>

      {!isMobile && (
        <div className={"flex items-center gap-8"}>
          <Pagination
            currentPage={page}
            totalPages={totalPage}
            onPageChange={onPageChange}
          />
          <Select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            label={"items pre page"}
            options={[10, 15, 20]}
          />
        </div>
      )}
    </div>
  );
}
