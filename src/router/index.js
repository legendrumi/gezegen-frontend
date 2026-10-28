import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import HotelPage from '../views/HotelPage.vue';
import TicketPage from '../views/TicketPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/hotels',
        name: 'hotels',
        component: HotelPage
    },
    {
        path: '/tickets',
        name: 'tickets',
        component: TicketPage
    },
    {
        path: '/about',
        name: 'about',
        component: AboutPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
