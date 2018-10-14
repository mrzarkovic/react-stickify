export default function elementOffsetTop(elem) {
    let offsetTop = 0;

    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while ((elem = elem.offsetParent));

    return offsetTop;
}
