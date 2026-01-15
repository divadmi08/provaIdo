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
      answer: "L'iscrizione ad AIDO prevede una quota associativa annuale simbolica. La dichiarazione di volontà tramite ASL o Comune è gratuita."
    }
  ];
</script>

<div class="h-screen flex items-center justify-center p-8 overflow-y-auto">
  <div class="max-w-5xl w-full py-20">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-white mb-4">Domande Frequenti</h1>
      <p class="text-2xl text-white/80">Le risposte alle domande più comuni</p>
    </div>
    
    <div class="space-y-4 mb-24">
      {#each faqs as faq, i}
        <button
          on:click={() => activeIndex = activeIndex === i ? -1 : i}
          class="w-full totem-card text-left"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">{faq.question}</h3>
              {#if activeIndex === i}
                <p class="text-xl text-gray-600 mt-4 animate-fade-in">{faq.answer}</p>
              {/if}
            </div>
            <div class="text-4xl text-aido-red transition-transform duration-300" 
                 class:rotate-180={activeIndex === i}>
              ↓
            </div>
          </div>
        </button>
      {/each}
    </div>
    
    <div class="totem-card text-center mb-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Hai altre domande?</h2>
      <p class="text-xl text-gray-600 mb-6">Parla con il nostro volontario digitale</p>
      <button 
        on:click={() => window.location.href = '/volontario-digitale'}
        class="totem-button"
      >
        Avvia chat →
      </button>
    </div>
    
    <BackButton />
  </div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>