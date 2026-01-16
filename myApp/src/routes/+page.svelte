<!-- +page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
  let isChatOpen = false;
  let showQRPopup = false;
  let useKeyboard = false;
  let messages: Message[] = [
    { role: 'assistant', content: 'Ciao! Come posso aiutarti oggi?' }
  ];
  let input = '';
  let isLoading = false;
  let messagesContainer: HTMLDivElement;
  let currentUrl = '';
  
  onMount(() => {
    currentUrl = window.location.href;
  });
  
  $: qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;
  
  function openChat(): void {
    isChatOpen = true;
    showQRPopup = true;
  }
  
  function closeQRAndOpenChat(): void {
    showQRPopup = false;
  }
  
  function closeQRWithKeyboard(): void {
    showQRPopup = false;
    useKeyboard = true;
  }
  
  function closeChat(): void {
    isChatOpen = false;
    showQRPopup = false;
    useKeyboard = false;
  }
  
  async function sendMessage(): Promise<void> {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    input = '';
    messages = [...messages, { role: 'user', content: userMessage }];
    isLoading = true;
    
    setTimeout(scrollToBottom, 100);
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '', // TODO: Aggiungi la tua API key
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const assistantMessage = data.content?.find((c: any) => c.type === 'text')?.text || 'Mi dispiace, non sono riuscito a rispondere.';
      
      messages = [...messages, { role: 'assistant', content: assistantMessage }];
    } catch (error) {
      messages = [...messages, { role: 'assistant', content: 'Errore di connessione. Riprova più tardi.' }];
    } finally {
      isLoading = false;
      setTimeout(scrollToBottom, 100);
    }
  }
  
  function handleKeyPress(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
  
  function scrollToBottom(): void {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  function handleVirtualKey(key: string): void {
    if (key === '⌫') {
      input = input.slice(0, -1);
    } else if (key === 'spazio') {
      input = input + ' ';
    } else {
      input = input + key;
    }
  }
  
  const keyboardKeys: string[][] = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
    ['spazio', '?', '!', '.', ',']
  ];
</script>

<svelte:head>
  <title>Chatbot AI - Assistenza 24/7</title>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
  <div class="text-center max-w-4xl">
    <h1 class="text-5xl font-bold text-gray-800 mb-4">
      Benvenuto nel nostro sito
    </h1>
    <p class="text-xl text-gray-600 mb-8">
      Hai bisogno di aiuto? Clicca sul bottone in basso a destra per parlare con il nostro assistente AI!
    </p>
    
    <div class="bg-white rounded-lg shadow-xl p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2 text-lg">Chat AI</h3>
          <p class="text-sm text-gray-600">Assistenza immediata 24/7</p>
        </div>
        
        <div class="text-center">
          <div class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2 text-lg">QR Code</h3>
          <p class="text-sm text-gray-600">Connettiti dal tuo smartphone</p>
        </div>
        
        <div class="text-center">
          <div class="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2 text-lg">Tastiera Digitale</h3>
          <p class="text-sm text-gray-600">Scrivi senza tastiera fisica</p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Floating Chat Button -->
  <button 
    on:click={openChat}
    aria-label="Apri chat assistente"
    class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-40"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </button>
  
  <!-- QR Code Popup -->
  {#if showQRPopup}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in" on:click={closeChat}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="bg-white rounded-lg p-8 max-w-md w-full relative animate-in zoom-in duration-300" on:click|stopPropagation>
        <button 
          on:click={closeChat}
          aria-label="Chiudi popup"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Scansiona per chattare da mobile
        </h2>
        
        <div class="bg-gray-100 p-4 rounded-lg mb-6">
          <img src={qrCodeUrl} alt="QR Code" class="w-full h-auto" />
        </div>
        
        <div class="space-y-3">
          <button 
            on:click={closeQRAndOpenChat}
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Chatta dal browser
          </button>
          <button 
            on:click={closeQRWithKeyboard}
            class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
            </svg>
            Usa tastiera digitale
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Chat Window (Centered) -->
  {#if isChatOpen && !showQRPopup}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in" on:click={closeChat}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="bg-white rounded-lg w-full max-w-2xl h-[80vh] flex flex-col animate-in zoom-in duration-300" on:click|stopPropagation>
        <!-- Header -->
        <div class="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div>
              <h3 class="font-semibold">Assistente AI</h3>
              <p class="text-xs text-blue-100">Online</p>
            </div>
          </div>
          <button 
            on:click={closeChat}
            aria-label="Chiudi chat"
            class="hover:bg-blue-700 p-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" bind:this={messagesContainer}>
          {#each messages as msg}
            <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
              <div class="max-w-[80%] rounded-lg p-3 {msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}">
                {msg.content}
              </div>
            </div>
          {/each}
          
          {#if isLoading}
            <div class="flex justify-start">
              <div class="bg-gray-100 rounded-lg p-3">
                <div class="flex gap-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                </div>
              </div>
            </div>
          {/if}
        </div>
        
        <!-- Virtual Keyboard -->
        {#if useKeyboard}
          <div class="bg-gray-100 p-3 border-t border-gray-200">
            {#each keyboardKeys as row}
              <div class="flex justify-center gap-1 mb-1">
                {#each row as key}
                  <button 
                    on:click={() => handleVirtualKey(key)}
                    class="bg-white hover:bg-gray-200 px-3 py-2 rounded text-sm font-medium shadow-sm transition-colors min-w-[32px]"
                  >
                    {key}
                  </button>
                {/each}
              </div>
            {/each}
          </div>
        {/if}
        
        <!-- Input -->
        <div class="p-4 border-t border-gray-200">
          <button 
            on:click={() => useKeyboard = !useKeyboard}
            class="text-sm text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2 transition-colors"
          >
            {#if useKeyboard}
              Usa tastiera fisica
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
              </svg>
              Tastiera digitale
            {/if}
          </button>
          <div class="flex gap-2">
            <input
              type="text"
              bind:value={input}
              on:keydown={handleKeyPress}
              placeholder="Scrivi un messaggio..."
              disabled={isLoading}
              class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button 
              on:click={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Invia messaggio"
              class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

