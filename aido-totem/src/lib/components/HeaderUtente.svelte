<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore.svelte';

	let mostraMenu = $state(false);

	async function handleLogout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		authStore.logout();
		goto('/login');
	}

	function cambiaRuolo() {
		const nuovoRuolo = authStore.isAdmin ? 'user' : 'admin';
		authStore.cambiaRuolo(nuovoRuolo);
		mostraMenu = false;
	}
</script>

<div class="relative">
	<button
		onclick={() => mostraMenu = !mostraMenu}
		class="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-md hover:shadow-lg transition"
	>
		<!-- Avatar -->
		<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white font-bold">
			{authStore.utente?.nome?.charAt(0).toUpperCase() || 'U'}
		</div>

		<!-- Info -->
		<div class="text-left">
			<p class="font-semibold text-gray-800">{authStore.utente?.nome}</p>
			<p class="text-xs text-gray-500">
				{authStore.isAdmin ? '👑 Admin' : '👤 Utente'}
			</p>
		</div>

		<!-- Freccia -->
		<span class="text-gray-400 transition-transform {mostraMenu ? 'rotate-180' : ''}">
			▼
		</span>
	</button>

	<!-- Menu Dropdown -->
	{#if mostraMenu}
		<div class="absolute right-0 top-14 z-50 w-64 rounded-lg bg-white shadow-xl border border-gray-200">
			<div class="p-4 border-b border-gray-100">
				<p class="font-semibold text-gray-800">{authStore.utente?.nome}</p>
				<p class="text-sm text-gray-500">{authStore.utente?.email}</p>
			</div>

			<div class="p-2">
				<!-- Cambio ruolo (solo per test) -->
				<button
					onclick={cambiaRuolo}
					class="w-full rounded-lg px-4 py-2 text-left hover:bg-gray-100 transition"
				>
					<span class="text-sm">
						🔄 Passa a {authStore.isAdmin ? 'Utente' : 'Admin'}
					</span>
				</button>

				<!-- Logout -->
				<button
					onclick={handleLogout}
					class="w-full rounded-lg px-4 py-2 text-left text-red-600 hover:bg-red-50 transition"
				>
					<span class="text-sm">🚪 Esci</span>
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Click fuori per chiudere -->
{#if mostraMenu}
	<button
		onclick={() => mostraMenu = false}
		class="fixed inset-0 z-40"
		aria-label="Chiudi menu"
	></button>
{/if}