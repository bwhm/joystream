import UploadMultiVideoCommand from "./main"
import { input } from "./inputs"

const uploads = input.length

async function main() {
  for (let i = 0; i<uploads; i++) {
    const upload = await UploadMultiVideoCommand.run([i.toString()])
    if (typeof upload == "boolean") {
      if (upload == true) {
        console.log("success!:", upload, i, input)
      } else {
        console.log("abort (false):", upload, i)
        break
      }
    } else {
      console.log("abort (nonbool):", upload)
      break
    }
  }
}
main()