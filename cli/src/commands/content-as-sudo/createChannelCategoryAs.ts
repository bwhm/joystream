import ContentDirectoryCommandBase from '../../base/ContentDirectoryCommandBase'
import { getInputJson } from '../../helpers/InputOutput'
import { ChannelCategoryInputParameters } from '../../Types'
import { channelCategoryMetadataFromInput, metadataToBytes } from '../../helpers/serialization'
import { flags } from '@oclif/command'
import { CreateInterface } from '@joystream/types'
import { ChannelCategoryCreationParameters } from '@joystream/types/content'
import { ChannelCategoryInputSchema } from '../../json-schemas/ContentDirectory'

type SudoAs = {
  asWho: string
}

export default class CreateChannelCategoryCommandAsSudo extends ContentDirectoryCommandBase {
  static description = 'Create channel category inside content directory.'
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
    const args: SudoAs = this.parse(CreateChannelCategoryCommandAsSudo).args as SudoAs
    const { context, input } = this.parse(CreateChannelCategoryCommandAsSudo).flags

    const sudoKey = await this.getRequiredSelectedAccount()
    const currentAccount = args.asWho
    await this.requestAccountDecoding(sudoKey)

    const actor = context ? await this.getSudoAsActor(currentAccount,context) : await this.getCategoryManagementActor()

    const channelCategoryInput = await getInputJson<ChannelCategoryInputParameters>(input, ChannelCategoryInputSchema)

    const meta = channelCategoryMetadataFromInput(channelCategoryInput)

    const channelCategoryCreationParameters: CreateInterface<ChannelCategoryCreationParameters> = {
      meta: metadataToBytes(meta),
    }

    this.jsonPrettyPrint(JSON.stringify(channelCategoryInput))

    await this.requireConfirmation('Do you confirm the provided input?', true)

    await this.sendAndFollowNamedSudoAsTx(sudoKey, currentAccount, 'content', 'createChannelCategory', [
      actor,
      channelCategoryCreationParameters,
    ])
  }
}
