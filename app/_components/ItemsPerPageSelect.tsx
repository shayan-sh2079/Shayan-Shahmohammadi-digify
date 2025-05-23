import { onItemsPerPageChange } from "@/utils/currPageHandlers";
import Select from "@/components/ui/Select";
import { ITEM_PER_PAGE_OPTIONS } from "@/constants/general";
import useCurrPage from "@/hooks/useCurrPage";
import useTotalPages from "../_store/useTotalPages";

export default function ItemsPerPageSelect() {
  const { itemsPerPage } = useCurrPage();
  const totalPages = useTotalPages((state) => state.totalPages);

  if (!totalPages || totalPages <= 1) return null;

  return (
    <Select
      value={itemsPerPage}
      onChange={onItemsPerPageChange}
      label={"items pre page"}
      options={ITEM_PER_PAGE_OPTIONS}
    />
  );
}
