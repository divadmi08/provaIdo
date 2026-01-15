<script>
  import { goto } from '$app/navigation';
  
  const menuSections = [
    {
      icon: '📋',
      title: 'Cosa devo fare?',
      description: 'Dove e come iscriverti',
      path: '/cosa-fare',
      color: 'bg-aido-blue'
    },
    {
      icon: '🏥',
      title: 'Processo di donazione',
      description: 'Come funziona',
      path: '/processo-donazione',
      color: 'bg-aido-red'
    },
    {
      icon: '❤️',
      title: 'Diventa donatore',
      description: 'Iscriviti con QR code',
      path: '/diventa-donatore',
      color: 'bg-green-600'
    },
    {
      icon: '❓',
      title: 'Domande frequenti',
      description: 'Tutte le risposte',
      path: '/faq',
      color: 'bg-purple-600'
    },
    {
      icon: '🤖',
      title: 'Volontario digitale',
      description: 'Assistente virtuale',
      path: '/volontario-digitale',
      color: 'bg-indigo-600'
    },
    {
      icon: '📱',
      title: 'Scarica l\'app',
      description: 'App per smartphone',
      path: '/scarica-app',
      color: 'bg-aido-orange'
    },
    {
      icon: '📄',
      title: 'Documenti',
      description: 'Materiale informativo',
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

<div class="h-totem-screen flex flex-col">
  <!-- Header fisso -->
  <div class="totem-header px-totem pt-totem shrink-0">
    <div class="flex flex-col items-center gap-4">
      <div class="totem-logo">
        <span class="totem-logo-text">aido</span>
      </div>
      <h1 class="text-totem-5xl font-bold text-white">Menu Principale</h1>
      <p class="text-totem-2xl text-white/90">Seleziona un'opzione</p>
    </div>
  </div>
  
  <!-- Scroll area con le card -->
  <div class="flex-1 overflow-totem-touch px-totem pb-totem">
    <div class="menu-grid responsive-grid">
      {#each menuSections as item}
        <button
          on:click={() => goto(item.path)}
          class="totem-card group relative overflow-hidden totem-touch-feedback"
        >
          <!-- Sfondo colorato al hover -->
          <div class="absolute inset-0 {item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          <!-- Contenuto card -->
          <div class="relative z-10 flex items-center gap-6">
            <!-- Icona -->
            <div class="shrink-0 icon-totem-lg">
              {item.icon}
            </div>
            
            <!-- Testo -->
            <div class="flex-1 text-left">
              <h3 class="text-totem-3xl font-bold text-gray-800 mb-2 leading-tight">
                {item.title}
              </h3>
              <p class="text-totem-xl text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
            
            <!-- Freccia -->
            <div class="shrink-0 text-totem-3xl text-gray-400 group-hover:text-aido-red group-hover:translate-x-1 transition-all">
              →
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>