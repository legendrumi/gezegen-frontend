<!-- <script setup></script>

<template></template>

<style scoped></style> -->

<!-- <script setup>
import Modal from '@/components/common/Modal.vue';
import { ref, onMounted } from 'vue';

const modalVar = ref(false);

function modalToggle() {
    modalVar.value = !modalVar.value;
}

const rooms = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/rooms');
    rooms.value = await response.json();
  } catch (error) {
    console.error('Data could not be retrieved:', error);
  } finally {
    loading.value = false;
  }
});
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

    <div class="max-w-xl mx-auto mt-8 p-4">
        <h3 class="text-xl font-bold mb-4 dark:text-white">Laravel(Datas) Sahypasy:</h3>
        
        <p v-if="loading" class="text-gray-500">Loading...</p>

        <div v-else-if="rooms.length > 0" class="space-y-3">
            <div v-for="room in rooms" :key="room.id" class="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h4 class="font-semibold text-gray-700 dark:text-gray-200">{{ room.room_type }}</h4>
            </div>
        </div>

        <p v-else class="text-gray-500">There is nothing.</p>
    </div>

    <Modal :modalVar="modalVar" @close="modalToggle" />
</template>

<style scoped></style> -->


<!-- <script setup>
import Modal from '@/components/common/Modal.vue';
import { ref, onMounted } from 'vue';

const modalVar = ref(false);

function modalToggle() {
    modalVar.value = !modalVar.value;
}

const cities = ref([]);
const rooms = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://192.168.3.186:8000/api/cities');
    const data = await response.json();
    cities.value = data.data || data;
  } catch (error) {
    console.error('Data could not be retrieved:', error);
  }
});
onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/rooms');
    const data = await response.json();
    rooms.value = data.data || data;
  } catch (error) {
    console.error('Data could not be retrieved:', error);
  }
});
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

    <div class="max-w-xl mx-auto mt-8 p-4">
        <h3 class="text-xl font-bold mb-4 dark:text-white">Laravel(Datas) Sahypasy:</h3>
        
        <p v-if="loading" class="text-gray-500">Loading...</p>

        <div v-else-if="cities.length > 0" class="space-y-3">
            <div v-for="city in cities" :key="city.id" class="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h4 class="font-semibold text-gray-700 dark:text-gray-200">{{ city.name }}</h4>
            </div>
        </div>

        <p v-else class="text-gray-500">There is nothing.</p>
    </div>

    <div class="max-w-xl mx-auto mt-8 p-4">
        <h3 class="text-xl font-bold mb-4 dark:text-white">Laravel(Datas) Sahypasy:</h3>
        
        <p v-if="loading" class="text-gray-500">Loading...</p>

        <div v-else-if="rooms.length > 0" class="space-y-3">
            <div v-for="room in rooms" :key="room.id" class="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h4 class="font-semibold text-gray-700 dark:text-gray-200">{{ room.room_type }}</h4>
            </div>
        </div>

        <p v-else class="text-gray-500">There is nothing.</p>
    </div>

    <Modal :modalVar="modalVar" @close="modalToggle" />
</template>

<style scoped></style> -->
