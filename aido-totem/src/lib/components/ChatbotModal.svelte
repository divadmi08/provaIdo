<script lang="ts">
	import { onMount } from 'svelte';

	let { onclose } = $props<{ onclose: () => void }>();
	
	interface Message {
		type: 'bot' | 'user';
		text: string;
	}

	let chatContainer = $state<HTMLDivElement | null>(null);
	let input = $state('');
	let messages = $state<Message[]>([
		{ type: 'bot', text: 'Ciao! Sono il tuo assistente digitale. Come posso aiutarti oggi?' }
	]);
	
	const suggestedQuestions: string[] = [
		"Cos'è la donazione di organi?",
		'Come si diventa donatori?',
		'Quali sono i requisiti per donare?'
	];

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	$effect(() => {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onclose();
		}
	}

	function sendMessage() {
		if (input.trim()) {
			messages = [...messages, { type: 'user', text: input }];
			setTimeout(() => {
				messages = [
					...messages,
					{ type: 'bot', text: `Hai chiesto: "${input}". Sto cercando una risposta...` }
				];
			}, 500);
			input = '';
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function askSuggested(question: string) {
		input = question;
		sendMessage();
	}
</script>

<div
	class="inset-0 bg-black bg-opacity-50 fixed z-[100] flex items-center justify-center"
	aria-modal="true"
	role="dialog"
>
	<div
		class="bg-white rounded-lg shadow-xl p-4 sm:p-6 sm:w-full max-w-md sm:max-w-lg sm:h-5/6 sm:max-h-none relative flex h-[90vh] max-h-[37.5rem] w-11/12 flex-col"
		aria-labelledby="chatbot-modal-title"
		tabindex="-1"
	>
		<button
			onclick={onclose}
			class="top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl absolute"
			aria-label="Close Chatbot Modal"
		>
			&times;
		</button>

		<h2 id="chatbot-modal-title" class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">
			Assistente Digitale
		</h2>

		<div class="min-h-0 flex flex-1 flex-col">
			<div
				bind:this={chatContainer}
				class="bg-white rounded-lg p-3 space-y-3 mb-3 border-gray-200 flex-1 overflow-y-auto border"
			>
				{#each messages as message}
					<div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
						<div
							class="max-w-[85%] {message.type === 'user'
								? 'bg-aido-red text-white'
								: 'bg-gray-100 text-gray-800'}
                        rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base leading-relaxed shadow-sm"
						>
							{message.text}
						</div>
					</div>
				{/each}
			</div>

			{#if messages.length === 1}
				<div class="mb-3 space-y-2">
					<p class="text-sm text-gray-600 font-medium text-center">Domande frequenti:</p>
					<div class="sm:grid-cols-2 gap-2 grid grid-cols-1">
						{#each suggestedQuestions as question}
							<button
								onclick={() => askSuggested(question)}
								class="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors"
							>
								{question}
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<div class="bg-white rounded-lg p-2 gap-2 shadow-inner border-gray-200 flex border">
				<input
					type="text"
					value={input}
					oninput={(e) => (input = e.currentTarget.value)}
					onkeydown={handleKeyPress}
					placeholder="Scrivi la tua domanda..."
					class="text-sm sm:text-base px-2 sm:px-3 py-2 border-gray-300 rounded-md focus:border-aido-red flex-1 border outline-none"
				/>
				<button
					onclick={sendMessage}
					class="bg-aido-red text-white py-2 px-3 sm:px-4 rounded-md hover:bg-aido-red-dark text-sm sm:text-base whitespace-nowrap transition-colors duration-200"
					disabled={!input.trim()}
				>
					Invia
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.bg-aido-red {
		background-color: #e53e3e;
	}
	.hover\:bg-aido-red-dark:hover {
		background-color: #c53030;
	}
</style>