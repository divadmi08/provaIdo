import { writable } from "svelte/store";

// src/lib/stores/utente.ts


export type Utente = {
  name: string;
  email: string;
  autorizzato: boolean;
};

export const utente = writable<Utente>({
  name: '',
  email: '',
  autorizzato: false
});


export const Utente = writable({
    id:"",
    name:"",
    email:"",
    
});

export function saveUtente(upName?:string,upEmail?:string) {
    Utente.update((obj:any) => {
        return {
            ...obj,
            name: upName ?? "",
            email: upEmail ?? "",
            
        }
    })
}

export function ExitUtente(){
    Utente.set({
        id:"",
        name:"",
        email:"",
        
    })
}