<template>
  <li
    class="flex items-center px-4 h-24 normal:border border-transparent space-x-3"
  >
    <!-- Icon -->
    <div class="skeleton w-14 h-14"></div>

    <div class="title-width flex-1 space-y-2">
      <!-- Author and name -->
      <h2>
        <div class="skeleton skeleton--text w-1/2"></div>
      </h2>
      <!-- Description and website -->
      <div>
        <div class="skeleton skeleton--text w-3/4"></div>
      </div>
    </div>
  </li>
</template>

<style lang="postcss" scoped>
.skeleton {
  @apply bg-gray-100 rounded;
}

.skeleton--text {
  @apply h-4;
}
</style>
