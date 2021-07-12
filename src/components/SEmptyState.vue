<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      -mx-4
      h-24
      bg-gray-50
      normal:rounded-lg
    "
  >
    <slot name="icon" />
    <p class="mt-1">
      <slot name="message" />
    </p>
  </div>
</template>
