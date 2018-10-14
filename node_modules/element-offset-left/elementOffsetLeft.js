export default function elementOffsetLeft(elem) {
    let offsetLeft = 0;

    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while ((elem = elem.offsetParent));

    return offsetLeft;
}
