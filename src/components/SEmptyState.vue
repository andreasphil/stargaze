<template>
  <div
    class="flex flex-col rounded-$large-border-radius border-dashed border-2 border-$c-border py-10 px-6 w-full"
  >
    <slot name="icon" />
    <span class="mt-2 text-center text-$c-fg-variant">
      <slot name="message" />
    </span>
  </div>
</template>
