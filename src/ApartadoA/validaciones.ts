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

import { electronicFormatIBAN, isValidIBAN } from "ibantools";

export const validarFormatoIBAN = (value: string): boolean => {
  const patron =
    /^[A-Za-z]{2}\d{2}(\s|-)?(\d{4}(\s|-)?){2}(\d{2}(\s|-)?\d{10}|(\d{4}(\s|-)?){3})$/;
  return patron.test(value);
};

const pintar = (text: string) => {
  const contenedor = document.getElementById("container-elements");
  const parrafo = document.createElement("p");
  parrafo.textContent = text;
  contenedor?.appendChild(parrafo);
};
const validarIBAN = (value: string, tablaBancos : string) => {
  const esFormatoValido = validarFormatoIBAN(value);

  if (esFormatoValido) {
    pintar("El formato del IBAN es correcto");
    //AQUI DEBERIA IR LA COMPROBACION DE SI ES VALIDO, CUANDO QUITEMOS EL RETURN LO METO AQUI
  } else {
    pintar("El formato del IBAN no es correcto");
  }
  const iban = electronicFormatIBAN(value.replace(/\s+/g, "")) as string;
  const esValido = isValidIBAN(iban);

  if (esValido) {
    pintar("El IBAN es válido");
    extraerInfoIBAN(value, tablaBancos);
  } else {
    pintar("El IBAN no es válido");
  }

  return esValido;
};

const tablaBancos = `
2080 Abanca Corporación Bancaria

0061 Banca March

0188 Banco Alcalá

0182 Banco Bilbao Vizcaya Argentaria

0130 Banco Caixa Geral

0234 Banco Caminos

2105 Banco Castilla-La Mancha

0240 Banco de Crédito Social Cooperativo

0081 Banco de Sabadell

0487 Banco Mare Nostrum

0186 Banco Mediolanum

0238 Banco Pastor

0075 Banco Popular Español

0049 Banco Santander

3873 Banco Santander Totta

2038 Bankia

0128 Bankinter

0138 Bankoa

0152 Barclays Bank PLC

3842 BNP Paribas Paris

3025 Caixa de Credit del Enginyers

2100 Caixabank

2045 Caja de Ahorros y Monte de Piedad de Ontinyent

3035 Caja Laboral Popular CC

3081 Caja Rural Castilla-La Mancha3058 Cajamar Caja Rural

2000 Cecabank

1474 Citibank Europe PLC

3821 Commerzbank AG

3877 Danske Bank A/S

0019 Deutsche Bank SAE

0239 EVO Banco

2085 Ibercaja Banco

1465 ING Bank NV

2095 Kutxabank

2048 Liberbank

0131 Novo Banco

0073 Open Bank

0108 Société Générale

2103 Unicaja Banco
`;
const extraerInfoIBAN = (IBAN: string, tablaBancos : string) => {
  const patron =
    /^[A-Za-z]{2}(?<digitoControl>\d{2})(\s|-)?(?<codigoBanco>\d{4})(\s|-)?(?<codigoSucursal>\d{4})(\s|-)?(?<digitoControl2>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/;
  const coincidencia = patron.exec(IBAN);

  if (coincidencia) {
    const coincidencias = coincidencia.groups as any;
    const codigoBanco = coincidencias.codigoBanco;
    const nombreBanco = tablaBancos.match(codigoBanco);
    pintar(`Banco : ${nombreBanco}`)

    const codigoSucursal = coincidencias.codigoSucursal;
    pintar(`Código sucursal : ${codigoSucursal}`);
    const digitoControl = coincidencias.digitoControl;
    pintar(`Digito de control : ${digitoControl}`);
    const numeroCuenta = coincidencias.numeroCuenta;
    pintar(`Número de cuenta : ${numeroCuenta}`);
  }
};
const esValido = validarIBAN("ES91 2100 0418 45 0200051332", tablaBancos);
console.log(`¿El IBAN es válido? ${esValido}`);

/* PARA BUSCAR EN LA TABLA COINCIDENCIAS PODEMOS USAR EL .MATCH Y LAS ISNTRUCCIONES DE BUSCAR EN VARIAS LINEAS
YA ME SACA EL CODIGO DE BANCO, PERO QUEREMOS QUE IMPRIMA EL NOMBRE...PENSAR COMO HACERLO, IGUAL UN NUEVO REGEX SOBRE ESE CODIGO? NS

WW: código de país 
00: dígito de control 
0000: código de banco 
0000: código de sucursal 
00: dígito de control 
0000000000: número de cuenta
*/
