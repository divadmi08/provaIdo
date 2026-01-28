<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.store';

	onMount(() => {
		authStore.ripristinaSessione();
		
		if (authStore.isAutenticato) {
			goto('/documenti');
		} else {
			goto('/login');
		}
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="text-6xl animate-spin">🔄</div>
</div>