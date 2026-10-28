<script setup>
import ToggleDarkMode from '../common/ToggleDarkMode.vue';
</script>

<template>
    <div class="container mx-auto pt-4 px-3">
        <header
            class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <Routerlink to="/" class="text-md font-semibold text-gray-900 dark:text-white">
                GBM
            </Routerlink>
            <ul class="flex mr-auto">
                <li class="text-md font-semibold hover:font-bold dark:text-white mx-4">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="text-md font-semibold hover:font-bold dark:text-white mx-4">
                    <RouterLink to="/hotels">Hotels</RouterLink>
                </li>
                <li class="text-md font-semibold hover:font-bold dark:text-white mx-4">
                    <RouterLink to="/tickets">Tickets</RouterLink>
                </li>
                <li class="text-md font-semibold hover:font-bold dark:text-white mx-4">
                    <RouterLink to="/about">About</RouterLink>
                </li>
            </ul>
            <ToggleDarkMode />
        </header>
    </div>
</template>

<style scoped></style>
