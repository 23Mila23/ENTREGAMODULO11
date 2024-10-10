
const buscarTagsImg = (html: string): RegExpMatchArray => {
  const patronImg = /<img\s+(?<url>src=["']([^"']+)["'])[^>]*>/gim;
  const coincidencias = html.match(patronImg);
  if (!coincidencias) {
    throw new Error("No se han encontrado coincidencias");
  }

  return coincidencias;
};

const extraerURL = (coincidencias: RegExpMatchArray) => {
  const urls = coincidencias.map((coincidencia) => {
    const urlExec = /src=["']([^"']+)["']/.exec(
      coincidencia
    ) as RegExpMatchArray;
    return urlExec[1];
  });

  return urls;
};

const pintarUrls = (urls: string[]) => {
  const divresultado = document.querySelector("#resultados");
  urls.forEach((url) => {
    const link = document.createElement("img");
    link.innerHTML = url;
    link.src = url;
    divresultado?.appendChild(link);
  });
};

const extraerImagenes = (html: string) => {
  try {
    const tagsImg = buscarTagsImg(html);
    const urls = extraerURL(tagsImg);
    pintarUrls(urls);
  } catch (error) {
    alert(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const botonExtraerImagenes = document.querySelector(
    "button"
  ) as HTMLButtonElement;
  botonExtraerImagenes.addEventListener("click", () => {
    const textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    extraerImagenes(textArea.value);
  });
});
