<script lang="ts">
	import MainCarousel from '../components/MainCarousel.svelte';
	import type { CarouselSection } from '../types/carousel';

	const sections: CarouselSection[] = [
		{
			id: 'chi-siamo',
			title: 'Chi Siamo',
			subtitle: 'La missione e i valori di AIDO',
			subSlides: [
				{
					id: 'chi-siamo-1',
					title: 'La Nostra Storia',
					description: 'Da oltre 50 anni promuoviamo la cultura del dono organi in Italia.',
					badge: '01',
					accent: 'bg-aido-red'
				},
				{
					id: 'chi-siamo-2',
					title: 'I Nostri Valori',
					description: 'Solidarieta, responsabilita e speranza guidano ogni nostro progetto.',
					badge: '02',
					accent: 'bg-aido-blue'
				},
				{
					id: 'chi-siamo-3',
					title: 'Il Team',
					description: 'Volontari e professionisti lavorano insieme per sensibilizzare il territorio.',
					badge: '03',
					accent: 'bg-aido-orange'
				}
			]
		},
		{
			id: 'storie',
			title: 'Storie',
			subtitle: 'Testimonianze che mostrano il valore del dono',
			subSlides: [
				{
					id: 'storie-1',
					title: 'Una Nuova Vita',
					description: 'Il trapianto ha permesso a Marco di tornare a vivere pienamente.',
					badge: '01',
					accent: 'bg-aido-red'
				},
				{
					id: 'storie-2',
					title: 'Voce delle Famiglie',
					description: 'Le famiglie raccontano come il dono abbia trasformato il dolore in speranza.',
					badge: '02',
					accent: 'bg-aido-blue'
				},
				{
					id: 'storie-3',
					title: 'Volontari in Azione',
					description: 'Eventi, piazze e scuole: ogni incontro aiuta a diffondere consapevolezza.',
					badge: '03',
					accent: 'bg-aido-orange'
				}
			]
		},
		{
			id: 'donazione',
			title: 'Donazione',
			subtitle: 'Informazioni chiare per scegliere consapevolmente',
			subSlides: [
				{
					id: 'donazione-1',
					title: 'Come Funziona',
					description: 'Scopri il percorso di dichiarazione di volonta e come registrarla.',
					badge: '01',
					accent: 'bg-aido-red'
				},
				{
					id: 'donazione-2',
					title: 'Domande Frequenti',
					description: 'Risposte semplici ai dubbi piu comuni su donazione e trapianto.',
					badge: '02',
					accent: 'bg-aido-blue'
				},
				{
					id: 'donazione-3',
					title: 'Supporto',
					description: 'I nostri referenti sono disponibili per aiutarti e orientarti.',
					badge: '03',
					accent: 'bg-aido-orange'
				}
			]
		}
	];
</script>

<main class="flex min-h-screen items-center justify-center px-2 py-2 sm:px-3 sm:py-3">
	<MainCarousel
		{sections}
		kioskMode={true}
		initialAutoplay={false}
		autoplayMs={7000}
		options={{ axis: 'x', containScroll: 'trimSnaps', dragFree: false, duration: 26 }}
		nestedOptions={{ axis: 'x', containScroll: 'trimSnaps', dragFree: false, duration: 22 }}
	/>
</main>
