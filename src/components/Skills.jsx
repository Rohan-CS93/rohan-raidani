import React from 'react'
import { motion } from 'framer-motion';

export const Skills = (props) => {

  const {domain} = props
  const web = [
    {
      title: "Threejs / React Three Fiber",
      level: 80,
    },
    {
      title: "React / React Native",
      level: 90,
    },
    {
      title: "Nodejs",
      level: 90,
    },
    {
      title: "Typescript",
      level: 60,
    },
    {
      title: "3D Modeling",
      level: 40,
    },
  ];
  const app = [
    {
      title: "Firebase",
      level: 80,
    },
    {
      title: "Kotlin",
      level: 90,
    },
    {
      title: "Android Studios",
      level: 90,
    },
  ];
  const cyber = [
    {
      title: "Computer Networks",
      level: 50,
    },
    {
      title: "Kali",
      level: 60,
    },
  ];


  const languages = [
    {
      title: " Hindi",
      level: 100,
    },
    {
      title: "English",
      level: 80,
    },
  ];

  // Function to get skills based on domain
  const getSkillsByDomain = () => {
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

  // Get the appropriate skills array
  const currentSkills = getSkillsByDomain();
  

  return (
    <>
    <motion.div className='w-full' whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className=" mt-8 space-y-4">
          {currentSkills.map((skill, index) => (
            <div className="w-full  md:w-64" key={index}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">Languages</h2>
          <div className=" mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}

