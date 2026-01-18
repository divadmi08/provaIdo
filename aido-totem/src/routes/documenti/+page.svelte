<script lang="ts">
	import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
	<!-- Titolo fuori dal box -->
	<div class="totem-page-header">
		<h1 class="totem-page-title">Materiale Informativo</h1>
		<p class="totem-page-subtitle">Scarica documenti e guide</p>
	</div>

	<!-- Box bianco centrale -->
	<div class="totem-content-box w-full">
		<div class="space-y-8">
			<h2 class="text-3xl font-bold text-gray-800 text-center">
				Scansiona per ricevere via email
			</h2>

			<div class="flex justify-center">
				<div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl">
					<QRCode src="/images/qr-documenti.png" alt="QR Code Documenti" size="20rem" />
				</div>
			</div>

			<div class="bg-blue-50 rounded-2xl p-8">
				<h3 class="text-2xl font-bold text-blue-900 mb-6">Materiale disponibile:</h3>
				<div class="grid gap-4 md:grid-cols-2 text-left">
					<div class="flex items-start gap-3">
						<span class="text-2xl text-blue-600">📄</span>
						<span class="text-xl text-blue-800">Guida alla donazione</span>
					</div>
					<div class="flex items-start gap-3">
						<span class="text-2xl text-blue-600">📄</span>
						<span class="text-xl text-blue-800">Modulo iscrizione AIDO</span>
					</div>
					<div class="flex items-start gap-3">
						<span class="text-2xl text-blue-600">📄</span>
						<span class="text-xl text-blue-800">FAQ complete</span>
					</div>
					<div class="flex items-start gap-3">
						<span class="text-2xl text-blue-600">📄</span>
						<span class="text-xl text-blue-800">Diagrammi processo</span>
					</div>
				</div>
			</div>

			<p class="text-lg text-gray-600 text-center">
				I documenti verranno inviati automaticamente al tuo indirizzo email
			</p>
		</div>
	</div>
</div>