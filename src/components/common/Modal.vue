<script setup>
const props = defineProps({
    modalVar: Boolean // modalVar = true
})

const emit = defineEmits(["close"]);
</script>

<template>
    <div v-if="props.modalVar" @click.self="emit('close')"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <div class="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Modal Title</h3>
                <button type="button" aria-label="Close"
                    class="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"
                        aria-hidden="true">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg></button>
            </div>
            <div class="py-4">
                <p class="text-sm text-gray-600 dark:text-gray-300">This is a clean and accessible modal dialog built
                    completely with Tailwind utility classes.</p>
            </div>
            <div class="flex justify-end gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                <button type="button" @click="emit('close')"
                    class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Cancel</button>
                <button type="button"
                    class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Confirm</button>
            </div>
        </div>
    </div>
</template>