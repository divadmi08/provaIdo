<script lang="ts">
	
	import { PopUp as PopUpStore, reSetData, showPopUp, showCheck } from "$lib/stores/storePopUp";
	
	import BottoneDeafoultStyle from "$lib/components/bottoneDeafoultStyle.svelte";
	
	import TabellaRiga from "$lib/components/TabellaRiga.svelte";

	let lista:any = $state([])

	function creaButton() {
		showPopUp()
		
	}


	
	let InpModifica = false

	$effect(()=>{
		if ($PopUpStore.saveData) {
			console.log("HERE")
			lista.push({
				showCheck:$PopUpStore.showChe,
				status: false,
				
			})
			reSetData()
			console.log(lista);
		}
			
	});

	function listaIdDelet() {
		let listaId:any = []
		let count = 0
		lista.forEach((element:any) => {
			if (element.status){
				listaId.push(count)
			}
			count ++
		});
		
		listaId.forEach((element:any) => {
			lista.splice(element,1)
		});
	}

let listaSave = $state()
$effect(()=>{
	lista
})
	// lista.forEach((Riga:any) => {
		
	// 	console.log(Riga.status)
	// });
</script>

<div class="w-full h-full">

<nav class="w-full h-[10%] bg-red-900 flex justify-center items-center gap-4 px-4 shadow-md">
	
    <BottoneDeafoultStyle text="Seleziona" funzione={showCheck} />
    <BottoneDeafoultStyle text="" funzione={listaIdDelet}>
    </BottoneDeafoultStyle>
    <BottoneDeafoultStyle text="Aggiungi" funzione={creaButton} />

	
	<!-- <BottoneDeafoultStyle text={"elimina"} funzione={}/>  -->
</nav>
	<div class=" w-full h-[70%] flex items-center justify-center gap-[5%]    ">
		<table class="w-[80%]  h-full contenuto bg-blue-950 overflow-hidden rounded-[2vw] mt-[10%]">
			<thead class="w-full h-[15%] ">
                <tr class="w-full h-full bg-amber-300 flex justify-center">
                    <th class="ml-1  opacity-0  w-[10%] flex items-center">TICK</th>
                    <th class="opacity-0 w-[10%] p-[0.5%] justify-center flex items-center">IMMAGINE</th>
                    <th class="w-[40%] p-[0.5%] justify-center flex items-center">Nome fyle</th>
                    <th class="w-[25%] p-[0.5%] justify-center flex items-center">Data caricamento</th>
                    <th class="opacity-0  w-[5%] p-[0.5%]">Richiedi</th>
                    <th class="opacity-0  w-[5%] p-[0.5%]">Sostituisci</th>
                    <th class="opacity-0  w-[5%] p-[0.5%]">Elimina</th>
                </tr>
		    </thead>
            <tbody class="w-full h-[85%] overflow-y-scroll bg-cyan-900">
                {#each lista as blocco, index}
                    <TabellaRiga bind:titolo = {blocco.titolo} bind:data = {blocco.data} bind:entrata = {blocco.entrata} bind:uscita = {blocco.uscita} bind:contenuto = {blocco.textAreaContent} bind:stato={blocco.status} bind:oreTot={blocco.oreTotali} elimina={()=>{lista.splice(index, 1) } }/>
                {/each}
            </tbody>
		</table>
	</div>
</div>
<!-- <button onclick={()=>{
	lista.splice(1,1)
}}>
	caso
</button> -->
