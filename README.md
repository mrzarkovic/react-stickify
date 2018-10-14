# react-stickify

Make sticky react components that follow scroll when leaving the viewport.

```jsx
import Sticker from 'react-stickify';

const fixedNavHeight = 86; // .fixed-nav { height: 86px; }

<Sticker topMargin={fixedNavHeight}>
    <div>I'm sticky!</div>
</Sticker>
```
