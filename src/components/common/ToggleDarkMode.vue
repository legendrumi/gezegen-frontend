<script setup>
import { ref, onMounted } from 'vue'
import { Moon, Sun } from '@lucide/vue'

const isDark = ref(false)

function toggleDarkMode() {
    isDark.value = !isDark.value

    document.documentElement.classList.toggle(
        'dark',
        isDark.value
    )

    localStorage.setItem(
        'theme',
        isDark.value ? 'dark' : 'light'
    )
}

onMounted(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }
})
</script>

<template>
    <button @click="toggleDarkMode"
        class="relative h-8 w-16 rounded-full bg-gray-200 transition-colors dark:bg-gray-700">
        <div class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center 
        rounded-full bg-gray-200 dark:bg-gray-700 
        transition-transform" :class="{ 'translate-x-8': isDark }">
            <span v-if="isDark">
                <Moon fill="#FFF" color="#FFF" />
            </span>
            <span v-else>
                <Sun fill="#EAB308" color="#EAB308" />
            </span>
        </div>
    </button>
</template>