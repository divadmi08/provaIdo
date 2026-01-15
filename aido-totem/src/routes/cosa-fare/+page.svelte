<script>
  import BackButton from '$lib/components/BackButton.svelte';
  
  const options = [
    {
      title: 'ASL (Azienda Sanitaria Locale)',
      icon: '🏥',
      description: 'Rivolgiti alla tua ASL di riferimento per esprimere la volontà di donazione. Porta un documento d\'identità.',
      details: [
        'Richiedi il modulo di dichiarazione',
        'Compila e firma il documento',
        'La dichiarazione viene registrata nel Sistema Informativo Trapianti'
      ]
    },
    {
      title: 'Comune di residenza',
      icon: '🏛️',
      description: 'Presso l\'ufficio anagrafe del tuo comune puoi esprimere la tua volontà al momento del rilascio o rinnovo della carta d\'identità.',
      details: [
        'Durante il rilascio della carta d\'identità',
        'Dichiarazione registrata automaticamente',
        'Nessun documento aggiuntivo necessario'
      ]
    },
    {
      title: 'Iscrizione AIDO',
      icon: '❤️',
      description: 'Iscriviti all\'Associazione Italiana per la Donazione di Organi, Tessuti e Cellule.',
      details: [
        'Compila il modulo di iscrizione',
        'Ricevi la tessera AIDO',
        'Supporti le attività di sensibilizzazione'
      ]
    }
  ];
</script>

<div class="h-screen flex items-center justify-center p-8 totem:p-4 overflow-y-auto">
  <div class="max-w-5xl w-full py-20 totem:py-10">
    <BackButton />
    <div class="text-center mb-12 totem:mb-8">
      <h1 class="text-5xl totem:text-4xl font-bold text-white mb-4">Dove posso iscrivermi?</h1>
      <p class="text-2xl totem:text-xl text-white/80">Scegli il metodo più comodo per te</p>
    </div>
    
    <div class="grid gap-8 totem:gap-4 mb-24">
      {#each options as option}
        <div class="totem-card">
          <div class="flex gap-6 totem:gap-4">
            <div class="text-7xl totem:text-5xl shrink-0">{option.icon}</div>
            <div class="flex-1">
              <h2 class="text-3xl totem:text-2xl font-bold text-gray-800 mb-4">{option.title}</h2>
              <p class="text-xl totem:text-base text-gray-600 mb-6">{option.description}</p>
              <ul class="space-y-3 totem:space-y-2">
                {#each option.details as detail}
                  <li class="flex items-start gap-3 totem:gap-2">
                    <span class="text-aido-red text-2xl totem:text-xl">✓</span>
                    <span class="text-lg totem:text-base text-gray-700">{detail}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>