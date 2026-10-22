// Esporta direttamente il CV visibile, non un documento HTML annidato.
function generatePDF() {
  const button = document.getElementById("pdfButton");
  const resume = document.querySelector(".wrapper");
  if (!resume || typeof html2pdf === "undefined") {
    console.error("Layout del CV o libreria html2pdf non disponibile");
    return;
  }
  const name = document.querySelector(".name")?.textContent?.trim() || "Curriculum";
  const filename = name.replace(/\s+/g, "_") + "_CV.pdf";
  if (button) button.disabled = true;
  const options = {
    margin: 0,
    filename: filename,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  };
  html2pdf().set(options).from(resume).save()
    .catch(err => console.error("Errore nella generazione del PDF:", err))
    .finally(() => { if (button) button.disabled = false; });
}
