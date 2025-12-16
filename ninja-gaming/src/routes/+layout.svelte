<script>
  import Title from '$lib/components/title.svelte';
  import '$lib/styles/global.css';
  
  let { children } = $props(); 
</script>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Links - Ninja Gaming</title>
  </head>
  <body>
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
  </body>
</html>

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