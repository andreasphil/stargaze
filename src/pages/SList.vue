<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStargazeStorage } from "../lib/data";
import { useFilteredStars } from "../lib/search";

/* -------------------------------------------------- *
 * API data                                           *
 * -------------------------------------------------- */

const { avatarUrl, signOut, fetchStarredRepositories, isLoading, hasError } =
  useStargazeStorage();

onMounted(() => fetchStarredRepositories());

/* -------------------------------------------------- *
 * Searching                                          *
 * -------------------------------------------------- */

const searchTerm = ref("");
const inputEl = ref();

function onSearchHotkey(event) {
  if (event.key === "/" && inputEl.value) {
    event.preventDefault();
    inputEl.value.focus();
  }
}

onMounted(() => addEventListener("keydown", onSearchHotkey));
onUnmounted(() => removeEventListener("keydown", onSearchHotkey));

const starredRepositories = useFilteredStars(searchTerm);

const firstResultLink = computed(() => starredRepositories.value[0]?.html_url);

function jumpToFirstResult(targetBlank) {
  if (!firstResultLink.value) return;
  window.open(firstResultLink.value, targetBlank ? "_blank" : "_self");
}
</script>

<template>
  <div data-nav="fixed">
    <header>
      <nav data-variant="fixed" :class="[$style.header]">
        <img
          v-if="avatarUrl"
          :class="[$style.avatar]"
          :src="avatarUrl"
          alt=""
          height="48"
          width="48"
        />

        <input
          :class="[$style.searchInput]"
          @keydown.enter.stop="jumpToFirstResult($event.metaKey)"
          aria-label="Search"
          placeholder="Search ..."
          ref="inputEl"
          type="search"
          v-model="searchTerm"
        />

        <button
          :class="[$style.signOutBtn]"
          @click="signOut()"
          data-variant="muted"
          type="button"
        >
          👋 Leave
        </button>
      </nav>
    </header>

    <!-- Stars list -->
    <main data-container>
      <ul v-if="starredRepositories?.length" :class="[$style.starsList]">
        <li
          v-for="(s, i) in starredRepositories"
          :class="[$style.starsListItem]"
          :key="s.id"
        >
          <a
            :href="s.html_url"
            :class="[$style.star]"
            :ref="(el) => i === 0 && (firstResult = el)"
          >
            <img
              :class="[$style.starIcon]"
              :src="s.owner.avatar_url"
              alt=""
              height="56"
              loading="lazy"
              width="56"
            />
            <span>
              <strong :class="[$style.starName]">@{{ s.full_name }}</strong>
              <small :class="[$style.starDescription]">{{
                s.description
              }}</small>
            </span>
          </a>
        </li>
      </ul>

      <!-- Empty state -->
      <div v-else :class="[$style.empty]">
        <h3>😵‍💫</h3>
        <p>Sorry, couldn&rsquo;t find anything.</p>
      </div>

      <!-- Status notification -->
      <div :class="[$style.statusLayout]">
        <Transition name="slide">
          <div
            v-if="isLoading || hasError"
            :class="[$style.status]"
            :aria-busy="isLoading"
          >
            <small :class="[$style.statusLabel]">
              <template v-if="!hasError">Fetching your stuff ...</template>
              <template v-else>🚨 Couldn&rsquo;t fetch your stars!</template>
            </small>
          </div>
        </Transition>
      </div>
    </main>
  </div>
</template>

<style module>
.header {
  box-shadow: var(--shadow-elevation-medium);
  flex-wrap: nowrap;
}

.avatar {
  background: var(--c-surface-variant-bg);
  border-radius: 100%;
  flex: none;
  height: 3rem;
  padding: 2px;
  width: 3rem;
}

.searchInput {
  width: initial;
  min-width: 6rem;
}

.signOutBtn {
  flex: none;
}

.starsList {
  padding: 0;
  margin: 0;
}

.starsListItem {
  list-style-type: none;
}

.star {
  align-items: center;
  border-radius: var(--border-radius-large);
  border: var(--border-width-large) solid transparent;
  display: flex;
  gap: 1rem;
  margin: 0 -0.5rem;
  outline: none;
  padding: 0.5rem;
  text-decoration: none;
  transition: var(--transition);
  transition-property: background-color, color;
}
.star:hover {
  background: var(--c-surface-variant-bg);
}
.star:focus {
  border-color: var(--primary);
}
.star:focus:hover {
  background: var(--primary-50);
}

.starIcon {
  background: var(--c-surface-variant-bg);
  border-radius: 100%;
  flex: none;
  height: 3.5rem;
  overflow: clip;
  padding: 2px;
  width: 3.5rem;
}

.starName {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.starDescription {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--c-fg-variant);
}

.empty {
  border: var(--border-width) dashed var(--c-border);
  border-radius: var(--border-radius);
  color: var(--c-fg-variant);
  padding: 2.5rem 1.5rem;
  text-align: center;
}
.empty * {
  margin: 0.5rem 0;
}

.statusLayout {
  bottom: var(--body-padding-y);
  display: flex;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  right: 0;
}

.status {
  background: var(--c-surface-bg);
  border-radius: 9999px;
  box-shadow: var(--shadow-elevation-high);
  color: var(--primary);
  padding: 0.75rem 1.125rem;
  pointer-events: auto;
}

.statusLabel {
  color: var(--c-surface-fg);
  font-weight: var(--font-weight-medium);
}
</style>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: 0.1s ease;
  transition-property: transform, opacity;
}

.slide-enter-from,
.slide-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
