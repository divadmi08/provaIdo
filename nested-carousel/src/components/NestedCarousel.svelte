<script lang="ts">
	import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
	import { onMount } from 'svelte';
	import type { NestedCarouselProps } from '../types/carousel';
	import { createAxisWatchDrag } from './emblaGuards';
	import CarouselSlide from './CarouselSlide.svelte';

	let { slides, sectionTitle, options, onInteraction }: NestedCarouselProps = $props();

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

	const updateControls = () => {
		if (!emblaApi) return;
		selectedIndex = emblaApi.selectedScrollSnap();
		canPrev = emblaApi.canScrollPrev();
		canNext = emblaApi.canScrollNext();
	};

	const notifyInteraction = () => onInteraction?.();
	const scrollPrev = () => {
		notifyInteraction();
		emblaApi?.scrollPrev();
	};
	const scrollNext = () => {
		notifyInteraction();
		emblaApi?.scrollNext();
	};
	const scrollTo = (index: number) => {
		notifyInteraction();
		emblaApi?.scrollTo(index);
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

		return () => {
			if (!emblaApi) return;
			emblaApi.off('select', updateControls);
			emblaApi.off('reInit', updateControls);
			emblaApi.destroy();
			emblaApi = undefined;
		};
	});
</script>

<div class="flex h-full min-h-0 flex-col">
	<div class="relative min-h-0 flex-1">
		<button
			type="button"
			class="inner-arrow absolute top-1/2 left-10 z-30 -translate-x-1/3 -translate-y-1/2 rounded-full border-2 border-black bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow transition hover:bg-gray-100 sm:left-12 sm:text-base disabled:cursor-not-allowed disabled:opacity-50"
			aria-label={`Sotto-slide precedente di ${sectionTitle}`}
			onclick={scrollPrev}
			disabled={!canPrev}
		>
			&lt;
		</button>

		<button
			type="button"
			class="inner-arrow absolute top-1/2 right-10 z-30 translate-x-1/3 -translate-y-1/2 rounded-full border-2 border-black bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow transition hover:bg-gray-100 sm:right-12 sm:text-base disabled:cursor-not-allowed disabled:opacity-50"
			aria-label={`Sotto-slide successiva di ${sectionTitle}`}
			onclick={scrollNext}
			disabled={!canNext}
		>
			&gt;
		</button>

		<div class="h-full min-h-0 px-10 sm:px-12">
			<div class="relative min-h-0 h-full overflow-hidden rounded-2xl border border-gray-200 bg-white/80">
				<div
					class="h-full overflow-hidden"
					bind:this={viewport}
					role="region"
					aria-label={`Carosello orizzontale ${sectionTitle}`}
					style="touch-action: pan-x pinch-zoom;"
					onwheel={(event) => {
						notifyInteraction();
						event.stopPropagation();
					}}
					ontouchstart={(event) => {
						notifyInteraction();
						event.stopPropagation();
					}}
					ontouchmove={(event) => {
						notifyInteraction();
						event.stopPropagation();
					}}
				>
					<div class="flex h-full">
						{#each slides as slide (slide.id)}
							<div class="h-full min-w-0 w-full shrink-0 basis-full px-3 py-4 sm:px-5 sm:py-5">
								<CarouselSlide {slide} />
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-4 flex items-center justify-center gap-2 sm:mt-5">
		{#each slides as _, subSlideIndex}
			<button
				type="button"
				class={`dot-sub h-2.5 w-2.5 rounded-full transition sm:h-3 sm:w-3 ${
					subSlideIndex === selectedIndex ? 'scale-110 bg-aido-red' : 'bg-gray-300'
				}`}
				aria-label={`Vai alla sotto-slide ${subSlideIndex + 1}`}
				onclick={() => scrollTo(subSlideIndex)}
			></button>
		{/each}
	</div>
</div>
