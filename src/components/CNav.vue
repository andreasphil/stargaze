<template>
  <nav class="container flex px-4 my-4">
    <div v-if="$slots.left" class="flex-1 flex items-center">
      <slot name="left" />
    </div>
    <div v-if="$slots.right" class="flex-1 flex items-center justify-end">
      <slot name="right" />
    </div>
  </nav>
</template>
