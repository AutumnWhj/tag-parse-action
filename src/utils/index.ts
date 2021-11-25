export const getTiggerBranch = (ref: string): string => {
  if (ref.includes('refs/heads/')) {
    return ref.replace('refs/heads/', '')
  }
  return ''
}

export const getPraseByTag = (ref: string): {} => {
  if (ref.includes('refs/tags/release/')) {
    const willString = ref.replace('refs/tags/release/', '')
    const arr = willString.split('/')
    return (arr || []).map(item => {
      const [key, value] = item.split('=')
      return {
        [key]: value
      }
    })
  }
  return {}
}
