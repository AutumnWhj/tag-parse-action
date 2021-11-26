/* eslint-disable github/array-foreach */
export const getTiggerBranch = (ref: string): string => {
  if (ref.includes('refs/heads/')) {
    return ref.replace('refs/heads/', '')
  }
  return ''
}

export const getPraseByTag = (ref: string): {} => {
  if (ref.includes('refs/tags/release/')) {
    const willString = ref.replace('refs/tags/release/', '')
    const arr = (willString || '').split('/')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}
    arr.forEach(item => {
      const [key, value] = (item || '').split('=')
      obj[key] = value
    })
    return obj
  }
  return {}
}
