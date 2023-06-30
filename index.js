import { presetWarp } from '@warp-ds/uno';
import { createAutocomplete } from '@unocss/autocomplete';
import { createGenerator } from "@unocss/core";
import fabricClasses from './fabric-classes.js'
import { classes as warpComponents } from '@warp-ds/component-classes/classes'

export const classes = [...fabricClasses.map(c => c.substring(1)), ...warpComponents]

const semanticMap = {
  'color-icon': 'icon',
  'color-text': 'text',
  'color-border': 'border',
  'color-background': 'bg'
}

const tokens = await (await fetch('https://assets.finn.no/pkg/@warp-ds/tokens/v1/finn-no.css')).text()
const interestingTokens = tokens.split(';').filter(t => t.startsWith('--w-s')).map(t => t.split(':')[0])
for (const [k, v] of Object.entries(semanticMap)) {
  const r = interestingTokens.filter(t => t.includes(k)).map(t => t.replace(`--w-s-`, '').replace(k, v))
  classes.push(...r)
}
const getAllWarpClasses = async () => {
  const uno = createGenerator({ presets: [presetWarp({ skipPreflight: true })] })
  const ac = createAutocomplete(uno);
  return Array.from(await ac.enumerate());
}
const f = await getAllWarpClasses()
const filtered = f.filter(e => !e.match(/[^a-z-]/)).join('\n')
classes.push(...filtered)

// const uno = createGenerator({ presets: [presetWarp({ skipPreflight: true })] })
// const results = await uno.generate(classes)
// console.log(results.matched.size)
