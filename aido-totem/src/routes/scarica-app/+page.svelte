<script lang="ts">
	import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="flex h-full flex-col items-center justify-center p-8">
	<!-- Titolo fuori dal box -->
	<div class="totem-page-header">
		<h1 class="totem-page-title">Scarica l'App AIDO</h1>
		<p class="totem-page-subtitle">Disponibile su Android e iOS</p>
	</div>

	<!-- Box bianco centrale -->
	<div class="totem-content-box w-full">
		<div class="space-y-8">
			<!-- QR Codes -->
			<div class="grid gap-8 md:grid-cols-2">
				<!-- Android -->
				<div class="text-center bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100">
					<div class="w-24 h-24 bg-green-500 mb-6 mx-auto flex items-center justify-center rounded-full shadow-lg">
						<span class="text-6xl">📱</span>
					</div>
					<h2 class="text-3xl font-bold text-gray-800 mb-6">Android</h2>
					<div class="mb-6 flex justify-center">
						<QRCode src="/images/qr-android.png" alt="QR Code Android" size="16rem" />
					</div>
					<p class="text-xl text-gray-600">Scansiona per scaricare da Google Play</p>
				</div>

				<!-- iOS -->
				<div class="text-center bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
					<div class="w-24 h-24 bg-blue-500 mb-6 mx-auto flex items-center justify-center rounded-full shadow-lg">
						<span class="text-6xl">📱</span>
					</div>
					<h2 class="text-3xl font-bold text-gray-800 mb-6">iPhone</h2>
					<div class="mb-6 flex justify-center">
						<QRCode src="/images/qr-iphone.png" alt="QR Code iPhone" size="16rem" />
					</div>
					<p class="text-xl text-gray-600">Scansiona per scaricare da App Store</p>
				</div>
			</div>

			<!-- Features -->
			<div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
				<h3 class="text-3xl font-bold text-gray-800 mb-8">Con l'app AIDO puoi:</h3>
				<div class="grid gap-6 md:grid-cols-3">
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
</div>