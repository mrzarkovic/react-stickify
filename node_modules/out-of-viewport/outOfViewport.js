function out0fViewport(breakpoint) {
    if (window.scrollY > breakpoint) {
        return true;
    }
    return false;
}

export default out0fViewport;
