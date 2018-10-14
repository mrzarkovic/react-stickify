import React, { PureComponent, createRef, Fragment } from 'react';
import throttle from 'lodash/throttle';

import elementOffsetTop from 'element-offset-top';
import elementOffsetLeft from 'element-offset-left';
import isMobile from 'Util/isMobile';
import scrolledPass from 'Util/scrolledPass';

class Sticker extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sticky: false,
            width: 0,
            left: 0,
            topBreakPoint: 0,
            disabled: false
        };

        this.scrollCallback = this.scrollCallback.bind(this)();
        this.resizeCallback = this.resizeCallback.bind(this)();
        this.positionRef = createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            const breakpoint =
                elementOffsetTop(this.positionRef.current) -
                this.props.topMargin;

            this.setState({
                disabled: isMobile(),
                sticky: scrolledPass(breakpoint),
                left: elementOffsetLeft(this.positionRef.current),
                width: this.positionRef.current.offsetWidth
            });

            window.addEventListener('scroll', this.scrollCallback);
            window.addEventListener('resize', this.resizeCallback);
        }, 300);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollCallback);
        window.removeEventListener('resize', this.resizeCallback);
    }

    scrollCallback() {
        return throttle(() => {
            const breakpoint =
                elementOffsetTop(this.positionRef.current) -
                this.props.topMargin;

            this.setState({
                sticky: scrolledPass(breakpoint)
            });
        }, 10);
    }

    resizeCallback() {
        return throttle(() => {
            this.setState({
                disabled: isMobile(),
                left: elementOffsetLeft(this.positionRef.current),
                width: this.positionRef.current.offsetWidth
            });
        }, 100);
    }

    render() {
        let stickyStyle = {};
        if (this.state.sticky && !this.state.disabled) {
            stickyStyle = {
                position: 'fixed',
                top: this.props.topMargin,
                left: this.state.left,
                width: this.state.width ? this.state.width : 'auto'
            };
        }

        return (
            <Fragment>
                <div ref={this.positionRef} />
                <div style={stickyStyle}>{this.props.children}</div>
            </Fragment>
        );
    }
}

export default Sticker;
