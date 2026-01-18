<script lang="ts">
	import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="p-8 flex h-full items-center justify-center overflow-y-auto">
	<div class="max-w-4xl py-20 w-full">
		<div class="mb-12 text-center">
			<h1 class="text-5xl font-bold text-white mb-4">Materiale Informativo</h1>
			<p class="text-2xl text-white/80">Scarica documenti e guide</p>
		</div>

		<div class="totem-card mb-24 text-center">
			<div class="space-y-8">
				<h2 class="text-3xl font-bold text-gray-800">Scansiona per ricevere via email</h2>

				<div class="flex justify-center">
					<QRCode src="/images/qr-documenti.png" alt="QR Code Documenti" size="21.875rem" />
				</div>

				<div class="bg-blue-50 rounded-2xl p-8">
					<h3 class="text-2xl font-bold text-blue-900 mb-6">Materiale disponibile:</h3>
					<div class="md:grid-cols-2 gap-4 grid text-left">
						<div class="gap-3 flex items-start">
							<span class="text-2xl text-blue-600">📄</span>
							<span class="text-xl text-blue-800">Guida alla donazione</span>
						</div>
						<div class="gap-3 flex items-start">
							<span class="text-2xl text-blue-600">📄</span>
							<span class="text-xl text-blue-800">Modulo iscrizione AIDO</span>
						</div>
						<div class="gap-3 flex items-start">
							<span class="text-2xl text-blue-600">📄</span>
							<span class="text-xl text-blue-800">FAQ complete</span>
						</div>
						<div class="gap-3 flex items-start">
							<span class="text-2xl text-blue-600">📄</span>
							<span class="text-xl text-blue-800">Diagrammi processo</span>
						</div>
					</div>
				</div>

				<p class="text-lg text-gray-600">
					I documenti verranno inviati automaticamente al tuo indirizzo email
				</p>
			</div>
		</div>
	</div>
</div>
