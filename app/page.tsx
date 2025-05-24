import { getCountries } from "@/services/countries";
import Countries from "./_components/Countries";
import { ITEMS_PER_PAGE_PARAM, PAGE_PARAM } from "@/constants/queryParams";
import { ITEMS_PER_PAGE } from "@/constants/general";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const revalidate = 86400; //one day

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    [PAGE_PARAM]?: string;
    [ITEMS_PER_PAGE_PARAM]?: string;
  }>;
}) {
  const awaitedSearchParams = await searchParams;
  const page = +(awaitedSearchParams[PAGE_PARAM] ?? 1);
  const itemsPerPage = +(
    awaitedSearchParams[ITEMS_PER_PAGE_PARAM] ?? ITEMS_PER_PAGE
  );
  const res = await getCountries(page, itemsPerPage);

  return (
    <div className={"flex flex-col gap-6 p-8"}>
      <Header />
      <Countries initialRes={res} />
      <Footer />
    </div>
  );
}
