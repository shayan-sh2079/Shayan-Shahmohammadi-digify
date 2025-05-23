import { ITEMS_PER_PAGE_PARAM, PAGE_PARAM } from "@/constants/queryParams";

export const onPageChange = (newPage: number) => {
  const params = new URLSearchParams(window.location.search);
  params.set(PAGE_PARAM, newPage.toString());
  window.history.pushState(null, "", `?${params.toString()}`);
};

export const onItemsPerPageChange = (newItemsPerPage: number) => {
  const params = new URLSearchParams(window.location.search);
  params.set(ITEMS_PER_PAGE_PARAM, newItemsPerPage.toString());
  params.set(PAGE_PARAM, "1");
  window.history.pushState(null, "", `?${params.toString()}`);
};
