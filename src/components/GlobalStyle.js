import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  main {
    padding: 0px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .link, a {
    text-decoration: none;
    color: black;
  }

  // main 
  .css-1xffca4 {
    padding: 0px;
  }
`



export default GlobalStyle