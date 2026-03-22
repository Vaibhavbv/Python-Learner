import { s01 } from './s01'
import { s02 } from './s02'
import { s03 } from './s03'
import { s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15 } from './s04-s15'

export const ALL_SECTIONS = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15]

export const TOPICS_MAP = ALL_SECTIONS.reduce((acc, section) => {
  section.topics.forEach(topic => {
    acc[topic.id] = { ...topic, sectionTitle: section.title, sectionId: section.id }
  })
  return acc
}, {})
