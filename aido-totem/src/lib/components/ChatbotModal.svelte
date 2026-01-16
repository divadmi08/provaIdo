<script lang="ts">
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
  // import { goto } from '$app/navigation'; // Keep if we need navigation for other things inside modal, else remove
  // import QRCode from 'qrcode'; // No longer needed
  // import type { SvelteComponent } from 'svelte'; // Add this for message types if needed
  import { isChatbotModalOpen } from '$lib/stores/chatbotModalStore'; // Import the store

  const dispatch = createEventDispatcher();

  // New chatbot specific variables
  let chatContainer: HTMLDivElement;
  let input = '';
  let messages = [
    { type: 'bot', text: 'Ciao! Sono il tuo assistente digitale. Come posso aiutarti oggi?' }
  ];
  let suggestedQuestions = [
    'Cos\'è la donazione di organi?',
    'Come si diventa donatori?',
    'Quali sono i requisiti per donare?'
  ];

  onMount(() => {
    // Add event listener for Escape key
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  afterUpdate(() => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeChatbot();
    }
    // No explicit focus trapping in this simple modal, but it can be added if needed
  }

  function closeChatbot() {
    isChatbotModalOpen.set(false); // Close modal using the store
  }

  function sendMessage() {
    if (input.trim()) {
      messages = [...messages, { type: 'user', text: input }];
      // Simulate bot response
      setTimeout(() => {
        messages = [...messages, { type: 'bot', text: `Hai chiesto: "${input}". Sto cercando una risposta...` }];
      }, 500);
      input = '';
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function askSuggested(question: string) {
    input = question;
    sendMessage();
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
  aria-modal="true"
  role="dialog"
>
  <div
    class="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-11/12 sm:w-full max-w-md sm:max-w-lg relative flex flex-col h-[90vh] sm:h-5/6 max-h-[600px] sm:max-h-none"
    aria-labelledby="chatbot-modal-title"
    tabindex="-1"
  >
    <button
      on:click={closeChatbot}
      class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
      aria-label="Close Chatbot Modal"
    >
      &times;
    </button>

    <h2 id="chatbot-modal-title" class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
      Assistente Digitale
    </h2>

    <!-- Chat area -->
    <div class="flex-1 flex flex-col min-h-0">
      <div
        bind:this={chatContainer}
        class="flex-1 bg-white rounded-lg p-3 overflow-y-auto space-y-3 mb-3 border border-gray-200"
      >
        {#each messages as message}
          <div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[85%] {message.type === 'user' ? 'bg-aido-red text-white' : 'bg-gray-100 text-gray-800'}
                        rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base leading-relaxed shadow-sm">
              {message.text}
            </div>
          </div>
        {/each}
      </div>

      {#if messages.length === 1}
        <div class="mb-3 space-y-2">
          <p class="text-sm text-gray-600 text-center font-medium">Domande frequenti:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {#each suggestedQuestions as question}
              <button
                on:click={() => askSuggested(question)}
                class="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors"
              >
                {question}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <div class="bg-white rounded-lg p-2 flex gap-2 shadow-inner border border-gray-200">
        <input
          type="text"
          bind:value={input}
          on:keydown={handleKeyPress}
          placeholder="Scrivi la tua domanda..."
          class="flex-1 text-sm sm:text-base px-2 sm:px-3 py-2 border border-gray-300 rounded-md focus:border-aido-red outline-none"
        />
        <button
          on:click={sendMessage}
          class="bg-aido-red text-white py-2 px-3 sm:px-4 rounded-md hover:bg-aido-red-dark transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
          disabled={!input.trim()}
        >
          Invia
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Define 'aido-red' if not globally defined */
  .bg-aido-red {
    background-color: #e53e3e;
  }
  .hover\:bg-aido-red-dark:hover {
    background-color: #c53030;
  }
</style>