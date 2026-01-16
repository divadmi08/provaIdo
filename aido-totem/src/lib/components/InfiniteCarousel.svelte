<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { Component } from "svelte";
  import { browser } from "$app/environment";

  /* =========================
     PROPS
  ========================== */

  // Array di funzioni che caricano componenti in modo lazy
  export let pages: (() => Promise<{ default: Component } | Component>)[];

  /* =========================
     STATE
  ========================== */

  let currentPageIndex = 0;
  let LoadedComponent: Component | null = null;
  let lastLoadedIndex = -1;
  let loadedComponents: Map<number, Component> = new Map();

  /* =========================
     AUTO SCROLL / INACTIVITY
  ========================== */

  const INACTIVITY_THRESHOLD = 2 * 60 * 1000; // 2 minuti
  const AUTO_SCROLL_INTERVAL = 1 * 60 * 1000; // 1 minuto

  let inactivityTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let autoScrollIntervalId: ReturnType<typeof setInterval> | null = null;
  let isAutoScrolling = false;

  /* =========================
     LAZY LOAD PAGE
  ========================== */

  async function loadCurrentPage() {
    if (currentPageIndex === lastLoadedIndex || !browser || pages.length === 0) return;

    // Se il componente è già caricato, usalo
    if (loadedComponents.has(currentPageIndex)) {
      LoadedComponent = loadedComponents.get(currentPageIndex)!;
      lastLoadedIndex = currentPageIndex;
      return;
    }

    lastLoadedIndex = currentPageIndex;
    LoadedComponent = null;

    try {
      const loader = pages[currentPageIndex];
      const module = await loader();
      const component = ('default' in module ? module.default : module) as Component;
      LoadedComponent = component;
      loadedComponents.set(currentPageIndex, component);
    } catch (error) {
      console.error('Errore nel caricamento della pagina:', error);
      LoadedComponent = null;
    }
  }

  // 🔥 REATTIVITÀ CORRETTA - deve reagire a currentPageIndex
  $: {
    if (browser && pages.length > 0 && currentPageIndex !== lastLoadedIndex) {
      loadCurrentPage();
    }
  }

  /* =========================
     INACTIVITY LOGIC
  ========================== */

  function startInactivityTimer() {
    if (!browser) return;

    clearTimeout(inactivityTimeoutId!);
    inactivityTimeoutId = setTimeout(startAutoScroll, INACTIVITY_THRESHOLD);
  }

  function resetInactivityTimer() {
    if (!browser) return;

    stopAutoScroll();
    startInactivityTimer();
  }

  function startAutoScroll() {
    if (!browser || pages.length <= 1) return;

    isAutoScrolling = true;
    clearInterval(autoScrollIntervalId!);

    autoScrollIntervalId = setInterval(() => {
      nextPage(false);
    }, AUTO_SCROLL_INTERVAL);
  }

  function stopAutoScroll() {
    if (!browser) return;

    isAutoScrolling = false;
    clearInterval(autoScrollIntervalId!);
    autoScrollIntervalId = null;
  }

  /* =========================
     NAVIGATION
  ========================== */

  function nextPage(fromUser = true) {
    if (fromUser) resetInactivityTimer();
    currentPageIndex = (currentPageIndex + 1) % pages.length;
  }

  function prevPage(fromUser = true) {
    if (fromUser) resetInactivityTimer();
    currentPageIndex =
      (currentPageIndex - 1 + pages.length) % pages.length;
  }

  function handleGlobalKeydown(event: KeyboardEvent) {
    if (!browser) return;

    resetInactivityTimer();

    if (event.key === "ArrowLeft") {
      prevPage(true);
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      nextPage(true);
      event.preventDefault();
    }
  }

  /* =========================
     LIFECYCLE
  ========================== */

  onMount(() => {
    if (!browser) return;

    // Carica la prima pagina
    if (pages.length > 0) {
      loadCurrentPage();
    }

    resetInactivityTimer();

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("mousedown", resetInactivityTimer);
    window.addEventListener("touchstart", resetInactivityTimer);
    window.addEventListener("keydown", handleGlobalKeydown);
  });

  onDestroy(() => {
    if (!browser) return;

    clearTimeout(inactivityTimeoutId!);
    clearInterval(autoScrollIntervalId!);

    window.removeEventListener("mousemove", resetInactivityTimer);
    window.removeEventListener("mousedown", resetInactivityTimer);
    window.removeEventListener("touchstart", resetInactivityTimer);
    window.removeEventListener("keydown", handleGlobalKeydown);
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
  class="infinite-carousel w-full h-full relative overflow-hidden"
  role="region"
  aria-label="Carousel"
>
  <div
    class="carousel-track flex transition-transform duration-500 ease-in-out"
    style="transform: translateX(-{currentPageIndex * 100}%);"
  >
    {#each pages as _, i}
      <div
        class="carousel-page flex-none w-full h-full"
        aria-hidden={i !== currentPageIndex}
        aria-current={i === currentPageIndex}
        aria-roledescription="slide"
        tabindex="-1"
      >
        {#if i === currentPageIndex}
          {#if loadedComponents.has(i)}
            <svelte:component this={loadedComponents.get(i)!} />
          {:else if LoadedComponent && lastLoadedIndex === i}
            <svelte:component this={LoadedComponent} />
          {:else}
            <div class="w-full h-full flex items-center justify-center">
              Caricamento…
            </div>
          {/if}
        {:else if loadedComponents.has(i)}
          <svelte:component this={loadedComponents.get(i)!} />
        {:else}
          <div class="w-full h-full"></div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- CONTROLLI -->

  <button
    class="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-4 rounded-full z-10 text-xl sm:text-2xl transition-colors"
    on:click={() => prevPage(true)}
    aria-label="Pagina precedente"
    type="button"
  >
    &#10094;
  </button>

  <button
    class="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-4 rounded-full z-10 text-xl sm:text-2xl transition-colors"
    on:click={() => nextPage(true)}
    aria-label="Pagina successiva"
    type="button"
  >
    &#10095;
  </button>

  <!-- STATUS -->

  <div
    class="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full z-10"
  >
    {isAutoScrolling
      ? "Auto-scrolling ON"
      : "Auto-scrolling OFF (inattività)"}
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
