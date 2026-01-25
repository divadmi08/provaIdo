<script lang="ts">

    let {placehol = "",textContenuto=$bindable(), tipo="T", classStyle=" caret-zinc-50 bg-blue-900", w=100, h=100} = $props()


    const max = 23
    const min = 0
    switch (tipo) {
        case "T":
            tipo = "text"
            break;
        case "D":
            tipo = "date"
            break;
        case "N":
            tipo = "number"
            break;
        default:
            break;
    }
    

</script>

<div class="w-[{w}%] h-[{h}%]">
    <input type="{tipo}" bind:value={textContenuto} name="data" class="w-full h-[80%] rounded-2xl {classStyle}" placeholder="{placehol}" min={min} max={max}> <!--con bind continuera ad aggiornarsi-->
    <!-- <p class="w-full h-[20%] text-black-900  text-[70%] {error ? "opacity-100": "opacity-0"}">Errore: {errorOutput}</p> -->
</div>