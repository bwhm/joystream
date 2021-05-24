import ContentDirectoryCommandBase from '../../base/ContentDirectoryCommandBase'
import chalk from 'chalk'

type SudoAs = {
  asWho: string
}

export default class CreateCuratorGroupCommandAsSudo extends ContentDirectoryCommandBase {
  static description = 'Create new Curator Group.'
  static args = [
    {
      name: 'asWho',
      required: true,
      description: 'Address to sudoAs',
    },
  ]

  async run() {
    const args: SudoAs = this.parse(CreateCuratorGroupCommandAsSudo).args as SudoAs
    const sudoKey = await this.getRequiredSelectedAccount()
    const account = args.asWho
    await this.getRequiredLeadAsSudo(account)

    await this.requestAccountDecoding(sudoKey)
    await this.buildAndSendSudoAsExtrinsic(sudoKey, account, 'content', 'createCuratorGroup')

    const newGroupId = (await this.getApi().nextCuratorGroupId()) - 1
    console.log(chalk.green(`New group succesfully created! (ID: ${chalk.magentaBright(newGroupId)})`))
  }
}