<script>
  import BackButton from '$lib/components/BackButton.svelte';
  import ChatBot from '$lib/components/ChatBot.svelte';
</script>

<div class="h-totem-screen flex flex-col">
  <!-- Header -->
  <div class="px-totem pt-totem pb-6 shrink-0 bg-gradient-to-b from-purple-900/20 to-transparent">
    <div class="text-center space-y-3">
      <div class="icon-totem-lg">🤖</div>
      <h1 class="text-totem-5xl font-bold text-white">Volontario Digitale</h1>
      <p class="text-totem-xl text-white/90">Fai le tue domande, rispondo subito</p>
    </div>
  </div>
  
  <!-- Chat area -->
  <div class="flex-1 flex flex-col px-totem min-h-0">
    <!-- Messages scrollabili -->
    <div 
      bind:this={chatContainer}
      class="flex-1 bg-white/95 rounded-totem p-6 overflow-totem-touch space-y-5 mb-6"
    >
      {#each messages as message}
        <div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[85%] {message.type === 'user' ? 'bg-aido-red text-white' : 'bg-gray-100 text-gray-800'} 
                      rounded-totem px-6 py-5 text-totem-xl leading-relaxed shadow-sm">
            {message.text}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Domande suggerite (quando la chat è vuova) -->
    {#if messages.length === 1}
      <div class="mb-6 space-y-3">
        <p class="text-totem-base text-white/80 text-center font-medium">Domande frequenti:</p>
        <div class="grid grid-cols-2 gap-3">
          {#each suggestedQuestions as question}
            <button
              on:click={() => askSuggested(question)}
              class="bg-white/20 hover:bg-white/30 text-white rounded-totem-sm px-5 py-4 text-totem-base font-medium totem-touch-feedback transition-colors"
            >
              {question}
            </button>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Input area -->
    <div class="bg-white rounded-totem p-5 flex gap-4 shadow-lg mb-6 shrink-0">
      <input
        type="text"
        bind:value={input}
        on:keypress={handleKeyPress}
        placeholder="Scrivi la tua domanda..."
        class="flex-1 text-totem-xl px-6 py-4 border-2 border-gray-200 rounded-totem-lg focus:border-aido-red outline-none bg-gray-50"
      />
      <button 
        on:click={sendMessage}
        class="totem-button shrink-0 flex items-center gap-3"
        disabled={!input.trim()}
      >
        <span>Invia</span>
        <span class="text-totem-2xl">→</span>
      </button>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="px-totem pb-totem shrink-0">
    <BackButton />
  </div>
</div>