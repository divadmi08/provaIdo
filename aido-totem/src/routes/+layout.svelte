<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/authStore.svelte';
	import { onMount } from 'svelte';
	import ChatbotButton from '$lib/components/ChatbotButton.svelte';
	import ChatbotModal from '$lib/components/ChatbotModal.svelte';
	import InfiniteCarousel from '$lib/components/InfiniteCarousel.svelte';

	let { children } = $props<{ children: any }>();

	// Ripristina sessione
	onMount(() => {
		authStore.ripristinaSessione();
	});

	// Determina modalità di visualizzazione
	
	function isRoute(path: string, route: string | string[]) {
		if (Array.isArray(route)) return route.includes(path);
		return path === route;
	}

	const pathName = $page.url.pathname as string;

	const isLoginPage = isRoute(pathName, ['/', '/login']);
	const isDocumentiPage = isRoute(pathName, '/documenti');
	const isMenuPage = isRoute(pathName, '/menu');

	const mostraCarosello = !isLoginPage && !isDocumentiPage && !isMenuPage;
	const mostraChatbot = !isLoginPage;



	const carouselPages = [
		() => import('./cosa-fare/+page.svelte'),
		() => import('./processo-donazione/+page.svelte'),
		() => import('./diventa-donatore/+page.svelte'),
		() => import('./faq/+page.svelte'),
		() => import('./scarica-app/+page.svelte'),
		() => import('./contatti/+page.svelte')
	];

	let isChatbotModalOpen = $state(false);

	function openChatbotModal(): void {
		isChatbotModalOpen = true;
	}

	function closeChatbotModal(): void {
		isChatbotModalOpen = false;
	}
</script>

<!-- Carosello (solo pagine informative) -->
{#if mostraCarosello}
	<InfiniteCarousel pages={carouselPages} />
{/if}

<!-- Contenuto pagina -->
{@render children?.()}

<!-- Chatbot (ovunque tranne login) -->
{#if mostraChatbot}
	{#if isChatbotModalOpen}
		<ChatbotModal onclose={closeChatbotModal} />
	{/if}
	<ChatbotButton onclick={openChatbotModal} />
{/if}