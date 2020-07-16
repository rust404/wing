import React from "react";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App" style={{ width: "80vw", margin: "0 auto" }}>
      <header className="App-header">
        <Menu mode="vertical">
          <MenuItem disabled>123</MenuItem>
          <MenuItem itemKey="1" data-test="123">
            456
          </MenuItem>
          <MenuItem>789</MenuItem>
          <SubMenu title="hello1">
            <MenuItem>sub-1</MenuItem>
            <MenuItem>sub-2</MenuItem>
            <MenuItem>sub-3</MenuItem>
            <SubMenu title="hello2">
              <MenuItem>sub-1</MenuItem>
              <MenuItem>sub-2</MenuItem>
              <MenuItem>sub-3</MenuItem>
              <SubMenu title="hello3">
                <MenuItem>sub-1</MenuItem>
                <MenuItem>sub-2</MenuItem>
                <MenuItem>sub-3</MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
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
