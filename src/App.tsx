import { Button } from "antd";
import { useState } from "react";
import MenuCp from "./Menu";
import GridExample from "./GridExample";
import PasteLinkDemo from "./PasteLinkDemo";
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
      <MenuCp />
      <div>VITE: {VITE}</div>
      <div>VITE_API_URL: {import.meta.env.VITE_API_URL}</div>
      <div>VITE_API_KEY: {import.meta.env.VITE_API_KEY}</div>
      <GridExample />
      <PasteLinkDemo />
      {/* <LinkPreview /> */}
      <LinkPreview />
    </>
  );
}

export default App;
