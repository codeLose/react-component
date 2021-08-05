// .storybook/config.js
import { configure } from '@storybook/react';

const req = require.context('../components/', true, /\.stories\.js$/);

function importAll() {
    req.keys().forEach((filename) => req(filename))
}
configure(importAll, module);