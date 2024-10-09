/*
WW00 0000 0000 00 0000000000

WW: código de país 
00: dígito de control 
0000: código de banco 
0000: código de sucursal 
00: dígito de control 
0000000000: número de cuenta

*/

import {electronicFormatIBAN, isValidIBAN,} from "ibantools"

export const validarFormatoIBAN = (value : string) : boolean => {
    const patron =/^[A-Za-z]{2}\d{2}(\s|-)?(\d{4}(\s|-)?){2}\d{2}(\s|-)?\d{10}$/;
    return patron.test(value)
}


const validarIBAN = (value : string) : boolean => {

    const esFormatoValido =validarFormatoIBAN(value);

    if(!esFormatoValido){

    }
    const iban = electronicFormatIBAN(value.replace(/\s+/g,"")) as string;
    
    return isValidIBAN(iban)
}


const esValido = validarIBAN("ES91 2100 0418 4502 0005 1332")
console.log(`¿El IBAN es válido? ${esValido}`)

