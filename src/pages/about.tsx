import fs from 'fs'

import { GetStaticProps } from 'next'

import { swit } from '@sharyn/util'
import yaml from 'js-yaml'
import { omit } from 'lodash'

const AboutPage = ({ foo }) => <div>About, {foo}</div>

export const getStaticProps: GetStaticProps = async () => {
  // Be careful of .DS_Store files that break the parsing of all files in the folders
  const countries = fs.readdirSync('data/countries').map((fileName) => {
    const [, id] = fileName.match(/.* (.*)\.md/)
    const md = fs.readFileSync(`data/countries/${fileName}`).toString()
    const [, name] = md.match(/# (.*)\n/)
    const emoji = swit(
      name,
      ['France', '🇫🇷'],
      ['Portugal', '🇵🇹'],
      ['Spain', '🇪🇸'],
      ['Thailand', '🇹🇭'],
      ['Vietnam', '🇻🇳'],
      ['Hong Kong', '🇭🇰'],
      ['Singapore', '🇸🇬'],
      ['South Korea', '🇰🇷'],
      ['Hungary', '🇭🇺'],
      ['Bulgaria', '🇧🇬'],
      ['Serbia', '🇷🇸'],
      ['Ukraine', '🇺🇦'],
      ['Poland', '🇵🇱'],
      ['Italy', '🇮🇹'],
      ['Indonesia', '🇮🇩'],
      ['Malaysia', '🇲🇾'],
      '😥'
    )
    return { fileName, id, name, emoji }
  })
  const cities = fs.readdirSync('data/cities').map((fileName) => {
    const [, id] = fileName.match(/.* (.*)\.md/)
    const md = fs.readFileSync(`data/cities/${fileName}`).toString()
    const [, name] = md.match(/# (.*)\n/)
    const yamlData = yaml.safeLoad(md)
    const cleanedUpData = { countryId: yamlData.Country.match(/.*-(.*)$/)[1] }
    return { fileName, id, name, ...cleanedUpData }
  })
  const trips = fs.readdirSync('data/trips').map((fileName) => {
    const [, id] = fileName.match(/.* (.*)\.md/)
    const md = fs.readFileSync(`data/trips/${fileName}`).toString()
    const yamlData = yaml.safeLoad(md)
    const cleanedUpData = {
      arrivalTransport: yamlData['Arrival Transport'] ?? null,
      departureTransport: yamlData['Departure Transport'] ?? null,
      days: yamlData.Days,
      fromDate: new Date(yamlData.From),
      toDate: new Date(yamlData.To),
      from: yamlData.From,
      to: yamlData.To,
      countryId: yamlData.Country.match(/.*-(.*)$/)[1],
      cityId: yamlData.City.match(/.*-(.*)$/)[1],
    }
    return { fileName, id, ...cleanedUpData }
  })
  const tripsWithCities = trips
    .sort((a, b) => b.fromDate.getTime() - a.fromDate.getTime())
    .map((t) => ({
      ...omit(t, 'fromDate', 'toDate'),
      city: cities.find((c) => c.id === t.cityId).name,
      country: countries.find((c) => c.id === t.countryId).name,
      emoji: countries.find((c) => c.id === t.countryId).emoji,
    }))
  return { props: { trips: tripsWithCities, foo: 'bar' } }
}

export default AboutPage
