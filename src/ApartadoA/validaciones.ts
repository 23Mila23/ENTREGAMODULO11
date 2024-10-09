/*
WW00 0000 0000 00 0000000000
ES91 2100 0418 4502 0005 1332

WW: código de país 
00: dígito de control 
0000: código de banco 
0000: código de sucursal 
00: dígito de control 
0000000000: número de cuenta

*/

import {electronicFormatIBAN, isValidIBAN,} from "ibantools"

export const validarFormatoIBAN = (value : string) : boolean => {
    const patron =/^[A-Za-z]{2}\d{2}(\s|-)?(\d{4}(\s|-)?){2}(\d{2}(\s|-)?\d{10}|(\d{4}(\s|-)?){3})$/;
    return patron.test(value)
}

const pintar = (text :string) => {
    const contenedor = document.getElementById("container-elements")
    const parrafo = document.createElement("p");
    parrafo.textContent = text;
    contenedor?.appendChild(parrafo)
    
}
const validarIBAN = (value : string) => {

    const esFormatoValido =validarFormatoIBAN(value);

    if(esFormatoValido){
    pintar("El formato del IBAN es correcto")
    //AQUI DEBERIA IR LA COMPROBACION DE SI ES VALIDO, CUANDO QUITEMOS EL RETURN LO METO AQUI

    } else {
    pintar("El formato del IBAN no es correcto")
    
    }
    const iban = electronicFormatIBAN(value.replace(/\s+/g,"")) as string;
    const esValido = isValidIBAN(iban);

    if(esValido){
        pintar("El IBAN es válido")
    } else {
        pintar("El IBAN no es válido")
    }
    
    return isValidIBAN(iban)
}


const esValido = validarIBAN("ES91 2100 0418 4502 0005 1332")
console.log(`¿El IBAN es válido? ${esValido}`)

