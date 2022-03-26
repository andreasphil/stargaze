<template>
  <header
    class="fixed top-0 left-0 right-0 h-20 flex items-center px-4 shadow-medium bg-$c-surface-bg"
    f-transition
  >
    <nav f-container class="w-full flex-nowrap">
      <div v-if="$slots.left" class="flex flex-nowrap items-center flex-auto">
        <slot name="left" />
      </div>

      <div v-if="$slots.right" class="flex flex-nowrap items-center flex-none">
        <slot name="right" />
      </div>
    </nav>
  </header>
</template>
