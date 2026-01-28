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

<div class="flex h-full flex-col items-center justify-center p-8">
	<!-- Titolo fuori dal box -->
	<div class="totem-page-header">
		<h1 class="totem-page-title">Contatti AIDO</h1>
		<p class="totem-page-subtitle">Come raggiungerci</p>
	</div>

	<!-- Box bianco centrale -->
	<div class="totem-content-box w-full">
		<div class="grid gap-8 md:grid-cols-2">
			{#each contacts as contact}
				<div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-100">
					<div class="text-center">
						<div class="text-7xl mb-4">{contact.icon}</div>
						<h3 class="text-3xl font-bold text-gray-800 mb-6">{contact.title}</h3>
						<div class="space-y-3">
							{#each contact.details as detail}
								{#if detail}
									<p class="text-xl text-gray-600">{detail}</p>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>