<script setup>
import Modal from '@/components/common/Modal.vue';
import { ref } from 'vue';

const modalVar = ref(false);

function modalToggle() {
    modalVar.value = ! modalVar.value
}

</script>

<template>
    <div class="text-4xl text-center font-black mt-4 dark:text-white">
        Home Page
    </div>
    <div class="text-center mt-8">
        <button @click="modalToggle()" type="button"
            class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950">
            Click Me
        </button>
    </div>

    <Modal :modalVar="modalVar" @close="modalToggle" />
</template>

<style scoped></style>
