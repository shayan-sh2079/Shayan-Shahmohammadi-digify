import { CountriesRes } from "@/types/responses";

export const getCountries = async (
  page: number,
  itemsPerPage: number,
  search?: string,
) => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=flags,name,population,area,region",
  );
  const countries: CountriesRes["countries"] = await response.json();
  console.log(111);
  console.log(countries);
  console.log(page);
  console.log(itemsPerPage);
  console.log(search);

  const countriesWithData = countries.filter((country) => {
    const hasData =
      country.area &&
      country.population &&
      country.name.common &&
      country.flags.png &&
      country.flags.alt &&
      country.region;
    const isSearched =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase()) ||
      country.region.toLowerCase().includes(search.toLowerCase());

    return isSearched && hasData;
  });

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedCountries = countriesWithData.slice(start, end);

  return {
    countries: paginatedCountries,
    pages: Math.ceil(countriesWithData.length / itemsPerPage),
  };
};
