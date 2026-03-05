<script lang="ts">
	import type { CarouselItem } from '../types/carousel';

	let { slide } = $props<{ slide: CarouselItem }>();
</script>

<div class={`sub-card flex h-full min-h-[260px] flex-col justify-between rounded-2xl ${slide.accent} p-5 text-white shadow-lg sm:min-h-[320px] sm:p-6`}>
	<p class="sub-badge mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-lg font-bold sm:h-14 sm:w-14 sm:text-xl">
		{slide.badge}
	</p>
	<div>
		<h3 class="sub-title mb-2 text-xl font-semibold sm:text-2xl">{slide.title}</h3>
		<p class="sub-text text-sm leading-relaxed text-white/90 sm:text-base">{slide.description}</p>
	</div>
	<div class="mt-4 border-t border-white/35 pt-3 text-xs tracking-wide text-white/85 sm:text-sm">AIDO</div>
</div>
