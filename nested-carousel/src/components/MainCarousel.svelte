<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
	import { onMount } from 'svelte';
	import type { MainCarouselProps } from '../types/carousel';
	import { createAxisWatchDrag } from './emblaGuards';
	import NestedCarousel from './NestedCarousel.svelte';

	let {
		sections,
		options,
		nestedOptions,
		kioskMode = true,
		autoplayMs = 7000,
		initialAutoplay = false
	}: MainCarouselProps = $props();

	const AUTOPLAY_IDLE_MS = 60_000;
	const defaultOptions: EmblaOptionsType = {
		axis: 'x',
		loop: false,
		containScroll: 'trimSnaps',
		align: 'start',
		watchDrag: createAxisWatchDrag('x')
	};

	let viewport: HTMLDivElement | undefined;
	let emblaApi: EmblaCarouselType | undefined;
	let selectedIndex = $state(0);
	let canPrev = $state(false);
	let canNext = $state(true);
	let autoplayEnabled = $state(false);
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;
	let idleAutoplayTimer: ReturnType<typeof setTimeout> | null = null;

	const stopAutoplay = () => {
		if (!autoplayTimer) return;
		clearInterval(autoplayTimer);
		autoplayTimer = null;
	};

	const clearIdleAutoplay = () => {
		if (!idleAutoplayTimer) return;
		clearTimeout(idleAutoplayTimer);
		idleAutoplayTimer = null;
	};

	const updateControls = () => {
		if (!emblaApi) return;
		selectedIndex = emblaApi.selectedScrollSnap();
		canPrev = emblaApi.canScrollPrev();
		canNext = emblaApi.canScrollNext();
	};

	const handleManualInteraction = () => {
		if (autoplayEnabled) {
			autoplayEnabled = false;
			stopAutoplay();
		}
		clearIdleAutoplay();
		idleAutoplayTimer = setTimeout(() => {
			autoplayEnabled = true;
			startAutoplay();
		}, AUTOPLAY_IDLE_MS);
	};

	const scrollPrev = (manual = true) => {
		if (manual) handleManualInteraction();
		emblaApi?.scrollPrev();
	};

	const scrollNext = (manual = true) => {
		if (manual) handleManualInteraction();
		emblaApi?.scrollNext();
	};

	const scrollTo = (index: number, manual = true) => {
		if (manual) handleManualInteraction();
		emblaApi?.scrollTo(index);
	};

	const startAutoplay = () => {
		stopAutoplay();
		autoplayTimer = setInterval(() => {
			if (!emblaApi) return;
			if (emblaApi.canScrollNext()) {
				scrollNext(false);
				return;
			}
			emblaApi.scrollTo(0);
		}, autoplayMs);
	};

	onMount(() => {
		if (!viewport) return;

		const mergedOptions: EmblaOptionsType = {
			...defaultOptions,
			...options,
			watchDrag: options?.watchDrag ?? defaultOptions.watchDrag
		};

		emblaApi = EmblaCarousel(viewport, mergedOptions);
		emblaApi.on('select', updateControls);
		emblaApi.on('reInit', updateControls);
		updateControls();

		autoplayEnabled = initialAutoplay;
		if (autoplayEnabled) {
			startAutoplay();
		} else {
			handleManualInteraction();
		}

		return () => {
			clearIdleAutoplay();
			stopAutoplay();
			if (!emblaApi) return;
			emblaApi.off('select', updateControls);
			emblaApi.off('reInit', updateControls);
			emblaApi.destroy();
			emblaApi = undefined;
		};
	});
</script>

<section class={`totem-stage flex flex-col justify-center ${kioskMode ? 'kiosk-mode' : ''}`}>
	<div class="min-h-0 flex-1">
		<div class="relative h-full min-h-0">
			<button
				type="button"
				class="outer-arrow absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-aido-red px-3 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-aido-red-dark sm:left-3 sm:px-3 sm:py-3 sm:text-base disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Slide principale precedente"
				onclick={() => scrollPrev()}
				disabled={!canPrev}
			>
				&larr;
			</button>

			<button
				type="button"
				class="outer-arrow absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-aido-red px-3 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-aido-red-dark sm:right-3 sm:px-3 sm:py-3 sm:text-base disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Slide principale successiva"
				onclick={() => scrollNext()}
				disabled={!canNext}
			>
				&rarr;
			</button>

			<div class="h-full min-h-0 px-12 sm:px-14">
				<div
					class="totem-content-box h-full min-h-0 overflow-hidden"
					bind:this={viewport}
					role="region"
					aria-label="Carosello principale"
					style="touch-action: pan-x pinch-zoom;"
					onpointerdown={() => handleManualInteraction()}
					onwheel={() => handleManualInteraction()}
				>
					<div class="flex h-full">
						{#each sections as section (section.id)}
							<article class="flex h-full min-h-0 w-full shrink-0 basis-full flex-col rounded-2xl bg-white p-2 sm:p-3">
								<div class="mb-2 text-center sm:mb-3">
									<h2 class="main-slide-title text-2xl font-bold text-gray-900 sm:text-3xl">{section.title}</h2>
									<p class="main-slide-subtitle mx-auto max-w-2xl text-sm text-gray-600">{section.subtitle}</p>
								</div>
								<NestedCarousel
									slides={section.subSlides}
									sectionTitle={section.title}
									options={nestedOptions}
									onInteraction={handleManualInteraction}
								/>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4 flex items-center justify-center gap-2 sm:mt-5">
			{#each sections as _, index}
				<button
					type="button"
					class={`dot-main h-3 w-3 rounded-full transition sm:h-3.5 sm:w-3.5 ${
						index === selectedIndex ? 'scale-110 bg-white' : 'bg-white/45'
					}`}
					aria-label={`Vai alla slide principale ${index + 1}`}
					onclick={() => scrollTo(index)}
				></button>
			{/each}
		</div>
	</div>
</section>
