<script>
  import BackButton from '$lib/components/BackButton.svelte';
  import QRCode from '$lib/components/QRCode.svelte';
</script>

<div class="h-screen flex items-center justify-center p-8 overflow-y-auto">
  <div class="max-w-6xl w-full py-20">
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-white mb-4">Scarica l'App AIDO</h1>
      <p class="text-2xl text-white/80">Disponibile su Android e iOS</p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8 mb-24">
      <!-- Android -->
      <div class="totem-card text-center">
        <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-6xl">📱</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Android</h2>
        <div class="flex justify-center mb-6">
          <QRCode src="/images/qr-android.png" alt="QR Code Android" />
        </div>
        <p class="text-xl text-gray-600">Scansiona per scaricare da Google Play</p>
      </div>
      
      <!-- iOS -->
      <div class="totem-card text-center">
        <div class="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="text-6xl">📱</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">iPhone</h2>
        <div class="flex justify-center mb-6">
          <QRCode src="/images/qr-iphone.png" alt="QR Code iPhone" />
        </div>
        <p class="text-xl text-gray-600">Scansiona per scaricare da App Store</p>
      </div>
    </div>
    
    <div class="totem-card text-center mb-24 bg-gradient-to-br from-green-50 to-blue-50">
      <h3 class="text-3xl font-bold text-gray-800 mb-4">Con l'app AIDO puoi:</h3>
      <div class="grid md:grid-cols-3 gap-6 mt-8">
        <div>
          <div class="text-5xl mb-3">✓</div>
          <p class="text-xl text-gray-700">Portare sempre con te la tua dichiarazione</p>
        </div>
        <div>
          <div class="text-5xl mb-3">✓</div>
          <p class="text-xl text-gray-700">Ricevere news e aggiornamenti</p>
        </div>
        <div>
          <div class="text-5xl mb-3">✓</div>
          <p class="text-xl text-gray-700">Trovare la sezione AIDO più vicina</p>
        </div>
      </div>
    </div>
    
    <BackButton />
  </div>
</div>