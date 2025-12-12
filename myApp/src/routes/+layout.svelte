<script lang="ts">
	import './layout.css';	
	import favicon from '$lib/assets/favicon.svg';

	
	let { children } = $props();
</script>

<div class="bg-amber-700 w-[70%] ">
	{@render children()}
</div>
