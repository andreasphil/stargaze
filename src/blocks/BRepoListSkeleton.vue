<template>
  <li>
    <div
      class="
        h-full
        bg-white
        rounded-lg
        border
        border-transparent
        text-sm
      "
    >
      <!-- Header -->
      <div class="flex items-center m-4 space-x-4">
        <!-- Icon -->
        <div class="skeleton w-16 h-16"></div>

        <!-- Author and name -->
        <div class="flex-grow space-y-2">
          <div class="skeleton skeleton--text w-1/2"></div>
          <div class="skeleton skeleton--text w-3/4"></div>
        </div>
      </div>

      <!-- Content -->
      <div class="m-4 mt-6 h-16 overflow-hidden space-y-2">
        <div class="skeleton skeleton--text w-full"></div>
        <div class="skeleton skeleton--text w-full"></div>
        <div class="skeleton skeleton--text w-1/4"></div>
      </div>

      <!-- Footer -->
      <div>
        <span class="m-4 inline-block w-1/5">
          <span class="skeleton skeleton--text inline-block w-full"></span>
        </span>
        <span class="m-4 inline-block w-1/3">
          <span class="skeleton skeleton--text inline-block w-full"></span>
        </span>
      </div>
    </div>
  </li>
</template>

<style lang="postcss" scoped>
.skeleton {
  @apply rounded bg-gray-100;
  animation: 0.75s ease-in infinite alternate pulse;
}

.skeleton--text {
  @apply h-4;
}

@keyframes pulse {
  to {
    @apply opacity-25;
  }
}
</style>
