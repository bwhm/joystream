import ContentDirectoryCommandBase from '../../base/ContentDirectoryCommandBase'
import { getInputJson } from '../../helpers/InputOutput'
import { VideoCategoryInputParameters } from '../../Types'
import { metadataToBytes, videoCategoryMetadataFromInput } from '../../helpers/serialization'
import { flags } from '@oclif/command'
import { CreateInterface } from '@joystream/types'
import { VideoCategoryCreationParameters } from '@joystream/types/content'
import { VideoCategoryInputSchema } from '../../json-schemas/ContentDirectory'

type SudoAs = {
  asWho: string
}

export default class CreateVideoCategoryCommandAsSudo extends ContentDirectoryCommandBase {
  static description = 'Create video category inside content directory.'
  static args = [
    {
      name: 'asWho',
      required: true,
      description: 'Address to sudoAs',
    },
  ]
  static flags = {
    context: ContentDirectoryCommandBase.categoriesContextFlag,
    input: flags.string({
      char: 'i',
      required: true,
      description: `Path to JSON file to use as input`,
    }),
  }

  async run() {
    const args: SudoAs = this.parse(CreateVideoCategoryCommandAsSudo).args as SudoAs
    const { context, input } = this.parse(CreateVideoCategoryCommandAsSudo).flags
    
    const sudoKey = await this.getRequiredSelectedAccount()
    const currentAccount = args.asWho
    await this.requestAccountDecoding(sudoKey)

    const actor = context ? await this.getSudoAsActor(currentAccount,context) : await this.getCategoryManagementActor()

    const videoCategoryInput = await getInputJson<VideoCategoryInputParameters>(input, VideoCategoryInputSchema)

    const meta = videoCategoryMetadataFromInput(videoCategoryInput)

    const videoCategoryCreationParameters: CreateInterface<VideoCategoryCreationParameters> = {
      meta: metadataToBytes(meta),
    }

    this.jsonPrettyPrint(JSON.stringify(videoCategoryInput))

    await this.requireConfirmation('Do you confirm the provided input?', true)

    await this.sendAndFollowNamedSudoAsTx(sudoKey, currentAccount, 'content', 'createVideoCategory', [
      actor,
      videoCategoryCreationParameters,
    ])
  }
}