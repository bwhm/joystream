import ContentDirectoryCommandBase from '../../base/ContentDirectoryCommandBase'
import chalk from 'chalk'

type ContentAddCuratorToGroupCommandAsArgs = {
  asWho: string,
  groupId: any,
  curatorId: any
}

export default class AddCuratorToGroupCommandAsSudo extends ContentDirectoryCommandBase {
  static description = 'Add Curator to existing Curator Group.'
  static args = [
    {
      name: 'asWho',
      required: true,
      description: 'Address to sudoAs',
    },
    {
      name: 'groupId',
      required: false,
      description: 'ID of the Curator Group',
    },
    {
      name: 'curatorId',
      required: false,
      description: 'ID of the curator',
    },
  ]

  async run() {
    const sudoKey = await this.getRequiredSelectedAccount()
    

    const args: ContentAddCuratorToGroupCommandAsArgs = this.parse(AddCuratorToGroupCommandAsSudo).args as ContentAddCuratorToGroupCommandAsArgs

    const account = args.asWho
    let groupId = args.groupId
    let curatorId = args.curatorId

    await this.requireLeadAsSudo(account)
    

    if (groupId === undefined) {
      groupId = await this.promptForCuratorGroup()
    } else {
      await this.getCuratorGroup(groupId)
    }

    if (curatorId === undefined) {
      curatorId = await this.promptForCurator()
    } else {
      await this.getCurator(curatorId)
    }

    await this.requestAccountDecoding(sudoKey)
    await this.sendAndFollowNamedSudoAsTx(sudoKey, account, 'content', 'addCuratorToGroup', [groupId, curatorId])

    console.log(
      chalk.green(
        `Curator ${chalk.magentaBright(curatorId)} succesfully added to group ${chalk.magentaBright(groupId)}!`
      )
    )
  }
}
