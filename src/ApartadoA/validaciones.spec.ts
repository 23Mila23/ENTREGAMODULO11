import { validarIBAN } from "./validaciones";

describe("validarIBAN", () => {
  test.each([
    ["ES21 1465 0100 72 2030876293", true],
    ["ES21.1465 0100 72 2030876293", false],
    ["ES21 1465 0100 72 203087 6293", false],
    ["ES212030876293", false],
    ["ES2114650100722030876293", true],
    ["ES21-1465-0100-72-2030876293", true],
    ["ES6621000418401234567891", true],
    ["ES231234-00-2", false],
    ["ES456789-00-0000-0", false],
    ["00-12-1234-1234-123455", false],
  ])(
    "Debería devolver para el IBAN %p el valor %p",
    (IBAN: string, expected: boolean) => {
      expect(validarIBAN(IBAN)).toBe(expected);
    }
  );
});
