<script lang="ts">
	import InputPop from "./inputPop.svelte";
    import { hiddenPopUp, PopUp as PopUpStore, reSetData, saveData } from "$lib/stores/storePopUp";
	import BottoneDeafoultStyle from "./bottoneDeafoultStyle.svelte";
let {tipo = "CREA",placeData = "data", placeTitolo ="titolo", placeContenuto = "contenuto", placeEntrata = "entrata" , placeUscita = "uscita"  } = $props()

    let inpNomeFyle:string = $state("") //cambiera con state
    let inpDataCaricamento:string = $state("") //cambiera con state
    let listaError = $state({})

    let errorData:boolean = $state(false)
    let errorTit:boolean = $state(false)
    let errorEntrata:boolean = $state(false)
    let errorUscita:boolean = $state(false)

    function controlloErrori() {
        Object.entries(listaError).forEach(([chiave, valore]) => {
            if (valore) {
                return true
            }
        });
        
        listaError = []
        return false
    }

    function savedAndClosed() {
        if (controlloErrori()) {
            console.log("cazzo sbagli")
        }   else{
            saveData(inpNomeFyle,inpDataCaricamento)
            hiddenPopUp()
            console.log(inpNomeFyle);
        }
    }

    $effect(()=>{
        if(!$PopUpStore.show) {
            inpNomeFyle = "";
            inpDataCaricamento = "";
        }
        // listaError = {
        //     'data': errorData,
        //     'titolo': errorTit,
        //     'entrata': errorEntrata,
        //     'uscita': errorUscita
        // }
        
    })
    
</script>



<div class="popUpCrea w-[30%] h-[30%] bg-red-900 ring-2 ring-white  absolute top-[40%] left-[50%] -translate-x-[50%] flex flex-col items-center px-[2%] {$PopUpStore.show ? 'opacity-100  pointer-events-auto' : 'opacity-0  pointer-events-none'} transition-opacity">
    <h1 class="w-full h-[10%] pt-[0.5%]">{tipo}</h1>
    <div class="w-full h-[80%] testo flex space-x-[15%] ">
        <div class="titolo-data flex flex-col gap-y-2">
        <InputPop placehol = {placeData} bind:textContenuto={inpNomeFyle} tipo="D" classStyle={""} w={60} h={20} />
        <InputPop placehol = {placeTitolo} bind:textContenuto={inpDataCaricamento} classStyle={""}  w={60} h={20} />
        </div>
    
    </div>
    <div class=" w-full h-[10%]">
        <BottoneDeafoultStyle text={""} funzione={savedAndClosed}></BottoneDeafoultStyle>
    </div>
    
</div>
