import { ref, computed } from "vue";

export function useDataTable<T extends Record<string, any>>(rows: T[]) {
  const search = ref("");
  const currentPage = ref(1);
  const perPage = ref(5);
  const data = ref(rows);

  const sortKey = ref<string | null>(null);
  const sortOrder = ref<"asc" | "desc">("asc");

  watch(search, () => {
    currentPage.value = 1;
  });

  const filtered = computed(() => {
    if (!search.value) return data.value;
    return (data.value ?? []).filter((item: any) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.value.toLowerCase())
      )
    );
  });

  const sorted = computed(() => {
    if (!sortKey.value) return filtered.value;

    return [...filtered.value].sort((a, b) => {
      const aVal = a[sortKey.value!];
      const bVal = b[sortKey.value!];

      if (aVal === undefined || bVal === undefined) return 0;

      const aStr = typeof aVal === "string" ? aVal.toLowerCase() : aVal;
      const bStr = typeof bVal === "string" ? bVal.toLowerCase() : bVal;

      if (aStr < bStr) return sortOrder.value === "asc" ? -1 : 1;
      if (aStr > bStr) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  });

  const totalPages = computed(() =>
    Math.ceil(sorted.value.length / perPage.value)
  );

  const paginatedRows = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return sorted.value.slice(start, start + perPage.value);
  });

  const goToNext = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const goToPrev = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  function toggleSort(key: string) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }
  }

  function exportData() {
    const csv = sorted.value
      .map((obj) => Object.values(obj).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    search,
    currentPage,
    perPage,
    totalPages,
    paginatedRows,
    goToNext,
    goToPrev,
    exportData,
    filtered,
    sortKey,
    sortOrder,
    toggleSort,
  };
}

export default useDataTable;
