<script lang="ts">
	let { onclick } = $props<{ onclick: () => void }>();
</script>

<button
	class="bottom-4 right-4 sm:bottom-6 sm:right-6 bg-aido-red text-white p-3 sm:p-4 shadow-lg hover:bg-aido-red-dark focus:ring-aido-red-light focus:ring-opacity-75 fixed z-50
         flex items-center justify-center rounded-full transition-colors duration-200 focus:ring-2
         focus:outline-none"
	aria-label="Open Chatbot"
	onclick={onclick}
>
	<span class="text-base sm:text-xl font-semibold mr-1 sm:mr-2 sm:inline hidden">Chatbot</span>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-5 w-5 sm:h-6 sm:w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
		/>
	</svg>
</button>

<style>
	/* You might want to adjust colors based on your theme */
	.bg-aido-red {
		background-color: #e53e3e; /* Example AIDO red */
	}
	.hover\:bg-aido-red-dark:hover {
		background-color: #c53030; /* Example darker AIDO red */
	}
	.focus\:ring-aido-red-light:focus {
		--tw-ring-color: #f56565; /* Example lighter AIDO red */
	}
</style>
