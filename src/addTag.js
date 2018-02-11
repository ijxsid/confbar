import cliArgs from 'command-line-args'
import { addTech, editVideo } from './api'

const cliOptionDefinitions = [
  { name: 'name', alias: 'n', type: String },
  { name: 'website', alias: 'w', type: String },
  { name: 'twitter', alias: 't', type: String },
  { name: 'repo', alias: 'r', type: String },
  { name: 'description', alias: 'd', type: String },
  { name: 'blog', alias: 'b', type: String },
  { name: 'logo', alias: 'l', type: String },
  { name: 'video', alias: 'v', type: String }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})


async function main () {
  const res = await addTech(cliOptions)
  let res2
  if (cliOptions.video) {
    res2 = await editVideo(cliOptions.video, {tags: [res._id]})
  }

  console.log(res, res2)
}

main()