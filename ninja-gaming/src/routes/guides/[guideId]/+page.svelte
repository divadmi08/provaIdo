<script>
  export let data
  const { guide } = data
</script>


<div class="guide">
    <h2>{guide.title}</h2>
    <p>{guide.body}</p>
</div>

<style>
    .guide{
        border: 1px dotted grey;
    }
</style>