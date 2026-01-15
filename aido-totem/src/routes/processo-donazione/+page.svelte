<script>
  import BackButton from '$lib/components/BackButton.svelte';
</script>

<div class="h-screen flex items-center justify-center p-8 overflow-y-auto">
  <div class="max-w-5xl w-full py-20">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-white mb-4">Il Processo di Donazione</h1>
      <p class="text-2xl text-white/80">Un percorso controllato nel rispetto del donatore</p>
    </div>
    
    <div class="totem-card mb-24">
      <div class="space-y-8">
        <!-- Inserisci qui l'immagine del diagramma di flusso -->
        <div class="bg-gray-100 rounded-2xl p-8">
          <img 
            src="/images/processo-donazione.jpg" 
            alt="Diagramma processo di donazione" 
            class="w-full h-auto"
          />
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-blue-50 rounded-xl p-6">
            <h3 class="text-2xl font-bold text-blue-900 mb-4">1. Accertamento</h3>
            <p class="text-lg text-blue-800">Diagnosi di morte cerebrale da parte di un collegio medico</p>
          </div>
          
          <div class="bg-green-50 rounded-xl p-6">
            <h3 class="text-2xl font-bold text-green-900 mb-4">2. Verifica volontà</h3>
            <p class="text-lg text-green-800">Consultazione del Sistema Informativo Trapianti</p>
          </div>
          
          <div class="bg-purple-50 rounded-xl p-6">
            <h3 class="text-2xl font-bold text-purple-900 mb-4">3. Valutazione clinica</h3>
            <p class="text-lg text-purple-800">Controllo idoneità degli organi da prelevare</p>
          </div>
          
          <div class="bg-red-50 rounded-xl p-6">
            <h3 class="text-2xl font-bold text-red-900 mb-4">4. Prelievo e trapianto</h3>
            <p class="text-lg text-red-800">Intervento chirurgico e assegnazione secondo liste d'attesa</p>
          </div>
        </div>
      </div>
    </div>
    
    <BackButton />
  </div>
</div>