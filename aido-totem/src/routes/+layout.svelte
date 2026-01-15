<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { setupInactivityListeners } from '$lib/stores/inactivity';
  
  onMount(() => {
    setupInactivityListeners();
  });
</script>

<slot />