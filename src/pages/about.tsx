import { GetStaticProps } from 'next'

const AboutPage = ({ foo }) => <div>About, {foo}</div>

export const getStaticProps: GetStaticProps = async () => ({ props: { foo: 'bar' } })

export default AboutPage
