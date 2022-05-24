function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}
(
  function saveFile() {
    //save text file
    console.log('save file');
    const textToSave = "Lorem ipsum sid dolor"
    const textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" })
    const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob)
    const fileNameToSaveAs = "SomeFilename"
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();

    // save json file
    // const obj = { hello: 'world' };
    // blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  }
)()