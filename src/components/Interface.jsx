import React from 'react'
import { About } from './About'
import { Skills } from './Skills'
import { Contact } from './Contact'

import {motion} from 'framer-motion'
import { ProjectCard } from './ProjectCard'

const Section = (props) => {
    const {children,mobileTop} = props

    return (
    <motion.section className={`
        h-screen w-screen p-10 md:p-28 max-w-screen-2xl mx-auto
        flex flex-col items-start 
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
    `}
    initial={{
        opacity:0,
        y:50,
    }}
    whileInView={{
        opacity:1,
        y:0,
        transition:{
            duration:0.6,
            delay:0.2
        }
    }}
    >
        {children}
    </motion.section>)    
}

export const Interface = (props) => {
    const {setsection,domain} = props
  return (<div className='flex flex-col items-center w-screen '>
    <Section mobileTop>
        <About setsection = {setsection} domain = {domain}/>
    </Section>
    <Section>
        <Skills domain = {domain}/>
    </Section>
    <Section>
        <ProjectCard domain = {domain}/>
    </Section>
    <Section>
        <Contact/>
    </Section>
    </div>
  )
}
