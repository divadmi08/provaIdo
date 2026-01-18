<script lang="ts">
	import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="flex h-full flex-col">
	<!-- Header -->
	<div class="totem-header px-totem pt-totem shrink-0">
		<h1 class="text-totem-5xl font-bold text-white mb-3">Diventa Donatore</h1>
		<p class="text-totem-2xl text-white/90">Scansiona il QR code per iscriverti</p>
	</div>

	<!-- Content -->
	<div class="overflow-totem-touch px-totem flex flex-1 items-center">
		<div class="pb-8 w-full">
			<div class="totem-card text-center">
				<div class="space-y-8">
					<!-- QR Code prominente -->
					<div class="flex justify-center">
						<div class="from-blue-50 to-purple-50 p-8 rounded-totem-lg bg-gradient-to-br">
							<QRCode
								src="/images/qr-iscrizione.png"
								alt="QR Code Iscrizione AIDO"
								size="clamp(15rem, 48vw, 20rem)"
							/>
						</div>
					</div>

					<!-- Istruzioni -->
					<div class="space-y-5">
						<div class="gap-4 flex items-center justify-center">
							<div class="icon-totem-md">📱</div>
							<div
								class="via-gray-300 h-px flex-1 bg-gradient-to-r from-transparent to-transparent"
							></div>
						</div>

						<p class="text-totem-3xl font-bold text-gray-800 leading-tight">
							Scansiona con il tuo smartphone
						</p>

						<p class="text-totem-xl text-gray-600 leading-relaxed px-6">
							Verrai reindirizzato al modulo di iscrizione online ufficiale AIDO
						</p>

						<div class="bg-gray-50 rounded-totem-sm p-6 text-totem-base text-gray-500">
							<p class="font-mono leading-relaxed break-all">
								digitalaido.it/vogliodiresi/iscrivitiscelta.php
							</p>
						</div>
					</div>

					<!-- Separatore -->
					<div class="gap-4 py-4 flex items-center">
						<div class="bg-gray-300 h-px flex-1"></div>
						<span class="text-totem-xl text-gray-500 font-semibold">OPPURE</span>
						<div class="bg-gray-300 h-px flex-1"></div>
					</div>

					<!-- CTA App -->
					<div class="from-blue-600 to-blue-700 rounded-totem-lg p-8 text-white bg-gradient-to-br">
						<div class="icon-totem-lg mb-4">📲</div>
						<h3 class="text-totem-3xl font-bold mb-4">Usa la nostra app</h3>
						<p class="text-totem-xl mb-6 opacity-90">Disponibile su Android e iOS</p>
						<button
							onclick={() => (window.location.href = '/scarica-app')}
							class="bg-white text-blue-600 font-bold px-10 py-5 text-totem-xl totem-touch-feedback hover:bg-blue-50 rounded-full transition-colors"
						>
							Scarica l'app →
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="totem-actions px-totem pb-totem shrink-0"></div>
</div>
