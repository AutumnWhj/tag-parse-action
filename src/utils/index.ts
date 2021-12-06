/* eslint-disable github/array-foreach */

export const getBranchByHead = (ref: string): string => {
  if (ref.includes('refs/heads/')) {
    return ref.replace('refs/heads/', '')
  }
  return ''
}

export const getBranchByTag = (ref: string): string => {
  if (ref.includes('refs/tags/release/')) {
    const commitMsg = ref.replace('refs/tags/', '')
    const index = commitMsg.lastIndexOf('-v')
    return commitMsg.slice(0, index)
  }
  return ''
}

export const getPraseByTag = (ref: string): {} => {
  if (ref.includes('refs/tags/release/')) {
    const willString = ref.replace('refs/tags/release/', '')
    const arr = (willString || '').split('&')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}
    arr.forEach(item => {
      const [key, value] = (item || '').split('=')
      if (value) {
        obj[key] = value
      }
    })
    return obj
  }
  return {}
}
export const getTagUrl = (repository: string): string => {
  return `https://api.github.com/repos/${repository}/releases`
}

// release/dingding-dev-v0.1.3-2021-12-06
export const getSyncBranch = (ref: string): string => {
  if (ref.includes('refs/heads/')) {
    return ref.replace('refs/heads/', '')
  }
  if (ref.includes('refs/tags/release/')) {
    const commitMsg = ref.replace('refs/tags/', '')
    const index = commitMsg.lastIndexOf('-dev-v')
    return commitMsg.slice(0, index)
  }
  return ''
}
