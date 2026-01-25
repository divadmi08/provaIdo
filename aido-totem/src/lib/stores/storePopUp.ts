import { writable } from "svelte/store";

export const PopUp = writable({
    showChe:false,
    show: false,
    saveData: false,
    nomeFyle:"", 
    dataCaricamento:"",
    placeHolder: true
});


export function showPopUp() {
    PopUp.update((obj) => {
        return {
            ...obj,
            show: true,
             //true mostra i placeholder deafoult false usa come placeholdere il contenuto di data
        }
    })
}   


export function saveData(upNomeFyle?:string,upDataCaricamento?:string ,upEntrata?:number, upUscita?:number, upTextAreaContent?:string) {
    PopUp.update((obj:any) => {
        return {
            ...obj,
            saveData: true,
            nomeFyle: upNomeFyle ?? "", 
            dataCaricamento: upDataCaricamento ?? "",
            placeHolder:true //true mostra i placeholder deafoult false usa come placeholdere il contenuto di data
        }
    })
}



export function reSetData() {
    PopUp.set({
        showChe:false,
        show: false,
        saveData: false,
        nomeFyle:"", 
        dataCaricamento:"",
        placeHolder: true
    })
}

export function hiddenPopUp(){
    PopUp.update((obj)=>{
        return{
            ...obj,
            show: false
        }
    })
}

export function showCheck() {
    PopUp.update((obj)=>{
        return{
            ...obj,
            showChe: true
        }
    })
}

export function hiddenCheck() {
    PopUp.update((obj)=>{
        return{
            ...obj,
            showChe: false
        }
    })
}
