import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./config";
import { Cursor } from "./components/Cursor";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const [section, setsection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
  };

  return (
    <>
      <LoadingScreen
        started={started}
        setStarted={setStarted}
        onDomainSelect={handleDomainSelect}
      />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas shadows camera={{ position: [-18, 10, 15], fov: 80 }}>
          <directionalLight
            castShadow
            position={[5, 15, 25]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0001}
            shadow-normalBias={0.02}
          />
          <ambientLight intensity={1} />
          <color attach="background" args={["#ececec"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setsection} />
            <Scroll>
              <Suspense>
                <Experience
                  section={section}
                  menuOpened={menuOpened}
                  domain={selectedDomain}
                />
              </Suspense>
            </Scroll>
            <Scroll html>
              <Interface
                setsection={setsection}
                domain={selectedDomain} // Pass domain to Interface
              />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setsection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;
