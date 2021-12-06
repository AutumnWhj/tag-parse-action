/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  getBranchByHead,
  getBranchByTag,
  getPraseByTag,
  getSyncBranch,
  getTagUrl
} from './utils'

import axios from 'axios'
// debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
const ref = github.context.ref
const pushPayload: any = github.context.payload

console.log('github.context', github.context)

async function run(): Promise<void> {
  try {
    const topRepository: string = core.getInput('repository')
    const githubToken: string = core.getInput('githubToken')
    const type: string = core.getInput('type')

    const branch = getBranchByHead(ref) || getBranchByTag(ref)

    const {repository} = pushPayload || {}
    const {full_name} = repository || {}
    const [, outRepository] = full_name.split('/')

    if (type === 'stringify') {
      const syncBranch = getSyncBranch(ref)

      const tagUrl = getTagUrl(topRepository || full_name)
      const timesTamp = new Date().getTime()

      const tagName = `release/${timesTamp}&branch=${branch}&syncBranch=${syncBranch}&repository=${outRepository}`

      console.log('tagName: ', tagName)
      const ret = await axios({
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'content-type': 'application/json',
          Authorization: `Bearer ${githubToken}`
        },
        url: tagUrl,
        data: {
          tag_name: tagName,
          body: tagName
        }
      })
      console.log('ret------: ', ret.data)
    }
    if (type === 'parse') {
      const tagInfo: any = getPraseByTag(ref)
      const {
        branch: tagBranch,
        syncBranch: tagSyncBranch,
        repository: tagRepository
      } = tagInfo || {}
      console.log('tagSyncBranch: ', tagSyncBranch)
      console.log('branch----', tagBranch)
      console.log('outRepository----', tagRepository)
      console.log('outRepository----', tagRepository)

      core.exportVariable('BRANCH', tagBranch)
      core.exportVariable('syncBranch', tagSyncBranch)
      core.exportVariable('REPOSITORY', tagRepository)
    }
  } catch (error) {
    const e: any = error
    core.setFailed(e.message)
  }
}
run()
