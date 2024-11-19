import React from 'react'
import {motion} from 'framer-motion'

export const About = (props) => {
  const {setsection,domain} = props

  const about = [
    {
      domain:"web",
      p1:"I am a Web Developer",
      p2:"I can make 3d projects",
    },
    {
      domain:"app",
      p1:"I am an Android App developer",
      p2:"I can make firebase projects",
    },
    {
      domain:"cyber",
      p1:"I am a newbie in this field",
      p2:"I am looking for suggestions",
    },
  ]

  const selected  = about.find(item => item.domain === domain) || about[2]
  return (<>
    <h1 className="text-4xl md:text-6xl font-extrabold leading-relaxed mt-7 mb-4 md:mt-0">
        Hi, I'm
        <br /></h1>
        <h1>  <span className="bg-white px-1 bg-opacity-70 italic text-4xl md:text-6xl font-extrabold mt-4">Rohan Raidani</span></h1>
      
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.7,
        }}
      >
        {/* I make YouTube videos to help developers */
        selected.p1}
        
        <br />
        {/* learn how to build 3D apps */
        selected.p2}
      </motion.p>
      <motion.button
      onClick={() => setsection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 1.2,
        }}
      >
        Contact me
      </motion.button>
    </>
  )
}

