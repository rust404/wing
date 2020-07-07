import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>hello</Button>
        <Button btnType={ButtonType.Danger}>hello</Button>
        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>
          hello
        </Button>
        <Button
          onClick={() => console.log("hello, world")}
          size={ButtonSize.Small}
          btnType={ButtonType.Danger}
        >
          click
        </Button>
        <Button btnType={ButtonType.Primary}>hello</Button>
        <Button
          target="_blank"
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
        >
          link
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
