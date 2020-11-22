import UploadMultiVideoCommand from "./main"
import { input } from "./inputs"

const uploads = input.length

async function main() {
  for (let i = 0; i<uploads; i++) {
    console.log("uploading video", i, input[i].title)
    try {
      await UploadMultiVideoCommand.run([i.toString()])
    }
    catch (err) {
    }
  }
}
main()