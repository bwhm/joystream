import UploadMultiVideoCommand from "./main"
import { input } from "./inputs"

const uploads = input.length

for (let i = 0; i<uploads; i++) {
  UploadMultiVideoCommand.run([i.toString()])
}