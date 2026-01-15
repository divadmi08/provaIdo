<script>
  import BackButton from '$lib/components/BackButton.svelte';
  import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="h-screen flex items-center justify-center p-8 overflow-y-auto">
  <div class="max-w-4xl w-full py-20">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-white mb-4">Diventa Donatore AIDO</h1>
      <p class="text-2xl text-white/80">Iscriviti subito scansionando il QR code</p>
    </div>
    
    <div class="totem-card text-center mb-24">
      <div class="space-y-8">
        <div class="flex justify-center">
          <QRCode src="/images/qr-iscrizione.png" alt="QR Code Iscrizione AIDO" size="350px" />
        </div>
        
        <div class="space-y-4">
          <p class="text-2xl font-bold text-gray-800">
            Scansiona il QR code con il tuo smartphone
          </p>
          <p class="text-xl text-gray-600">
            Verrai reindirizzato al modulo di iscrizione online
          </p>
          <p class="text-lg text-gray-500">
            Link: <a href="https://digitalaido.it/vogliodiresi/iscrivitiscelta.php" class="text-aido-red underline">
              digitalaido.it/vogliodiresi/iscrivitiscelta.php
            </a>
          </p>
        </div>
        
        <div class="bg-blue-50 rounded-2xl p-6 mt-8">
          <h3 class="text-2xl font-bold text-blue-900 mb-4">Oppure usa la nostra app</h3>
          <p class="text-lg text-blue-800 mb-6">Disponibile su Android e iOS</p>
          <button 
            on:click={() => window.location.href = '/scarica-app'}
            class="totem-button bg-blue-600 hover:bg-blue-700"
          >
            Vai alla sezione App →
          </button>
        </div>
      </div>
    </div>
    
    <BackButton />
  </div>
</div>