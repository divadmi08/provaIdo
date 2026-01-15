<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  let showContent = false;
  
  onMount(() => {
    setTimeout(() => showContent = true, 300);
  });
</script>

<div class="h-screen flex flex-col items-center justify-center p-12 totem:p-6">
  <div 
    class="transition-all duration-700"
    class:opacity-0={!showContent}
    class:scale-50={!showContent}
    class:opacity-100={showContent}
    class:scale-100={showContent}
  >
    <button 
      on:click={() => goto('/menu')}
      class="bg-white rounded-[3rem] p-16 totem:p-8 shadow-2xl hover:scale-105 transition-transform duration-300 max-w-lg w-full"
    >
      <div class="flex flex-col items-center gap-10 totem:gap-6">
        <div class="w-64 h-64 totem:w-48 totem:h-48 bg-aido-red rounded-full flex items-center justify-center">
          <span class="text-white text-8xl totem:text-7xl font-bold">aido</span>
        </div>
        <h1 class="text-4xl totem:text-3xl font-bold text-gray-800 text-center">
          Tocca per iniziare
        </h1>
        <p class="text-xl totem:text-lg text-gray-600 text-center">
          Scopri come diventare donatore
        </p>
      </div>
    </button>
  </div>
</div>