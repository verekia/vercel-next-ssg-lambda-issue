import { GetStaticProps } from 'next'

// @ts-ignore
import doesntexist from 'doesntexist'

const AboutPage = () => <div>About</div>

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default AboutPage
