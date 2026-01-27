<script lang="ts">
	
    import { hiddenPopUp, PopUp as PopUpStore, reSetData, saveData } from "$lib/stores/uploadPopupStore.svelte";

    let { img= $bindable(), nomeFyle= $bindable(), dataCaricamento= $bindable(),stato = $bindable(), elimina} = $props() 
    let statoModifica = $state(true);

    console.log(typeof(nomeFyle));
    console.log(typeof(dataCaricamento));
    

</script>

<tr class="riga w-full h-[25%] flex items-center justify-center border-2 ">
    <td class="ml-1 w-[10%]">
        <input type="checkbox" name="" class="giorn {$PopUpStore.showChe ? "block": "hidden"} rounded-[2vw]" bind:checked={stato}>
    </td>
    <td class="w-[10%] p-[0.5%] flex items-center justify-center "><input type="date" name="" class="entrata  w-full h-full rounded-[2vw]" disabled={statoModifica} bind:value={img}></td>
    <td class="w-[40%] p-[0.5%] flex items-center justify-center "><input type="text" name="" class="entrata  w-full h-full   rounded-[2vw]"disabled={statoModifica} bind:value={nomeFyle}></td>
    <td class="w-[25%] p-[0.5%] h-full  flex items-center justify-center"><input type="date" name="" class="entrata w-full h-full rounded-[2vw] " disabled={statoModifica} bind:value={dataCaricamento}></td>
    <td class="w-[5%] p-[0.5%]  flex items-center justify-center ">
        <button onclick={()=>{statoModifica = false;}}></button>
    </td>
    <td class="w-[5%] p-[0.5%]  flex items-center justify-center  {!statoModifica ? 'opacity-100 pointer-events-auto' : 'opacity-0  pointer-events-none'}">
        <!-- <button onclick={}><Trash3Fill/></button>  fare salvataggio sul local storage -->
    </td>
    <td class="w-[5%] p-[0.5%]  flex items-center justify-center  ">
        <button onclick={elimina}></button>
    </td>
</tr>
