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
	import TabellaDocumenti from '$lib/components/documenti/TabellaDocumenti.svelte';
	import PopupCaricamento from '$lib/components/documenti/PopupCaricamento.svelte';
	import PopupEmail from '$lib/components/documenti/PopupEmail.svelte';
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
	<!-- Header -->
	<div class="totem-page-header">
		<h1 class="totem-page-title">Materiale Informativo</h1>
		<p class="totem-page-subtitle">Gestione documenti</p>
	</div>

	<!-- Tabella -->
	<div class="totem-content-box h-full w-full">
		<TabellaDocumenti />
	</div>
</div>

<!-- Popup -->
<PopupCaricamento />
<PopupEmail />