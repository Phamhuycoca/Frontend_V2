import { Button } from "antd";
import { useState } from "react";
import GridExample from "./Components/Agrid/GridExample";
import { LinkPreview } from "./Components/LinkPreview/LinkPreview";
function App() {
  const [count, setCount] = useState(0);
  const VITE = import.meta.env.VITE;

  return (
    <>
      <Button
        type="primary"
        onClick={() => setCount(count + 1)}
        className="mt-5"
      >
        count is: {count}
      </Button>
       <div>VITE: {VITE}</div>
      <div>VITE_API_URL: {import.meta.env.VITE_API_URL}</div>
      <div>VITE_API_KEY: {import.meta.env.VITE_API_KEY}</div>
      <GridExample />
      {/* <LinkPreview /> */}
      <LinkPreview />
    </>
  );
}

export default App;
