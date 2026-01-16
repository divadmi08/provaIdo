<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { setupInactivityListeners } from "$lib/stores/inactivity";
  import ChatbotButton from "$lib/components/ChatbotButton.svelte";
  import ChatbotModal from "$lib/components/ChatbotModal.svelte";
  import { isChatbotModalOpen } from "$lib/stores/chatbotModalStore";
  import InfiniteCarousel from '$lib/components/InfiniteCarousel.svelte'; // New import

  const carouselPages = [
    () => import("../routes/cosa-fare/+page.svelte").then((m) => m.default),
    () =>
      import("../routes/processo-donazione/+page.svelte").then(
        (m) => m.default,
      ),
    () =>
      import("../routes/diventa-donatore/+page.svelte").then((m) => m.default),
    () => import("../routes/faq/+page.svelte").then((m) => m.default),
    () => import("../routes/scarica-app/+page.svelte").then((m) => m.default),
    () => import("../routes/documenti/+page.svelte").then((m) => m.default),
    () => import("../routes/contatti/+page.svelte").then((m) => m.default),
    () =>
      import("../routes/diagnosi-morte/+page.svelte").then((m) => m.default),
    () =>
      import("../routes/donazione-vivente/+page.svelte").then((m) => m.default),
    () =>
      import("../routes/arresto-cardiaco/+page.svelte").then((m) => m.default),
  ];

  onMount(() => {
    setupInactivityListeners();
  });

  function openChatbotModal() {
    isChatbotModalOpen.set(true);
  }

  function closeChatbotModal() {
    isChatbotModalOpen.set(false);
  }
</script>

<InfiniteCarousel pages={carouselPages} /> 

<slot />

{#if $isChatbotModalOpen}
  <ChatbotModal on:closeChatbot={closeChatbotModal} />
{/if}

<ChatbotButton on:openChatbot={openChatbotModal} />
