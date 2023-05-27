import Fuse from "fuse.js";
import { computed, watch } from "vue";
import { useStargazeStorage } from "./data";

/** @param {import("vue").Ref<string>} searchTerm */
export function useFilteredStars(searchTerm) {
  const { starredRepositories } = useStargazeStorage();

  /** @type {Fuse<import("./data").StarredRepository>} */
  const fuse = new Fuse(starredRepositories.value, {
    keys: ["description", "full_name", "language", "homepage", "topics"],
  });

  watch(starredRepositories, (vals) => {
    fuse.remove(() => true);
    vals.forEach((val) => fuse.add(val));
  });

  const results = computed(() =>
    searchTerm.value
      ? fuse.search(searchTerm.value).map((val) => val.item)
      : starredRepositories.value
  );

  return results;
}
