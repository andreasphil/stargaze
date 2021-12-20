<template>
  <div
    class="flex -mx-4 text-gray-100 bg-gradient-to-br from-gray-700 to-gray-900 normal:rounded-lg overflow-hidden"
  >
    <span class="flex items-center p-4 bg-gray-900">
      <slot name="icon" />
    </span>
    <span class="p-4">
      <slot name="message" />
    </span>
  </div>
</template>
