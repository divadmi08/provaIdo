<script lang="ts">
	import { goto } from '$app/navigation';

	let { path = '/menu', label = 'Torna al Menu' } = $props<{
		path?: string;
		label?: string;
	}>();
</script>

<div class="mb-8 flex w-full justify-center">
	<button onclick={() => goto(path)} class="totem-button totem:text-sm">
		← {label}
	</button>
</div>
