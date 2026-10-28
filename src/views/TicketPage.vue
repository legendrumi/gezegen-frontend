<script setup>
import { ref, onMounted, computed } from 'vue';

const airports = ref([]);
const flights = ref([]);
const loading = ref(true);

const selectedOrigin = ref('');
const selectedDestination = ref('');
const selectedDate = ref('2026-10-27');

const passengerForms = ref({});
const bookingStatus = ref({});

const filteredFlights = computed(() => {
  return flights.value.filter(flight => {
    const matchOrigin = !selectedOrigin.value || String(flight.origin_airport_id) === String(selectedOrigin.value);
    const matchDestination = !selectedDestination.value || String(flight.destination_airport_id) === String(selectedDestination.value);
    return matchOrigin && matchDestination;
  });
});

async function fetchAirports() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/airports');
    const data = await response.json();
    airports.value = data.data || data;
  } catch (error) {
    console.error('Airports could not be retrieved:', error);
  }
}

async function fetchFlights() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/flights');
    const data = await response.json();
    const allFlights = data.data || data;
    
    flights.value = allFlights.map(flight => {
      passengerForms.value[flight.id] = {
        full_name: '',
        email: '',
        phone: '',
        passenger_count: 1
      };
      return flight;
    });
  } catch (error) {
    console.error('Flights could not be retrieved:', error);
  }
}

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchAirports(), fetchFlights()]);
  loading.value = false;
});

function handleSearch(event) {
  event.preventDefault();
}

function swapAirports() {
  const temp = selectedOrigin.value;
  selectedOrigin.value = selectedDestination.value;
  selectedDestination.value = temp;
}

async function bookTicket(flight) {
  const form = passengerForms.value[flight.id];
  
  try {
    const passengerRes = await fetch('http://127.0.0.1:8000/api/v1/passengers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        passport_number: 'XY' + Math.floor(1000000 + Math.random() * 9000000)
      })
    });
    
    const passengerData = await passengerRes.json();
    const passengerId = passengerData.data?.id || passengerData.id;

    const ticketRes = await fetch('http://127.0.0.1:8000/api/v1/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        flight_id: flight.id,
        passenger_id: passengerId,
        seat_number: '12A',
        passenger_count: Number(form.passenger_count),
        total_price: Number(flight.price) * Number(form.passenger_count),
        status: 'booked'
      })
    });

    if (ticketRes.ok) {
      alert('Ticket successfully booked!');
      flight.empty_seats -= Number(form.passenger_count);
      bookingStatus.value[flight.id] = 'Success!';
    } else {
      const errData = await ticketRes.json();
      alert('Error: ' + (errData.message || 'Could not book ticket'));
    }
  } catch (error) {
    console.error('Booking failed:', error);
    alert('Booking failed due to a network error.');
  }
}
</script>

<template>
  <section class="mx-auto w-full max-w-5xl px-4 py-8 text-slate-900">
    <header class="hero relative overflow-hidden rounded-3xl px-6 pb-28 pt-12 text-center text-white sm:px-10 sm:pt-16">
      <svg class="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <path d="M-20 260Q400-120 820 200" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 10" stroke-linecap="round" />
        <path d="M-20 300Q420-40 820 120" stroke="#fff" stroke-opacity=".16" stroke-width="2" stroke-dasharray="4 10" stroke-linecap="round" />
        <path transform="translate(568 71) rotate(105) scale(1.6) translate(-12 -12)" fill="#fff" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
      <h1 class="disp relative text-5xl font-extrabold sm:text-6xl">Ticket Page</h1>
      <p class="relative mx-auto mt-4 max-w-md text-emerald-50/90">Search a route, pick a flight and book it here.</p>
    </header>

    <form @submit="handleSearch" class="relative -mt-16 mx-4 grid gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-emerald-900/10 ring-1 ring-slate-900/5 sm:mx-8 sm:p-5 lg:grid-cols-[1fr_auto_1fr_12rem_auto] lg:items-end">
      <label>
        <span class="lbl">From</span>
        <select v-model="selectedOrigin" class="fld big disp">
          <option value="">All Airports</option>
          <option v-for="airport in airports" :key="airport.id" :value="airport.id">
            {{ airport.city }} ({{ airport.code }})
          </option>
        </select>
      </label>
      <button type="button" @click="swapAirports" aria-label="Swap airports" class="grid h-12 w-12 cursor-pointer place-items-center justify-self-center rounded-full bg-emerald-50 text-emerald-700 transition duration-300 hover:rotate-180 hover:bg-emerald-600 hover:text-white motion-reduce:transition-none">
        <svg class="h-5 w-5 rotate-90 lg:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
      </button>
      <label>
        <span class="lbl">To</span>
        <select v-model="selectedDestination" class="fld big disp">
          <option value="">All Airports</option>
          <option v-for="airport in airports" :key="airport.id" :value="airport.id">
            {{ airport.city }} ({{ airport.code }})
          </option>
        </select>
      </label>
      <label>
        <span class="lbl">Date</span>
        <input v-model="selectedDate" type="date" class="fld big disp" />
      </label>
      <button type="submit" class="cta h-[3.625rem]">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        Search flights
      </button>
    </form>

    <div class="mb-5 mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
      <h2 class="disp text-2xl font-extrabold dark:text-white">Available Flights</h2>
      <span class="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-slate-200">{{ selectedDate }}</span>
      <span class="text-sm text-slate-500 sm:ml-auto">{{ filteredFlights.length }} flights</span>
    </div>

    <div v-if="loading" class="py-12 text-center text-slate-500">Loading flights and airports...</div>

    <div v-else class="space-y-5">
      <details v-for="flight in filteredFlights" :key="flight.id" name="flight" class="tk-wrap group/t">
        <summary class="tk flex cursor-pointer flex-col focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-500/40 lg:flex-row">
          <div class="flex-1 p-6 sm:p-7">
            <div class="flex flex-wrap items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-sm font-bold text-white">{{ flight.airline.substring(0, 2).toUpperCase() }}</span>
              <div>
                <p class="font-semibold text-slate-800">{{ flight.airline }}</p>
                <p class="text-sm text-slate-500">Flight {{ flight.flight_number }}</p>
              </div>
              <span class="ml-auto inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
                <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                {{ flight.empty_seats }} seats left
              </span>
            </div>
            <div class="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
              <div>
                <p class="code" role="img" :aria-label="flight.origin_airport?.code">
                  <b v-for="(char, index) in (flight.origin_airport?.code || 'JFK')" :key="index">{{ char }}</b>
                </p>
                <p class="mt-2 text-sm text-slate-500">{{ flight.origin_airport?.city }}</p>
                <p class="text-lg font-bold tabular-nums text-emerald-700">{{ flight.departure_time?.substring(11, 16) }}</p>
              </div>
              <div class="text-center">
                <div class="arc" aria-hidden="true"></div>
                <p class="text-sm font-medium text-slate-600">{{ flight.duration || '3 hr 15 min' }}</p>
                <p class="text-sm text-emerald-700">Nonstop</p>
              </div>
              <div class="text-right">
                <p class="code justify-end" role="img" :aria-label="flight.destination_airport?.code">
                  <b v-for="(char, index) in (flight.destination_airport?.code || 'LAX')" :key="index">{{ char }}</b>
                </p>
                <p class="mt-2 text-sm text-slate-500">{{ flight.destination_airport?.city }}</p>
                <p class="text-lg font-bold tabular-nums text-emerald-700">{{ flight.arrival_time?.substring(11, 16) }}</p>
              </div>
            </div>
          </div>
          <div class="stub flex items-center justify-between gap-4 border-t border-dashed border-slate-300 p-6 lg:w-48 lg:flex-col lg:items-stretch lg:justify-between lg:border-l lg:border-t-0">
            <div class="lg:text-center">
              <p class="disp text-4xl font-extrabold leading-none">${{ flight.price }}</p>
              <p class="mt-1 text-sm text-slate-500">per person</p>
            </div>
            <span class="sel w-32 lg:w-auto"><span class="group-open/t:hidden">Select</span><span class="hidden group-open/t:inline">Close</span></span>
            <div class="bars hidden lg:block" aria-hidden="true"></div>
          </div>
        </summary>

        <form @submit.prevent="bookTicket(flight)" novalidate class="rounded-b-3xl border-t border-dashed border-emerald-200 bg-emerald-50 p-6 sm:p-7">
          <h3 class="disp mb-4 flex items-center gap-2 text-lg font-bold">
            <svg class="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
            Passenger details
          </h3>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label>
              <span class="lbl">Full name</span>
              <input v-model="passengerForms[flight.id].full_name" class="fld" type="text" autocomplete="name" placeholder="John Smith" required />
            </label>
            <label>
              <span class="lbl">Email</span>
              <input v-model="passengerForms[flight.id].email" class="fld" type="email" required autocomplete="email" placeholder="you@example.com" />
              <span class="err mt-1.5 text-sm font-medium text-red-600" role="alert">Enter a valid email.</span>
            </label>
            <label>
              <span class="lbl">Phone</span>
              <input v-model="passengerForms[flight.id].phone" class="fld" type="tel" autocomplete="tel" placeholder="+1 555 000 0000" />
            </label>
            <label>
              <span class="lbl">Passengers</span>
              <input v-model.number="passengerForms[flight.id].passenger_count" class="fld" type="number" min="1" :max="flight.empty_seats" value="1" />
            </label>
          </div>
          <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-slate-500">Total</p>
              <p class="disp text-4xl font-extrabold leading-tight text-emerald-700">${{ Number(flight.price) * (passengerForms[flight.id]?.passenger_count || 1) }}</p>
              <p class="mt-1 text-sm text-slate-500">Buying drops the empty seats from {{ flight.empty_seats }} to {{ flight.empty_seats - (passengerForms[flight.id]?.passenger_count || 1) }}.</p>
            </div>
            <button type="submit" class="cta sm:px-12">Buy ticket</button>
          </div>
        </form>
      </details>
    </div>
  </section>
</template>

<style scoped>
.disp { font-family: 'Segoe UI Variable Display', 'Segoe UI', ui-rounded, -apple-system, system-ui, sans-serif; letter-spacing: -0.02em; }
.hero { background: radial-gradient(48rem 24rem at 88% -12%, rgb(94 234 212 / 0.4), transparent 60%), linear-gradient(135deg, #064e3b 0%, #047857 55%, #0f766e 100%); }
.hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgb(255 255 255 / 0.18) 1.2px, transparent 1.5px); background-size: 22px 22px; -webkit-mask-image: radial-gradient(ellipse at 25% 45%, #000, transparent 75%); mask-image: radial-gradient(ellipse at 25% 45%, #000, transparent 75%); }

.lbl { display: block; margin-bottom: 0.375rem; font-size: 0.875rem; font-weight: 500; color: #475569; }
.fld { width: 100%; border: 1px solid #e2e8f0; border-radius: 0.75rem; background-color: #fff; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 500; color: #0f172a; transition: border-color 0.2s, box-shadow 0.2s; }
.fld.big { padding: 0.9rem 1rem; font-size: 1.125rem; font-weight: 700; background-color: #f8fafc; }
.fld::placeholder { font-weight: 400; color: #94a3b8; }
.fld:focus { outline: 0; border-color: #10b981; box-shadow: 0 0 0 4px rgb(16 185 129 / 0.2); }
.fld:user-invalid { border-color: #f87171; }
select.fld { appearance: none; padding-right: 2.5rem; background-repeat: no-repeat; background-position: right 1rem center; background-size: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); }
.err { display: none; }
.fld:user-invalid ~ .err { display: block; }

.cta { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; border: 1px solid transparent; border-radius: 0.75rem; background: #059669; padding: 0.75rem 1.5rem; font-size: 0.875rem; font-weight: 600; color: #fff; box-shadow: 0 10px 22px -8px rgb(5 150 105 / 0.6); transition: background 0.2s, transform 0.1s; }
.cta:hover { background: #047857; }
.cta:active { transform: scale(0.97); }
.cta:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgb(16 185 129 / 0.4); }
.sel { display: block; border-radius: 0.75rem; background: #0f172a; padding: 0.75rem 1.25rem; text-align: center; font-size: 0.875rem; font-weight: 600; color: #fff; transition: background 0.2s, color 0.2s; }
.tk:hover .sel { background: #059669; }
.tk-wrap[open] .sel { background: #d1fae5; color: #065f46; }

.tk-wrap { --o: 0s; filter: drop-shadow(0 1px 2px rgb(15 23 42 / 0.06)) drop-shadow(0 12px 22px rgb(15 23 42 / 0.08)); transition: filter 0.3s, transform 0.25s; }
.tk-wrap:nth-child(2) { --o: 0.35s; }
.tk-wrap:not([open]):hover { transform: translateY(-3px); }
.tk-wrap[open] { filter: drop-shadow(0 22px 34px rgb(5 150 105 / 0.22)); }
.tk { list-style: none; overflow: hidden; border-radius: 1.5rem; background: #fff; }
.tk::-webkit-details-marker { display: none; }
.tk-wrap[open] .tk { border-bottom-left-radius: 0; border-bottom-right-radius: 0; box-shadow: inset 0 4px 0 #10b981; }
.stub { background: repeating-linear-gradient(135deg, rgb(16 185 129 / 0.08) 0 2px, transparent 2px 9px), #fff; }
.bars { height: 1.75rem; background: repeating-linear-gradient(90deg, #0f172a 0 2px, transparent 2px 4px, #0f172a 4px 5px, transparent 5px 9px, #0f172a 9px 12px, transparent 12px 14px); opacity: 0.8; }
@media (min-width: 1024px) {
  .tk { --x: calc(100% - 12rem);
    -webkit-mask: radial-gradient(circle 13px at var(--x) 0, #0000 97%, #000) top / 100% 51% no-repeat, radial-gradient(circle 13px at var(--x) 100%, #0000 97%, #000) bottom / 100% 51% no-repeat;
    mask: radial-gradient(circle 13px at var(--x) 0, #0000 97%, #000) top / 100% 51% no-repeat, radial-gradient(circle 13px at var(--x) 100%, #0000 97%, #000) bottom / 100% 51% no-repeat; }
  .tk-wrap[open] .tk { -webkit-mask: radial-gradient(circle 13px at var(--x) 0, #0000 97%, #000); mask: radial-gradient(circle 13px at var(--x) 0, #0000 97%, #000); }
}

.arc { height: 2.75rem; width: 100%; max-width: 16rem; margin-inline: auto;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 44' fill='none'%3E%3Cpath d='M4 40Q100-16 196 40' stroke='%236ee7b7' stroke-width='2' stroke-dasharray='2 7' stroke-linecap='round'/%3E%3Ccircle cx='4' cy='40' r='3.5' fill='%2310b981'/%3E%3Ccircle cx='196' cy='40' r='3.5' fill='%2310b981'/%3E%3Cpath transform='translate(100 12) rotate(90) translate(-12 -12)' fill='%23059669' d='M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'/%3E%3C/svg%3E") center / contain no-repeat; }

.code { display: flex; gap: 3px; }
.code b { --n: 0; display: grid; place-items: center; width: 1.75rem; height: 2.6rem; border-radius: 0.4rem; color: #fff; font: 800 1.4rem/1 ui-monospace, 'Cascadia Mono', 'SF Mono', Consolas, monospace;
  background: linear-gradient(#1e293b 0 49%, #020617 49% 51%, #0f1b30 51%); box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.14), 0 2px 4px rgb(15 23 42 / 0.25);
  animation: flip 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: calc(var(--o) + var(--n) * 70ms); }
.code b:nth-child(2) { --n: 1; }
.code b:nth-child(3) { --n: 2; }
@media (min-width: 640px) { .code b { width: 2.25rem; height: 3.25rem; font-size: 1.9rem; } }
@keyframes flip { from { transform: perspective(300px) rotateX(-90deg); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .code b { animation: none; } }

details { interpolate-size: allow-keywords; }
details::details-content { block-size: 0; overflow: hidden; transition: block-size 0.35s ease, content-visibility 0.35s allow-discrete; }
details[open]::details-content { block-size: auto; }
@media (prefers-reduced-motion: reduce) { details::details-content { transition: none; } .tk-wrap { transition: filter 0.3s; } }
</style>
