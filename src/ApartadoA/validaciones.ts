/*
WW00 0000 0000 00 0000000000

WW: código de país 
00: dígito de control 
0000: código de banco 
0000: código de sucursal 
00: dígito de control 
0000000000: número de cuenta

*/


export const validarIBAN = (value : string) : boolean => {
    const patron =/^[A-Za-z]{2}\d{2}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{2}(\s|-)?\d{10}$/;
    return patron.test(value)
}