"use client";

import { CountriesRes } from "@/types/responses";
import CountryCard from "./CountryCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import useCountries from "../_hooks/useCountries";

interface Props {
  initialRes: CountriesRes;
}

export default function Countries(props: Props) {
  const { countries, isLoading, showCountries, noResults } = useCountries(
    props.initialRes,
  );

  return (
    <>
      <div className={"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"}>
        {showCountries &&
          countries.map((country) => (
            <CountryCard country={country} key={country.name.common} />
          ))}

        {isLoading &&
          Array.from(Array(4).keys()).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
      </div>
      {noResults && (
        <h2 className={"text-2xl font-bold text-red-500"}>
          There are no countries to display
        </h2>
      )}
    </>
  );
}
