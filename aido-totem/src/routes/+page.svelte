<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  let showContent = false;
  
  onMount(() => {
    setTimeout(() => showContent = true, 300);
  });
</script>

<div class="h-totem-screen flex flex-col items-center justify-center px-totem">
  <div 
    class="transition-all duration-700 w-full"
    class:opacity-0={!showContent}
    class:scale-90={!showContent}
    class:opacity-100={showContent}
    class:scale-100={showContent}
  >
    <button 
      on:click={() => goto('/menu')}
      class="bg-white rounded-totem-lg w-full p-totem shadow-2xl totem-touch-feedback transition-all duration-300 hover:shadow-3xl"
    >
      <div class="flex flex-col items-center gap-totem">
        <!-- Logo AIDO grande e prominente -->
        <div class="totem-logo">
          <span class="totem-logo-text">aido</span>
        </div>
        
        <!-- Testo principale -->
        <div class="space-y-4">
          <h1 class="text-totem-5xl font-bold text-gray-800 text-center leading-tight">
            Tocca per iniziare
          </h1>
          <p class="text-totem-2xl text-gray-600 text-center leading-relaxed px-4">
            Scopri come diventare donatore di organi, tessuti e cellule
          </p>
        </div>
        
        <!-- Indicatore visivo -->
        <div class="mt-4 flex flex-col items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-aido-red/10 flex items-center justify-center animate-pulse">
            <svg class="w-10 h-10 text-aido-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="width" stroke-width="2.5" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            </svg>
          </div>
          <p class="text-totem-lg text-gray-500 font-medium">Tocca ovunque per continuare</p>
        </div>
      </div>
    </button>
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>