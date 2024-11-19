import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";

import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";

import { Avatar } from "./Avatar";
import { Office } from "../components/Office";
import * as THREE from "three";
import { Projects } from "./Projects";
import { Background } from "./Background";

// position={[15,-8,5]}
export const Experience = (props) => {
  // const {section,menuOpened} = props
  const { menuOpened, domain } = props;

  const [animationStarted, setAnimationStarted] = useState(false);

  // Start animations only when a domain is selected
  useEffect(() => {
    if (domain) {
      setAnimationStarted(true); // Start animations when domain is selected
    }
  }, [domain]);

  // console.log(domain);

  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 780;
  const responsiveRatio = viewport.width / 12;
  // console.log(responsiveRatio);

  const officeScaleRatio = Math.max(1, Math.min(0.19 * responsiveRatio, 1.3));
  // console.log(officeScaleRatio);

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -35 : -16, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 400);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    // const position = new THREE.Vector3();

    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
      // characterGroup.current.position.z -= 0.3;
      if (!isMobile) {
        characterGroup.current.position.x += 1;
        characterGroup.current.position.y += 0.2;
      }
      characterGroup.current.position.x += 0.2;
      characterGroup.current.position.y += 0.01;
    }
    // console.log([position.x,position.y,position.z]);

    // const quaternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion)
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion,"XYZ")

    // console.log(euler.x, euler.y, euler.z);
  });

  return (
    <>
      <Background />
      <motion.group
        ref={characterGroup}
        // position={[8.647500000000001, -7.9, 3.35625]}
        // scale={8}
        rotation={[-3.141592653589793, -1, -3.141592653589793]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: isMobile ? 4 : 6.17 * officeScaleRatio,
            scaleY: isMobile ? 4 : 6.17 * officeScaleRatio,
            scaleZ: isMobile ? 4 : 6.17 * officeScaleRatio,
          },
          1: {
            scaleX: 12,
            scaleY: 12,
            scaleZ: 12,
            y: -viewport.height * 1.3 + 0.5,
            x: 10,
            z: 0,
            rotateX: 0,
            rotateY: -0.5,
            rotateZ: 0,
          },
          2: {
            scaleX: 4.5,
            scaleY: 4.5,
            scaleZ: 4.5,
            x: isMobile ? -7 : -15,
            y: -viewport.height * 2,
            z: isMobile ? -8 : -8,
            rotateX: -0.3,
            rotateY: Math.PI * 0.7,
            rotateZ: 0.2,
          },
          3: {
            scaleX: 11,
            scaleY: 11,
            scaleZ: 11,
            y: -viewport.height * 3.3,
            x: -5,
            z: 11,
            rotateX: -0.1,
            rotateY: -Math.PI * 0.2,
            rotateZ: 0,
          },
        }}
      >
        <Avatar
          animation={characterAnimation}
          wireframe={section === 1}
          domain={domain}
        />
      </motion.group>
      <ambientLight intensity={1.5} />
      <motion.group
        position={[
          isMobile ? -5 : 11.53 * officeScaleRatio,
          isMobile ? -viewport.height / 5 : -8,
          5,
        ]}
        scale={isMobile ? 0.6 : officeScaleRatio}
        // scale={ 1.25 * officeScaleRatio}
        //  rotation-y={-Math.PI/20}
        animate={{
          // y:section === 0 ? -8 : -10,
          y: isMobile ? -viewport.height / 5 : -8,
        }}
      >
        <Office section={section} />

        <group
          ref={characterContainerAboutRef}
          name="Empty"
          position={[-5.882, 0, -1.315]}
          rotation={[-Math.PI, -1, -Math.PI]}
          scale={6.62}
        ></group>
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[15, -1.5, 15]}
        animate={{
          z: section === 1 ? -12 : -15,
          y: section === 1 ? -viewport.height * 1.2 : -1.5,
        }}
        rotation={[0, 0, 0]}
      >
        {/* <directionalLight position={[-5, 3, 5]} intensity={0.4} /> */}
        <Float>
          <mesh position={[0, 7, -5]} scale={[4.5, 4.5, 4.5]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[8.5, 8.5, 8.5]} position={[30, 7, -5]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3.5, 3.5, 3.5]} position={[-4, 10, 0]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </motion.group>
      <Projects domain={domain} />
    </>
  );
};
