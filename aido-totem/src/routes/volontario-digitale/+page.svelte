<script>
  import BackButton from '$lib/components/BackButton.svelte';
  import { onMount } from 'svelte';
  
  let messages = [
    { type: 'bot', text: 'Ciao! Sono il volontario digitale di AIDO. Come posso aiutarti?' }
  ];
  
  let input = '';
  let chatContainer;
  
  // Esempio semplice - da sostituire con NotebookLM o altra API
  async function sendMessage() {
    if (!input.trim()) return;
    
    messages = [...messages, { type: 'user', text: input }];
    const userMessage = input;
    input = '';
    
    // Simula risposta (sostituisci con chiamata API reale)
    setTimeout(() => {
      messages = [...messages, { 
        type: 'bot', 
        text: 'Questa è una risposta di esempio. Integra qui NotebookLM o un altro sistema di FAQ intelligente.'
      }];
      scrollToBottom();
    }, 500);
    
    scrollToBottom();
  }
  
  function scrollToBottom() {
    setTimeout(() => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
  
  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="h-screen flex flex-col p-8">
  <div class="text-center mb-8 pt-8">
    <h1 class="text-5xl font-bold text-white mb-4">Volontario Digitale</h1>
    <p class="text-2xl text-white/80">Fai le tue domande, ti rispondo subito</p>
  </div>
  
  <div class="flex-1 max-w-5xl w-full mx-auto flex flex-col mb-24">
    <!-- Chat messages -->
    <div 
      bind:this={chatContainer}
      class="flex-1 bg-white/95 rounded-3xl p-8 overflow-y-auto mb-6 space-y-4"
    >
      {#each messages as message}
        <div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[70%] {message.type === 'user' ? 'bg-aido-red text-white' : 'bg-gray-200 text-gray-800'} 
                      rounded-2xl px-6 py-4 text-xl">
            {message.text}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Input area -->
    <div class="bg-white rounded-3xl p-6 flex gap-4">
      <input
        type="text"
        bind:value={input}
        on:keypress={handleKeyPress}
        placeholder="Scrivi la tua domanda..."
        class="flex-1 text-2xl px-6 py-4 border-2 border-gray-300 rounded-full focus:border-aido-red outline-none"
      />
      <button 
        on:click={sendMessage}
        class="totem-button shrink-0"
      >
        Invia →
      </button>
    </div>
  </div>
  
  <BackButton />
</div>