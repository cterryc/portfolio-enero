import { ModeToggle } from '@/components/mode-toggle'
import { AboutMe } from '@/components/about-me'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Education } from '@/components/edutacion'
import { Contact } from '@/components/contact'
import Footer from '@/components/footer'
import { Experience } from '@/components/experience'
import Resume from '@/components/resume'

export default function Home() {
  return (
    <main className='container mx-auto p-4 sm:max-w-7xl'>
      <div className='flex justify-between mb-8'>
        <div>
          <h2 className='text-3xl font-bold'>Daniel Martel</h2>
          <h2>{`${'<Full-Stack />'}`}</h2>
        </div>
        <div className='flex items-start gap-1'>
          <ModeToggle />
          <Resume />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4'>
        <Skills />
        <AboutMe />
        <Experience />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
