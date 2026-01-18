<script lang="ts">
  import { goto } from '$app/navigation';
  
  export let path: string = '/menu';
  export let label: string = 'Torna al Menu';
</script>

<div class="flex justify-center w-full mb-8">
  <button 
    on:click={() => goto(path)}
    class="totem-button totem:text-sm"
  >
    ← {label}
  </button>
</div>