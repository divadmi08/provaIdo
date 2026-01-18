<script lang="ts">
	interface Option {
		title: string;
		subtitle: string;
		icon: string;
		description: string;
		details: string[];
	}

	const options: Option[] = [
		{
			title: 'ASL',
			subtitle: 'Azienda Sanitaria Locale',
			icon: '🏥',
			description: 'Rivolgiti alla tua ASL di riferimento per esprimere la volontà di donazione.',
			details: [
				'Richiedi il modulo di dichiarazione',
				'Compila e firma il documento',
				'Registrazione nel Sistema Informativo Trapianti'
			]
		},
		{
			title: 'Comune',
			subtitle: 'Ufficio Anagrafe',
			icon: '🏛️',
			description: "Esprimi la tua volontà al rilascio o rinnovo della carta d'identità.",
			details: [
				"Durante il rilascio della carta d'identità",
				'Dichiarazione registrata automaticamente',
				'Nessun documento aggiuntivo necessario'
			]
		},
		{
			title: 'AIDO',
			subtitle: 'Associazione Italiana Donatori',
			icon: '❤️',
			description: "Iscriviti all'associazione e ricevi supporto continuo.",
			details: [
				'Compila il modulo di iscrizione',
				'Ricevi la tessera AIDO',
				'Supporti le attività di sensibilizzazione'
			]
		}
	];
</script>

<div class="flex h-full flex-col">
	<!-- Header -->
	<div class="totem-header px-totem pt-totem shrink-0">
		<h1 class="text-totem-5xl font-bold text-white mb-3">Dove iscriversi?</h1>
		<p class="text-totem-2xl text-white/90">Scegli il metodo più comodo</p>
	</div>

	<!-- Content scrollabile -->
	<div class="overflow-totem-touch px-totem flex-1">
		<div class="space-y-6 pb-8">
			{#each options as option}
				<div class="totem-card">
					<!-- Header card con icona -->
					<div class="gap-5 mb-5 pb-5 border-gray-100 flex items-center border-b-2">
						<div class="icon-totem-lg shrink-0">{option.icon}</div>
						<div class="flex-1">
							<h2 class="text-totem-4xl font-bold text-gray-800 leading-tight mb-1">
								{option.title}
							</h2>
							<p class="text-totem-xl text-gray-500 font-medium">
								{option.subtitle}
							</p>
						</div>
					</div>

					<!-- Descrizione -->
					<p class="text-totem-2xl text-gray-700 mb-6 leading-relaxed">
						{option.description}
					</p>

					<!-- Lista dettagli -->
					<ul class="space-y-4">
						{#each option.details as detail}
							<li class="gap-4 flex items-start">
								<span class="text-aido-red text-totem-3xl font-bold shrink-0">✓</span>
								<span class="text-totem-xl text-gray-700 leading-relaxed flex-1">
									{detail}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<!-- Footer con pulsante -->
	<div class="totem-actions px-totem pb-totem shrink-0"></div>
</div>
