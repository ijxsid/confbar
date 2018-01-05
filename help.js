import clc from 'cli-color'

const bold = clc.bold
const blueBold = clc.blue.bold

console.log(bold("Confbar frontend Command reference:\n"))

console.log(`${blueBold("npm run dev")} - Run a developement server`)
console.log(`${blueBold("npm run build")} - Build for deployment`)
console.log(`${blueBold("npm run build:styles")} - Build the base styles from sass`)
console.log(`${blueBold("npm run start")} - Start the production server`)
console.log(`${blueBold("npm run help")} - Display this help screen`)
