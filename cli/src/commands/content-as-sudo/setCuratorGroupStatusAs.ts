import ContentDirectoryCommandBase from '../../base/ContentDirectoryCommandBase'
import chalk from 'chalk'
import ExitCodes from '../../ExitCodes'

type ContentSetCuratorGroupStatusCommandAsArgs = {
  asWho: string,
  id: any,
  status: any
}


export default class SetCuratorGroupStatusCommandAsSudo extends ContentDirectoryCommandBase {
  static description = 'Set Curator Group status (Active/Inactive).'
  static args = [
    {
      name: 'asWho',
      required: true,
      description: 'Address to sudoAs',
    },
    {
      name: 'id',
      required: false,
      description: 'ID of the Curator Group',
    },
    {
      name: 'status',
      required: false,
      description: 'New status of the group (1 - active, 0 - inactive)',
    },
  ]

  async run() {
    const sudoKey = await this.getRequiredSelectedAccount()
    

    const args: ContentSetCuratorGroupStatusCommandAsArgs = this.parse(SetCuratorGroupStatusCommandAsSudo).args as ContentSetCuratorGroupStatusCommandAsArgs

    const account = args.asWho
    let id = args.id
    let status = args.status

    await this.requireLeadAsSudo(account)

    if (id === undefined) {
      id = await this.promptForCuratorGroup()
    } else {
      await this.getCuratorGroup(id)
    }

    if (status === undefined) {
      status = await this.simplePrompt({
        type: 'list',
        message: 'Select new status',
        choices: [
          { name: 'Active', value: true },
          { name: 'Inactive', value: false },
        ],
      })
    } else {
      if (status !== '0' && status !== '1') {
        this.error('Invalid status provided. Use "1" for Active and "0" for Inactive.', {
          exit: ExitCodes.InvalidInput,
        })
      }
      status = !!parseInt(status)
    }

    await this.requestAccountDecoding(sudoKey)
    await this.sendAndFollowNamedSudoAsTx(sudoKey, account, 'content', 'setCuratorGroupStatus', [id, status])

    console.log(
      chalk.green(
        `Curator Group ${chalk.magentaBright(id)} status succesfully changed to: ${chalk.magentaBright(
          status ? 'Active' : 'Inactive'
        )}!`
      )
    )
  }
}
