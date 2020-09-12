import { GetStaticProps } from 'next'

import { swit } from '@sharyn/util'

const AboutPage = () => <div>About</div>

export const getStaticProps: GetStaticProps = async () => {
  swit('', '')
  return { props: {} }
}

export default AboutPage
