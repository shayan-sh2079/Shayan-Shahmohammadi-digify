import { getCountries } from "@/services/countries";
import Countries from "./_components/Countries";
import { ITEMS_PER_PAGE_PARAM, PAGE_PARAM } from "@/constants/queryParams";
import { ITEMS_PER_PAGE } from "@/constants/general";

export default async function Home({
  searchParams,
}: {
  searchParams: { [PAGE_PARAM]?: string; [ITEMS_PER_PAGE_PARAM]?: string };
}) {
  const page = +(searchParams[PAGE_PARAM] ?? 1);
  const itemsPerPage = +(searchParams[ITEMS_PER_PAGE_PARAM] ?? ITEMS_PER_PAGE);
  const res = await getCountries(page, itemsPerPage);
  console.log(res);
  return (
    <Countries
      initialRes={res}
      initialPage={page}
      initialItemsPerPage={itemsPerPage}
    />
  );
}
