/**下载文件 */
function saveFile(dataUrl: string, filename: string): void {
    const saveLink: any = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
    );
    saveLink.href = dataUrl;
    saveLink.download = filename;
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    );
    saveLink.dispatchEvent(event);
}
export default saveFile