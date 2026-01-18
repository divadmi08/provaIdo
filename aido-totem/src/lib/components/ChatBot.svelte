<script lang="ts">
	/* =========================
     PROPS (RUNES MODE)
     ========================= */
	const {
		initialMessage = 'Ciao! Sono il volontario digitale di AIDO. Come posso aiutarti?',
		placeholder = 'Scrivi la tua domanda...',
		suggestedQuestions = [
			'Chi può donare?',
			'Dove mi iscrivo?',
			'Quali organi posso donare?',
			'La mia famiglia può opporsi?'
		]
	} = $props<{
		initialMessage?: string;
		placeholder?: string;
		suggestedQuestions?: string[];
	}>();

	/* =========================
     TYPES
     ========================= */
	type Message = {
		type: 'user' | 'bot';
		text: string;
		timestamp: Date;
	};

	/* =========================
     STATE (RUNES)
     ========================= */
	let messages = $state<Message[]>([]);
	let input = $state('');
	let isTyping = $state(false);

	let chatContainer: HTMLDivElement | null = null;

	let initialized = false;
	$effect(() => {
		if (!initialized && messages.length === 0) {
			messages = [{ type: 'bot', text: initialMessage, timestamp: new Date() }];
			initialized = true;
		}
	});

	/* =========================
     FAQ DATA
     ========================= */
	const faqResponses: Record<string, string> = {
		'chi può donare':
			'Tutti possono esprimere la volontà di donare organi, tessuti e cellule, senza limiti di età.',
		'dove mi iscrivo':
			'Puoi iscriverti presso ASL, Comune (carta d’identità) o direttamente tramite AIDO.',
		'quali organi': 'Cuore, polmoni, fegato, reni, pancreas, cornee, pelle e altri tessuti.',
		'famiglia può opporsi': 'Se la volontà è espressa formalmente, è vincolante.',
		costa: 'L’iscrizione AIDO prevede una quota associativa simbolica.',
		età: 'Non esistono limiti di età per dichiarare la volontà di donare.'
	};

	/* =========================
     LOGIC
     ========================= */
	function findBestResponse(query: string): string {
		const q = query.toLowerCase().trim();

		for (const key in faqResponses) {
			if (q.includes(key)) return faqResponses[key];
		}

		return 'Non ho capito bene la domanda. Prova a riformularla o scegli una domanda suggerita.';
	}

	async function sendMessage(): Promise<void> {
		if (!input.trim()) return;

		const userText = input.trim();

		messages = [...messages, {
			type: 'user',
			text: userText,
			timestamp: new Date()
		}];

		input = '';
		isTyping = true;

		// Simula typing delay
		await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));

		messages = [...messages, {
			type: 'bot',
			text: findBestResponse(userText),
			timestamp: new Date()
		}];

		isTyping = false;
	}

	function askSuggested(question: string): void {
		input = question;
		sendMessage();
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	/* =========================
     EFFECTS
     ========================= */
	$effect(() => {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	});

	function formatTime(date: Date): string {
		return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
	}
</script>

<!-- =========================
     TEMPLATE
     ========================= -->
<div class="chatbot-container flex h-full flex-col">
	<!-- CHAT -->
	<div bind:this={chatContainer} class="space-y-4 px-2 flex-1 overflow-y-auto">
		{#each messages as message}
			<div class="flex {message.type === 'user' ? 'justify-end' : 'justify-start'}">
				<div class="max-w-[80%]">
					<div
						class="{message.type === 'user'
							? 'bg-red-600 text-white'
							: 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-3"
					>
						{message.text}
					</div>
					<div class="text-xs text-gray-400 mt-1">
						{formatTime(message.timestamp)}
					</div>
				</div>
			</div>
		{/each}

		{#if isTyping}
			<div class="text-gray-400 italic">Sta scrivendo…</div>
		{/if}
	</div>

	<!-- SUGGESTED QUESTIONS -->
	{#if messages.length === 1}
		<div class="mt-3 gap-2 grid grid-cols-2">
			{#each suggestedQuestions as q}
				<button
					class="bg-gray-200 rounded px-3 py-2 hover:bg-gray-300 text-left transition"
					onclick={() => askSuggested(q)}
				>
					💬 {q}
				</button>
			{/each}
		</div>
	{/if}

	<!-- INPUT -->
	<div class="mt-4 gap-2 flex">
		<input
			class="rounded px-4 py-2 flex-1 border"
			value={input}
            oninput={(e) => input = e.currentTarget.value}
			onkeydown={handleKeyDown}
			{placeholder}
			disabled={isTyping}
		/>
		<button
			class="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
			onclick={sendMessage}
			disabled={!input.trim() || isTyping}
		>
			Invia
		</button>
	</div>
</div>

<style>
	.chatbot-container {
		min-height: 25rem;
	}
</style>
