<script lang="ts">
	interface Faq {
		question: string;
		answer: string;
	}

	let activeIndex = $state(-1);

	const faqs: Faq[] = [
		{
			question: 'Chi può donare gli organi?',
			answer:
				"Tutti possono esprimere la volontà di donare, senza limiti di età. L'idoneità degli organi viene valutata al momento del decesso."
		},
		{
			question: 'Posso scegliere quali organi donare?',
			answer:
				"Sì, puoi specificare quali organi e tessuti intendi donare compilando l'apposito modulo di dichiarazione."
		},
		{
			question: 'La donazione è compatibile con la mia religione?',
			answer:
				'Tutte le principali religioni considerano la donazione un atto di amore e solidarietà verso il prossimo.'
		},
		{
			question: 'Cosa succede se cambio idea?',
			answer:
				'Puoi modificare la tua volontà in qualsiasi momento seguendo la stessa procedura usata per la prima dichiarazione.'
		},
		{
			question: 'La mia famiglia può opporsi?',
			answer:
				'Se hai espresso la tua volontà in modo formale, questa viene rispettata. La famiglia viene comunque sempre coinvolta e informata.'
		},
		{
			question: 'Quanto costa iscriversi ad AIDO?',
			answer:
				"L'iscrizione ad AIDO prevede una quota associativa annuale simbolica. La dichiarazione tramite ASL o Comune è gratuita."
		}
	];
</script>

<div class="flex h-full flex-col">
	<!-- Header -->
	<div class="totem-header px-totem pt-totem shrink-0">
		<h1 class="text-totem-5xl font-bold text-white mb-3">Domande Frequenti</h1>
		<p class="text-totem-2xl text-white/90">Tocca per leggere le risposte</p>
	</div>

	<!-- FAQ scrollabili -->
	<div class="overflow-totem-touch px-totem flex-1">
		<div class="space-y-4 pb-8">
			{#each faqs as faq, i}
				<button
					onclick={() => (activeIndex = activeIndex === i ? -1 : i)}
					class="totem-card totem-touch-feedback w-full text-left"
				>
					<div class="gap-5 flex items-start">
						<!-- Numero domanda -->
						<div
							class="w-14 h-14 bg-aido-red/10 flex shrink-0 items-center justify-center rounded-full"
						>
							<span class="text-totem-2xl font-bold text-aido-red">{i + 1}</span>
						</div>

						<!-- Contenuto -->
						<div class="flex-1">
							<h3 class="text-totem-2xl font-bold text-gray-800 leading-tight mb-3">
								{faq.question}
							</h3>

							{#if activeIndex === i}
								<p class="text-totem-xl text-gray-600 leading-relaxed animate-fade-in mt-4 pr-12">
									{faq.answer}
								</p>
							{/if}
						</div>

						<!-- Freccia -->
						<div
							class="text-totem-3xl text-aido-red shrink-0 transition-transform duration-300"
							class:rotate-180={activeIndex === i}
						>
							↓
						</div>
					</div>
				</button>
			{/each}

			<!-- CTA Volontario digitale -->
		</div>
	</div>

	<!-- Footer -->
	<div class="totem-actions px-totem pb-totem shrink-0"></div>
</div>
