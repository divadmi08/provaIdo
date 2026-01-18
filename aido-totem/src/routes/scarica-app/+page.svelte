<script lang="ts">
	import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="p-8 flex h-full items-center justify-center overflow-y-auto">
	<div class="max-w-6xl py-20 w-full">
		<div class="mb-12 text-center">
			<h1 class="text-5xl font-bold text-white mb-4">Scarica l'App AIDO</h1>
			<p class="text-2xl text-white/80">Disponibile su Android e iOS</p>
		</div>

		<div class="md:grid-cols-2 gap-8 mb-24 grid">
			<!-- Android -->
			<div class="totem-card text-center">
				<div
					class="w-24 h-24 bg-green-500 mb-6 mx-auto flex items-center justify-center rounded-full"
				>
					<span class="text-6xl">📱</span>
				</div>
				<h2 class="text-3xl font-bold text-gray-800 mb-6">Android</h2>
				<div class="mb-6 flex justify-center">
					<QRCode src="/images/qr-android.png" alt="QR Code Android" />
				</div>
				<p class="text-xl text-gray-600">Scansiona per scaricare da Google Play</p>
			</div>

			<!-- iOS -->
			<div class="totem-card text-center">
				<div
					class="w-24 h-24 bg-blue-500 mb-6 mx-auto flex items-center justify-center rounded-full"
				>
					<span class="text-6xl">📱</span>
				</div>
				<h2 class="text-3xl font-bold text-gray-800 mb-6">iPhone</h2>
				<div class="mb-6 flex justify-center">
					<QRCode src="/images/qr-iphone.png" alt="QR Code iPhone" />
				</div>
				<p class="text-xl text-gray-600">Scansiona per scaricare da App Store</p>
			</div>
		</div>

		<div class="totem-card mb-24 from-green-50 to-blue-50 bg-linear-to-b text-center">
			<h3 class="text-3xl font-bold text-gray-800 mb-4">Con l'app AIDO puoi:</h3>
			<div class="md:grid-cols-3 gap-6 mt-8 grid">
				<div>
					<div class="text-5xl mb-3">✓</div>
					<p class="text-xl text-gray-700">Portare sempre con te la tua dichiarazione</p>
				</div>
				<div>
					<div class="text-5xl mb-3">✓</div>
					<p class="text-xl text-gray-700">Ricevere news e aggiornamenti</p>
				</div>
				<div>
					<div class="text-5xl mb-3">✓</div>
					<p class="text-xl text-gray-700">Trovare la sezione AIDO più vicina</p>
				</div>
			</div>
		</div>
	</div>
</div>
