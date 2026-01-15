<script>
  import BackButton from '$lib/components/BackButton.svelte';
  
  let activeIndex = -1;
  
  const faqs = [
    {
      question: "Chi può donare gli organi?",
      answer: "Tutti possono esprimere la volontà di donare, senza limiti di età. L'idoneità degli organi viene valutata al momento del decesso."
    },
    {
      question: "Posso scegliere quali organi donare?",
      answer: "Sì, puoi specificare quali organi e tessuti intendi donare compilando l'apposito modulo di dichiarazione."
    },
    {
      question: "La donazione è compatibile con la mia religione?",
      answer: "Tutte le principali religioni considerano la donazione un atto di amore e solidarietà verso il prossimo."
    },
    {
      question: "Cosa succede se cambio idea?",
      answer: "Puoi modificare la tua volontà in qualsiasi momento seguendo la stessa procedura usata per la prima dichiarazione."
    },
    {
      question: "La mia famiglia può opporsi?",
      answer: "Se hai espresso la tua volontà in modo formale, questa viene rispettata. La famiglia viene comunque sempre coinvolta e informata."
    },
    {
      question: "Quanto costa iscriversi ad AIDO?",
      answer: "L'iscrizione ad AIDO prevede una quota associativa annuale simbolica. La dichiarazione tramite ASL o Comune è gratuita."
    }
  ];
</script>

<div class="h-totem-screen flex flex-col">
  <!-- Header -->
  <div class="totem-header px-totem pt-totem shrink-0">
    <h1 class="text-totem-5xl font-bold text-white mb-3">Domande Frequenti</h1>
    <p class="text-totem-2xl text-white/90">Tocca per leggere le risposte</p>
  </div>
  
  <!-- FAQ scrollabili -->
  <div class="flex-1 overflow-totem-touch px-totem">
    <div class="space-y-4 pb-8">
      {#each faqs as faq, i}
        <button
          on:click={() => activeIndex = activeIndex === i ? -1 : i}
          class="w-full totem-card text-left totem-touch-feedback"
        >
          <div class="flex items-start gap-5">
            <!-- Numero domanda -->
            <div class="shrink-0 w-14 h-14 rounded-full bg-aido-red/10 flex items-center justify-center">
              <span class="text-totem-2xl font-bold text-aido-red">{i + 1}</span>
            </div>
            
            <!-- Contenuto -->
            <div class="flex-1">
              <h3 class="text-totem-2xl font-bold text-gray-800 leading-tight mb-3">
                {faq.question}
              </h3>
              
              {#if activeIndex === i}
                <p class="text-totem-xl text-gray-600 leading-relaxed animate-fade-in mt-4 pr-12">
                  {faq.answer}
                </p>
              {/if}
            </div>
            
            <!-- Freccia -->
            <div 
              class="shrink-0 text-totem-3xl text-aido-red transition-transform duration-300" 
              class:rotate-180={activeIndex === i}
            >
              ↓
            </div>
          </div>
        </button>
      {/each}
      
      <!-- CTA Volontario digitale -->
      <div class="totem-card bg-gradient-to-br from-blue-50 to-purple-50 mt-8">
        <div class="text-center space-y-5">
          <div class="icon-totem-lg">🤖</div>
          <h2 class="text-totem-3xl font-bold text-gray-800">
            Hai altre domande?
          </h2>
          <p class="text-totem-xl text-gray-600 leading-relaxed">
            Chatta con il nostro volontario digitale
          </p>
          <button 
            on:click={() => window.location.href = '/volontario-digitale'}
            class="totem-button mx-auto"
          >
            Avvia chat →
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <div class="totem-actions px-totem pb-totem shrink-0">
    <BackButton />
  </div>
</div>