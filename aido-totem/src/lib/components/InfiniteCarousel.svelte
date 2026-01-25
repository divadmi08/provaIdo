<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Component } from 'svelte';
	import { browser } from '$app/environment';

	/* =========================
     PROPS
  ========================== */
	let { pages = [] } = $props<{ pages: Array<() => Promise<any>> }>();

	/* =========================
     STATE
  ========================== */
	let currentPageIndex = $state(0);
	let loadedComponents = $state<Map<number, Component>>(new Map());
	let isAutoScrolling = $state(false);

	/* =========================
     AUTO SCROLL / INACTIVITY
  ========================== */
	const INACTIVITY_THRESHOLD = 30 * 1000; // 30 secondi per test (cambia a 2 * 60 * 1000 per produzione)
	const AUTO_SCROLL_INTERVAL = 10 * 1000; // 10 secondi per test (cambia a 1 * 60 * 1000 per produzione)

	let inactivityTimeoutId: ReturnType<typeof setTimeout> | null = null;
	let autoScrollIntervalId: ReturnType<typeof setInterval> | null = null;

	/* =========================
     LAZY LOAD PAGE
  ========================== */
	async function loadCurrentPage() {
		if (!browser || pages.length === 0 || loadedComponents.has(currentPageIndex)) return;

		try {
			const loader = pages[currentPageIndex];
			const module = await loader();
			const newMap = new Map(loadedComponents);
			newMap.set(currentPageIndex, module.default);
			loadedComponents = newMap;
		} catch (error) {
			console.error('Errore nel caricamento della pagina:', error);
		}
	}

	$effect(() => {
		if (browser) {
			loadCurrentPage();
		}
	});

	/* =========================
     INACTIVITY LOGIC
  ========================== */
	function startInactivityTimer() {
		if (!browser) return;

		if (inactivityTimeoutId) clearTimeout(inactivityTimeoutId);
		
		console.log('⏱️ Timer inattività avviato:', INACTIVITY_THRESHOLD / 1000, 'secondi');
		
		inactivityTimeoutId = setTimeout(() => {
			console.log('⚡ Timeout inattività raggiunto - avvio auto-scroll');
			startAutoScroll();
		}, INACTIVITY_THRESHOLD);
	}

	function resetInactivityTimer() {
		if (!browser) return;

		console.log('🔄 Reset timer inattività');
		stopAutoScroll();
		startInactivityTimer();
	}

	/* function startAutoScroll() {
		if (!browser || pages.length <= 1) return;

		console.log('▶️ AUTO-SCROLL ATTIVATO - intervallo:', AUTO_SCROLL_INTERVAL / 1000, 'secondi');
		isAutoScrolling = true;
		
		if (autoScrollIntervalId) clearInterval(autoScrollIntervalId);

		autoScrollIntervalId = setInterval(() => {
			console.log('➡️ Auto-scroll: prossima pagina');
			nextPage(false);
		}, AUTO_SCROLL_INTERVAL);
	} */

	function stopAutoScroll() {
		if (!browser) return;

		if (isAutoScrolling) {
			console.log('⏸️ AUTO-SCROLL DISATTIVATO');
		}
		
		isAutoScrolling = false;
		if (autoScrollIntervalId) {
			clearInterval(autoScrollIntervalId);
			autoScrollIntervalId = null;
		}
	}

	/* =========================
     NAVIGATION
  ========================== */
	function nextPage(fromUser = true) {
		if (fromUser) {
			console.log('👆 Click utente: prossima pagina');
			resetInactivityTimer();
		} else {
			console.log('🤖 Auto-scroll: prossima pagina');
		}
		currentPageIndex = (currentPageIndex + 1) % pages.length;
	}

	function prevPage(fromUser = true) {
		if (fromUser) {
			console.log('👆 Click utente: pagina precedente');
			resetInactivityTimer();
		}
		currentPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (!browser) return;

		resetInactivityTimer();

		if (event.key === 'ArrowLeft') {
			prevPage(true);
			event.preventDefault();
		} else if (event.key === 'ArrowRight') {
			nextPage(true);
			event.preventDefault();
		}
	}

	/* =========================
     LIFECYCLE
  ========================== */
	onMount(() => {
		if (!browser) return;

		console.log('🚀 InfiniteCarousel montato');
		console.log('📄 Numero pagine:', pages.length);
		console.log('⏱️ Inattività threshold:', INACTIVITY_THRESHOLD / 1000, 'sec');
		console.log('⏱️ Auto-scroll interval:', AUTO_SCROLL_INTERVAL / 1000, 'sec');

		if (pages.length > 0) {
			loadCurrentPage();
		}

		resetInactivityTimer();

		window.addEventListener('mousemove', resetInactivityTimer);
		window.addEventListener('mousedown', resetInactivityTimer);
		window.addEventListener('touchstart', resetInactivityTimer);
		window.addEventListener('keydown', handleGlobalKeydown);
	});

	onDestroy(() => {
		if (!browser) return;

		console.log('🧹 InfiniteCarousel smontato - pulizia');
		
		if (inactivityTimeoutId) clearTimeout(inactivityTimeoutId);
		if (autoScrollIntervalId) clearInterval(autoScrollIntervalId);

		window.removeEventListener('mousemove', resetInactivityTimer);
		window.removeEventListener('mousedown', resetInactivityTimer);
		window.removeEventListener('touchstart', resetInactivityTimer);
		window.removeEventListener('keydown', handleGlobalKeydown);
	});
</script>

<svelte:head>
	<style>
		body {
			overflow: hidden;
		}
	</style>
</svelte:head>

<!-- =========================
     TEMPLATE
========================== -->

<div
	class="infinite-carousel relative h-full w-full overflow-hidden"
	role="region"
	aria-label="Carousel"
>
	<div
		class="carousel-track ease-in-out flex transition-transform duration-500"
		style="transform: translateX(-{currentPageIndex * 100}%);"
	>
		{#each pages as _, i}
			<div
				class="carousel-page h-full w-full flex-none"
				aria-hidden={i !== currentPageIndex}
				aria-current={i === currentPageIndex}
				aria-roledescription="slide"
				tabindex="-1"
			>
				{#if loadedComponents.has(i)}
					{@const Component = loadedComponents.get(i)}
					{#if Component}
						<Component />
					{/if}
				{:else if i === currentPageIndex}
					<div class="flex h-full w-full items-center justify-center">Caricamento…</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- CONTROLLI -->
	<button
		class="left-2 sm:left-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-4 text-xl sm:text-2xl absolute top-1/2 z-10 -translate-y-1/2 rounded-full transition-colors"
		onclick={() => prevPage(true)}
		aria-label="Pagina precedente"
		type="button"
	>
		&#10094;
	</button>

	<button
		class="right-2 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-4 text-xl sm:text-2xl absolute top-1/2 z-10 -translate-y-1/2 rounded-full transition-colors"
		onclick={() => nextPage(true)}
		aria-label="Pagina successiva"
		type="button"
	>
		&#10095;
	</button>

	<!-- STATUS -->
	<div
		class="bottom-2 sm:bottom-4 bg-gray-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 absolute left-1/2 z-10 -translate-x-1/2 rounded-full"
	>
		{#if isAutoScrolling}
			<span class="inline-flex items-center gap-2">
				<span class="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
				Auto-scrolling ON
			</span>
		{:else}
			<span class="inline-flex items-center gap-2">
				<span class="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
				Interazione utente
			</span>
		{/if}
	</div>

	<div class="sr-only" aria-live="polite">
		Pagina {currentPageIndex + 1} di {pages.length}.
	</div>
</div>

<style>
	.infinite-carousel {
		width: 100%;
		height: 100%;
	}

	.carousel-track {
		height: 100%;
	}

	.carousel-page {
		height: 100%;
	}
</style>