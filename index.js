import { presetWarp } from '@warp-ds/uno';
import { createAutocomplete } from '@unocss/autocomplete';
import { createGenerator } from "@unocss/core";

const tokens = await (await fetch('https://assets.finn.no/pkg/@warp-ds/tokens/v1/finn-no.css')).text()
console.log(tokens)
console.log(tokens.split(';').filter(t => t.startsWith('--w-s')))
//
// const getAllWarpClasses = async () => {
//   const uno = createGenerator({ presets: [presetWarp({ skipPreflight: true })] })
//   const ac = createAutocomplete(uno);
//   return Array.from(await ac.enumerate());
// }
//
// const f = await getAllWarpClasses()
// console.log(f.filter(e => !e.endsWith(':')).join('\n'))
