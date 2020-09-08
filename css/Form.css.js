import css from 'styled-jsx/css'

export default css`
  .login-modal {
    min-height: 0;
    width: 450px;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 8px;
    margin: 0 auto;
    position: relative;
    flex-shrink: 0;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 40px 36px;
    height: auto;
    min-height: 350px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header .material-icons {
    font-size: 3rem;
    margin-right: .5rem;
    color:hsl(180,100%,25.1%);
    text-shadow: 0px 4px 10px hsla(0, 0%, 54.9%,.8);
  }

  h1 {
    font-weight: normal;
    letter-spacing: .65rem;
    color: hsl(0, 0%, 23%);
    margin-top: 0;
    margin-bottom: 0;
  }

  h2 {
    font-weight: 400;
    color: hsl(0, 0%, 35%);
    margin-bottom: 0;
  }

  form {
    padding-top: 1.75rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .button-container {
    margin-top: 1.75rem;
    align-items: center;
  }

  .button-container a{
    color: hsl(180,100%,25.1%);
    text-decoration: none;
    font-weight: 500;
  }

  button {
    margin-left: auto;
    color: white;
    background-color: hsl(180,100%,25.1%);
    border: none;
    box-shadow:
      0px 3px 1px -2px rgba(0,0,0,0.2),
      0px 2px 2px 0px rgba(0,0,0,0.14),
      0px 1px 5px 0px rgba(0,0,0,0.12);
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    transition:
      background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
  }

  button:hover {
    box-shadow:
      0px 2px 4px -1px rgba(0,0,0,0.2),
      0px 4px 5px 0px rgba(0,0,0,0.14),
      0px 1px 10px 0px rgba(0,0,0,0.12);
    cursor: pointer;
  }

  .input-field {
    width: 100%;
    margin-top: 1rem;
  }

  /* target Material-UI global styles */
  .input-field :global(.MuiFormLabel-root.Mui-focused){
    color: hsl(180,100%,25.1%);
  }

  .input-field :global(.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline){
    border-color: hsl(180,100%,25.1%);
  }

  .row {
    display: flex;
    width: 100%;
  }
`;
