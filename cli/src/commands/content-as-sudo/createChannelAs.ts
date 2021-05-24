import { getInputJson } from '../../helpers/InputOutput'
import { ChannelInputParameters } from '../../Types'
import { metadataToBytes, channelMetadataFromInput } from '../../helpers/serialization'
import { flags } from '@oclif/command'
import { CreateInterface } from '@joystream/types'
import { ChannelCreationParameters } from '@joystream/types/content'
import { ChannelInputSchema } from '../../json-schemas/ContentDirectory'
import ContentDirectoryCommandBase from '../../base/ContentDirectoryCommandBase'
import UploadCommandBase from '../../base/UploadCommandBase'

type SudoAs = {
  asWho: string
}

export default class CreateChannelCommandAsSudo extends UploadCommandBase {
  static description = 'Create channel inside content directory.'
  static args = [
    {
      name: 'asWho',
      required: true,
      description: 'Address to sudoAs',
    },
  ]
  static flags = {
    context: ContentDirectoryCommandBase.ownerContextFlag,
    input: flags.string({
      char: 'i',
      required: true,
      description: `Path to JSON file to use as input`,
    })
  }

  async run() {
    const args: SudoAs = this.parse(CreateChannelCommandAsSudo).args as SudoAs
    let { context, input } = this.parse(CreateChannelCommandAsSudo).flags

    // Context
    if (!context) {
      context = await this.promptForOwnerContext()
    }
    const sudoKey = await this.getRequiredSelectedAccount()
    const account = args.asWho
    const actor = await this.getSudoAsActor(account,context)
    await this.requestAccountDecoding(sudoKey)

    const channelInput = await getInputJson<ChannelInputParameters>(input, ChannelInputSchema)

    const meta = channelMetadataFromInput(channelInput)
    const { coverPhotoPath, avatarPhotoPath } = channelInput
    const assetsPaths = [coverPhotoPath, avatarPhotoPath].filter((v) => v !== undefined) as string[]
    const inputAssets = await this.prepareInputAssets(assetsPaths, input)
    const assets = inputAssets.map(({ parameters }) => ({ Upload: parameters }))
    // Set assets indexes in the metadata
    if (coverPhotoPath) {
      meta.setCoverPhoto(0)
    }
    if (avatarPhotoPath) {
      meta.setAvatarPhoto(coverPhotoPath ? 1 : 0)
    }

    const channelCreationParameters: CreateInterface<ChannelCreationParameters> = {
      assets,
      meta: metadataToBytes(meta),
      reward_account: channelInput.rewardAccount,
    }

    this.jsonPrettyPrint(JSON.stringify({ assets, metadata: meta.toObject() }))

    await this.requireConfirmation('Do you confirm the provided input?', true)

    await this.sendAndFollowNamedSudoAsTx(sudoKey, account, 'content', 'createChannel', [actor, channelCreationParameters])

    await this.uploadAssets(inputAssets, input)
  }
}
