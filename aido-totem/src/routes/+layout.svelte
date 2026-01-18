<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { setupInactivityListeners } from '$lib/stores/inactivity';
	import ChatbotButton from '$lib/components/ChatbotButton.svelte';
	import ChatbotModal from '$lib/components/ChatbotModal.svelte';
	import InfiniteCarousel from '$lib/components/InfiniteCarousel.svelte';

	let { children } = $props<{ children: any }>();

	const carouselPages = [
		() => import('./cosa-fare/+page.svelte'),
		() => import('./processo-donazione/+page.svelte'),
		() => import('./diventa-donatore/+page.svelte'),
		() => import('./faq/+page.svelte'),
		() => import('./scarica-app/+page.svelte'),
		() => import('./documenti/+page.svelte'),
		() => import('./contatti/+page.svelte'),
		() => import('./diagnosi-morte/+page.svelte'),
		() => import('./donazione-vivente/+page.svelte'),
		() => import('./arresto-cardiaco/+page.svelte')
	];

	let isChatbotModalOpen = $state(false);

	onMount(() => {
		setupInactivityListeners();
	});

	function openChatbotModal(): void {
		isChatbotModalOpen = true;
	}

	function closeChatbotModal(): void {
		isChatbotModalOpen = false;
	}
</script>

<div>
	
</div>
<InfiniteCarousel pages={carouselPages} />

{@render children?.()}

{#if isChatbotModalOpen}
	<ChatbotModal onclose={closeChatbotModal} />
{/if}

<ChatbotButton onclick={openChatbotModal} />
