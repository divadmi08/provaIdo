<script>
  import Title from '$lib/components/title.svelte';
  import '$lib/styles/global.css';
  
  let { children } = $props(); 
  console.log('Layout principale caricato');
</script>

<header>
  <nav>
    <Title title="Ninja Gaming Links" />
  </nav> 
</header>

<main>
  {@render children()} 
</main>

<footer>
  <p>Links Page Footer</p>
</footer>

<style>
  header {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  main {
    max-width: 960px;
    margin: 20px auto;
    padding: 2rem;
  }
  footer {
    text-align: center;
    padding: 2rem;
    background: rgba(0,0,0,0.1);
  }
</style>