<script setup>
// import { ref, onMounted, computed } from 'vue';

// const modalVar = ref(false);

// function modalToggle() {
//     modalVar.value = !modalVar.value;
// }

// const hotels = ref([]);
// const loading = ref(true);
// const searchStars = ref('');

// const filteredHotels = computed(() => {
//     if (!searchStars.value) {
//         return hotels.value;
//     }
//     const starNum = Number(searchStars.value);
//     return hotels.value.filter(hotel => hotel.stars === starNum);
// });

// onMounted(async () => {
//   try {
//     const response = await fetch('http://192.168.3.186:8000/api/hotels');
//     const data = await response.json();
//     hotels.value = data.data || data;
//   } catch (error) {
//     console.error('Data could not be retrieved:', error);
//   } finally {
//     loading.value = false;
//   }
// });
</script>

<template>
    <div class="text-4xl text-center font-black mt-4 dark:text-white">
        Hotels Page
    </div>

    <!-- <div class="max-w-xl mx-auto mt-8 p-4">
        <h3 class="text-xl font-bold mb-4 dark:text-white">Laravel(Datas) Sahypasy:</h3>
        
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Stars (1 - 5):
            </label>
            <input 
                v-model="searchStars" 
                type="number" 
                min="1" 
                max="5" 
                placeholder="Enter stars (1-5)" 
                class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
        </div>
        
        <p v-if="loading" class="text-gray-500">Loading...</p>

        <div v-else-if="filteredHotels.length > 0" class="space-y-3">
            <div v-for="hotel in filteredHotels" :key="hotel.id" class="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h4 class="font-semibold text-gray-700 dark:text-gray-200"><strong>Name:</strong> {{ hotel.name }}</h4>
                <h4 class="font-semibold text-gray-700 dark:text-gray-200"><strong>Stars:</strong> {{ hotel.stars }}</h4>
            </div>
        </div>

        <p v-else class="text-gray-500">There is nothing.</p>
    </div> -->

    <Modal :modalVar="modalVar" @close="modalToggle" />
</template>

<style scoped></style>
