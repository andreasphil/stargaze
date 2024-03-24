import { useStargazeStorage } from "@/data.js";
import createSearch, { startsWith } from "@andreasphil/js-inverted-index";
import { computed, ref, watch } from "vue";

export function useFilteredStars(searchTerm) {
  const { starredRepositories } = useStargazeStorage();

  const searchFn = ref(() => []);

  watch(
    starredRepositories,
    (vals) => {
      const { search, add } = createSearch({
        fields: ["description", "full_name", "language", "homepage", "topics"],
        tokenizer: startsWith,
      });

      add(vals);

      searchFn.value = search;
    },
    { immediate: true }
  );

  const results = computed(() =>
    searchTerm.value
      ? searchFn.value(searchTerm.value)
      : starredRepositories.value
  );

  return results;
}
