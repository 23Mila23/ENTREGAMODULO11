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
import { informacionIBAN } from "./model";


const tablaBancos = [
  "2080 Abanca Corporación Bancaria",

  "0061 Banca March",

  "0188 Banco Alcalá",

  "0182 Banco Bilbao Vizcaya Argentaria",

  "0130 Banco Caixa Geral",

  "0234 Banco Caminos",

  "2105 Banco Castilla-La Mancha",
  "0240 Banco de Crédito Social Cooperativo",

  "0081 Banco de Sabadell",

  "0487 Banco Mare Nostrum",

  "0186 Banco Mediolanum",

  "0238 Banco Pastor",

  "0075 Banco Popular Español",

  "0049 Banco Santander",

  "3873 Banco Santander Totta",

  "2038 Bankia",

  "0128 Bankinter",

  "0138 Bankoa",

  "0152 Barclays Bank PLC",

  "3842 BNP Paribas Paris",

  "3025 Caixa de Credit del Enginyers",

  "2100 Caixabank",

  "2045 Caja de Ahorros y Monte de Piedad de Ontinyent",

  "3035 Caja Laboral Popular CC",

  "3081 Caja Rural Castilla-La Mancha3058 Cajamar Caja Rural",

  "2000 Cecabank",

  "1474 Citibank Europe PLC",

  "3821 Commerzbank AG",

  "3877 Danske Bank A/S",

  "0019 Deutsche Bank SAE",

  "0239 EVO Banco",

  "2085 Ibercaja Banco",

  "1465 ING Bank NV",

  "2095 Kutxabank",

  "2048 Liberbank",

  "0131 Novo Banco",

  "0073 Open Bank",

  "0108 Société Générale",

  "2103 Unicaja Banco",
];

export const validarFormatoIBAN = (value: string): boolean => {
  const patron =
    /^[A-Za-z]{2}\d{2}(\s|-)?(\d{4}(\s|-)?){2}(\d{2}(\s|-)?\d{10}|(\d{4}(\s|-)?){3})$/;
  return patron.test(value);
};

const pintarValidaciones = (text: string) => {
  const contenedor = document.getElementById("resultados");
  const parrafo = document.createElement("p");
  parrafo.textContent = text;
  contenedor?.appendChild(parrafo);
};

const pintarInformacion = (informacionIBAN : informacionIBAN) => {
const contenedor = document.getElementById("resultados");
const nombreBanco = document.createElement("p");
nombreBanco.textContent = `Banco: ${informacionIBAN.banco}`;
contenedor?.appendChild(nombreBanco);
const codigoSucursal = document.createElement("p");
codigoSucursal.textContent = `Código sucursal: ${informacionIBAN.codigoSucursal}`;
contenedor?.appendChild(codigoSucursal);
const digitoControl = document.createElement("p");
digitoControl.textContent = `Digito de control: ${informacionIBAN.digitoControl}`;
contenedor?.appendChild(digitoControl);
const numeroCuenta = document.createElement("p");
numeroCuenta.textContent = `Numero de cuenta: ${informacionIBAN.numeroCuenta}`;
contenedor?.appendChild(numeroCuenta)
}

const validarIBAN = (value: string) => {
  reiniciarDOM();
  const esFormatoValido = validarFormatoIBAN(value);

  if (esFormatoValido) {
    pintarValidaciones("El formato del IBAN es correcto");
    const iban = electronicFormatIBAN(value.replace(/\s+/g, "")) as string;
    const esValido = isValidIBAN(iban);
    if (esValido) {
      pintarValidaciones("El IBAN es válido");
      const infoIBAN = extraerInfoIBAN(value);
      pintarInformacion(infoIBAN)
    } else {
      pintarValidaciones("El IBAN no es válido");
    }
  } else {
    pintarValidaciones("El formato del IBAN no es correcto");
  }
 
};



const extraerInfoIBAN = (
  IBAN: string
): informacionIBAN => {
  const patron =
    /^[A-Za-z]{2}(?<digitoControl>\d{2})(\s|-)?(?<codigoBanco>\d{4})(\s|-)?(?<codigoSucursal>\d{4})(\s|-)?(?<digitoControl2>\d{2})(\s|-)?(?<numeroCuenta>\d{10})$/;
  const coincidencia = patron.exec(IBAN);
  const coincidencias = coincidencia?.groups as any;
  const codigoBanco = coincidencias.codigoBanco;
  const codigoYNombreBanco = tablaBancos.find((codigo) => {
    return codigo.includes(codigoBanco);
  });
  const nombreBanco = codigoYNombreBanco?.slice(5) as string;

  const codigoSucursal = coincidencias.codigoSucursal;
  const digitoControl = coincidencias.digitoControl;
  const numeroCuenta = coincidencias.numeroCuenta;

  return {
    banco: nombreBanco,
    codigoSucursal,
    digitoControl,
    numeroCuenta,
  };
};

const reiniciarDOM = () => {
  const contenedor = document.getElementById("resultados") as HTMLDivElement;
  contenedor.innerHTML = "";
}
document.addEventListener("DOMContentLoaded", () => {
  const botonBuscar = document.getElementById("img")
  const input = document.getElementById("input-IBAN") as HTMLInputElement;
  
  botonBuscar?.addEventListener("click",() => {
    const iban = input.value;
    validarIBAN(iban);
  })
})

