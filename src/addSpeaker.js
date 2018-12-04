import cliArgs from 'command-line-args'
import { addSpeaker, editVideo } from './api'

const cliOptionDefinitions = [
  { name: 'name', alias: 'n', type: String },
  { name: 'twitterUsername', alias: 't', type: String },
  { name: 'github', alias: 'g', type: String },
  { name: 'website', alias: 'w', type: String },
  { name: 'blog', alias: 'b', type: String },
  { name: 'video', alias: 'v', type: String }
]

const cliOptions = cliArgs(cliOptionDefinitions, {partial: true})


async function main () {
  const res = await addSpeaker(cliOptions)
  let res2
  if (cliOptions.video) {
    res2 = await editVideo(cliOptions.video, {speaker: res._id})
  }

  console.log(res, res2)
}

main()

