<script>
  import { goto } from '$app/navigation';
  
  const menuSections = [
    {
      icon: '📋',
      title: 'Cosa devo fare?',
      description: 'Scopri dove e come iscriverti',
      path: '/cosa-fare',
      color: 'bg-aido-blue'
    },
    {
      icon: '🏥',
      title: 'Processo di donazione',
      description: 'Come funziona la donazione',
      path: '/processo-donazione',
      color: 'bg-aido-red'
    },
    {
      icon: '❤️',
      title: 'Diventa donatore',
      description: 'Iscriviti subito con QR code',
      path: '/diventa-donatore',
      color: 'bg-green-600'
    },
    {
      icon: '❓',
      title: 'Domande frequenti',
      description: 'Tutte le risposte che cerchi',
      path: '/faq',
      color: 'bg-purple-600'
    },
    {
      icon: '🤖',
      title: 'Volontario digitale',
      description: 'Chatta con il nostro assistente',
      path: '/volontario-digitale',
      color: 'bg-indigo-600'
    },
    {
      icon: '📱',
      title: 'Scarica l\'app',
      description: 'App AIDO su smartphone',
      path: '/scarica-app',
      color: 'bg-aido-orange'
    },
    {
      icon: '📄',
      title: 'Documenti',
      description: 'Scarica materiale informativo',
      path: '/documenti',
      color: 'bg-teal-600'
    },
    {
      icon: '📞',
      title: 'Contatti',
      description: 'Come raggiungerci',
      path: '/contatti',
      color: 'bg-pink-600'
    }
  ];
</script>

<div class="h-screen flex flex-col items-center justify-center p-8 totem:p-4 overflow-y-auto">
  <div class="max-w-6xl w-full">
    <div class="text-center mb-12 totem:mb-8">
      <div class="inline-flex items-center justify-center w-32 h-32 totem:w-24 totem:h-24 bg-white rounded-full mb-6">
        <span class="text-aido-red text-5xl totem:text-4xl font-bold">aido</span>
      </div>
      <h1 class="text-5xl totem:text-4xl font-bold text-white mb-4">Menu Principale</h1>
      <p class="text-2xl totem:text-xl text-white/80">Seleziona un'opzione per continuare</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 totem:grid-cols-1 gap-6 totem:gap-4 pb-8">
      {#each menuSections as item}
        <button
          on:click={() => goto(item.path)}
          class="totem-card group relative overflow-hidden"
        >
          <div class="absolute inset-0 {item.color} opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div class="flex flex-col items-center gap-4 relative z-10">
            <div class="text-6xl totem:text-5xl">{item.icon}</div>
            <h3 class="text-2xl totem:text-xl font-bold text-gray-800 text-center">{item.title}</h3>
            <p class="text-sm text-gray-600 text-center">{item.description}</p>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>