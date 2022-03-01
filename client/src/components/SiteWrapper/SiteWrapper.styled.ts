import styled, { createGlobalStyle } from 'styled-components';

export const SiteWrapper = styled.div`
    max-width: 100vw;
    max-height: 100vh;
`;

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

    * {
        font-family: Karla, sans-serif;
    }

    /*
    1. Use a more-intuitive box-sizing model.
    */
    *, *::before, *::after {
        box-sizing: border-box;
    }
    /*
    2. Remove default margin
    */
    * {
        margin: 0;
    }
    /*
    3. Allow percentage-based heights in the application
    */
    html, body {
        height: 100%;
    }
    /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
    */
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }
    /*
    6. Improve media defaults
    */
    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }
    /*
    7. Remove built-in form typography styles
    */
    input, button, textarea, select {
        font: inherit;
    }
    /*
    8. Avoid text overflows
    */
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }
    /*
    9. Create a root stacking context
    */
    #root, #__next {
        isolation: isolate;
    }
`;
