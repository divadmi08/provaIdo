<script lang="ts">
	interface Contact {
		icon: string;
		title: string;
		details: string[];
	}

	const contacts: Contact[] = [
		{
			icon: '🏢',
			title: 'Sede Nazionale AIDO',
			details: ['Via Cola di Rienzo, 243', '00192 Roma', 'Tel: 06 3974.5906', 'Email: aido@aido.it']
		},
		{
			icon: '🌐',
			title: 'Sito Web',
			details: ['www.aido.it', 'www.digitalaido.it', 'Area riservata soci', 'Materiale informativo']
		},
		{
			icon: '📱',
			title: 'Social Media',
			details: [
				'Facebook: /AIDONazionale',
				'Instagram: @aidonazionale',
				'Twitter: @AIDONazionale',
				'YouTube: AIDO Nazionale'
			]
		},
		{
			icon: '📧',
			title: 'Richiedi Informazioni',
			details: [
				'Scansiona il QR code',
				'Invia una email direttamente',
				'Riceverai risposta entro 48h',
				''
			]
		}
	];
</script>

<div class="p-8 flex h-full items-center justify-center overflow-y-auto">
	<div class="max-w-6xl py-20 w-full">
		<div class="mb-12 text-center">
			<h1 class="text-5xl font-bold text-white mb-4">Contatti AIDO</h1>
			<p class="text-2xl text-white/80">Come raggiungerci</p>
		</div>

		<div class="md:grid-cols-2 gap-8 mb-24 grid">
			{#each contacts as contact}
				<div class="totem-card">
					<div class="text-center">
						<div class="text-7xl mb-4">{contact.icon}</div>
						<h3 class="text-3xl font-bold text-gray-800 mb-6">{contact.title}</h3>
						<div class="space-y-3">
							{#each contact.details as detail}
								<p class="text-xl text-gray-600">{detail}</p>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
