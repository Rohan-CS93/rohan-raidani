import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const web = [
  {
    title: "Movie-Store",
    url: "https://movie-store-nu-seven.vercel.app/",
    image: "projects/web/one.png",
    description: "First MERN website",
  },
  {
    title: "Wallet Wise",
    url: "https://wallet-wise-lilac.vercel.app/",
    image: "projects/web/two.png",
    description: "MERN website with CRUD operations",
  },
  {
    title: "Car Rental",
    url: "https://car-rental-kohl-ten.vercel.app/",
    image: "projects/web/three.png",
    description: "MERN site for car dealers",
  },
  {
    title: "Poke Quest",
    url: "https://poke-quest.vercel.app/",
    image: "projects/web/four.png",
    description: "Pokemon Quiz with React-three-fiber",
  },
  {
    title: "Haunted House",
    url: "https://haunted-house-flame.vercel.app/",
    image: "projects/web/five.png",
    description: "Practicing three.js",
  },
  {
    title: "Shirtzz",
    url: "https://shirtzz.vercel.app/",
    image: "projects/web/six.png",
    description: "Shirt designing using threejs",
  },
];

export const app = [
  {
    title: "Food-App",
    url: "https://github.com/Rohan-Raidani/FoodApplication-Random-Name-",
    image: "projects/app/one.png",
    description: "A food ordering application using json data",
  },
  {
    title: "BookHub",
    url: "https://github.com/Rohan-Raidani/BookHub",
    image: "projects/app/two.png",
    description: "A book application using json data",
  },
  {
    title: "Contacts",
    url: "https://github.com/Rohan-Raidani/Firebase ",
    image: "projects/app/three.png",
    description: "A contact application based on firebase",
  },
];
export const cyber = [
  {
    title: "Udemy",
    url: "https://www.linkedin.com/in/rohan-raidani-59b57923b/",
    image: "projects/cyber/one.png",
    description: "Certificate on computer networks",
  },
  {
    title: "NPTEL",
    url: "https://www.linkedin.com/in/rohan-raidani-59b57923b/",
    image: "projects/cyber/two.png",
    description: "Certificate on ethical hacking",
  },
];

// Add domain atom to manage current domain
export const currentDomainAtom = atom('web');

// Update getProjectsByDomain to accept domain parameter
export const getProjectsByDomain = (domain) => {
  switch (domain) {
    case 'app':
      return app;
    case 'cyber':
      return cyber;
    case 'web':
    default:
      return web;
  }
};

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(0);

// Remove default value from props
export const Projects = ({ domain }) => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);
  
  // Get projects for the current domain
  const projects = getProjectsByDomain(domain);

  return (
    <group 
      position-y={-viewport.height * 2 + 7} 
      scale={5} 
      rotation={[0, -0.9, 0]}
      position-z={7} 
      position-x={-8}
    >
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
