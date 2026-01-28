<!-- <script lang="ts">
	import PopUp from '$lib/components/popUp.svelte';
	import QRCode from '$lib/components/QRCode.svelte';
	import Tabella from '$lib/components/Tabella.svelte';
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
	<!-- Titolo fuori dal box 
	<div class="totem-page-header">
		<h1 class="totem-page-title">Materiale Informativo</h1>
		
	</div>

	<!-- Box bianco centrale 
	<div class="totem-content-box w-full h-full">
		
			<Tabella/>
		
	</div>
</div>
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { documentiStore } from '$lib/stores/documents.store';
	import { authStore } from '$lib/stores/auth.store';
	import TabellaDocumenti from '$lib/components/documents/TabellaDocumenti.svelte';
	import PopupCaricamento from '$lib/components/documents/PopupCaricamento.svelte';
	import PopupEmail from '$lib/components/documents/PopupEmail.svelte';
	import HeaderUtente from '$lib/components/layout/HeaderUtente.svelte';

	// Carica documenti di esempio al mount
	onMount(() => {
		// Simula caricamento documenti
		if (documentiStore.documenti.length === 0) {
			// Documenti di test
			const documentiTest = [
				{
					nomeFile: 'Brochure Donazione Organi 2024.pdf',
					dataCaricamento: new Date('2024-01-15'),
					dataVisualizzata: new Date('2024-01-15'),
					fileUrl: '/files/brochure.pdf',
					previewImgUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PDF',
					ruoloVisibile: 'user' as const
				},
				{
					nomeFile: 'Guida Completa al Trapianto.pdf',
					dataCaricamento: new Date('2024-01-20'),
					dataVisualizzata: new Date('2024-01-20'),
					fileUrl: '/files/guida.pdf',
					previewImgUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=PDF',
					ruoloVisibile: 'user' as const
				},
				{
					nomeFile: 'Statistiche Donazioni 2023.xlsx',
					dataCaricamento: new Date('2024-02-01'),
					dataVisualizzata: new Date('2024-02-01'),
					fileUrl: '/files/statistiche.xlsx',
					previewImgUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=XLS',
					ruoloVisibile: 'admin' as const
				},
				{
					nomeFile: 'Modulo Iscrizione AIDO.docx',
					dataCaricamento: new Date('2024-02-05'),
					dataVisualizzata: new Date('2024-02-05'),
					fileUrl: '/files/modulo.docx',
					previewImgUrl: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=DOC',
					ruoloVisibile: 'user' as const
				},
				{
					nomeFile: 'Tesserino Donatore.png',
					dataCaricamento: new Date('2024-02-10'),
					dataVisualizzata: new Date('2024-02-10'),
					fileUrl: '/files/tesserino.png',
					previewImgUrl: 'https://via.placeholder.com/150/800080/FFFFFF?text=IMG',
					ruoloVisibile: 'user' as const
				}
			];

			documentiTest.forEach((doc) => documentiStore.aggiungi(doc));
		}
	});
</script>

<div class="flex h-full flex-col bg-gradient-to-br from-gray-50 to-gray-100">
	<!-- Header con info utente -->
	<div class="flex items-center justify-between bg-white px-8 py-4 shadow-md">
		<div>
			<h1 class="text-3xl font-bold text-gray-800">📄 Gestione Documenti</h1>
			<p class="text-sm text-gray-600">
				Sistema di gestione materiale informativo AIDO
			</p>
		</div>
		<HeaderUtente />
	</div>

	<!-- Contenuto principale -->
	<div class="flex-1 overflow-hidden p-8">
		<div class="h-full rounded-2xl bg-white shadow-xl">
			<TabellaDocumenti />
		</div>
	</div>
</div>

<!-- Popup -->
<PopupCaricamento />
<PopupEmail />