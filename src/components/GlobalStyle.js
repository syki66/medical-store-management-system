import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .link {
    text-decoration: none;
    color: black;
  }

`


export default GlobalStyle