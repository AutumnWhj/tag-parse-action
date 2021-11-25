export const getTiggerBranch = (ref: string): string => {
  if (ref.includes('refs/heads/')) {
    return ref.replace('refs/heads/', '')
  }
  return ''
}
export const getStringfyTag = (payload: {}): string => {
  return `release/${JSON.stringify(payload)}`
}
export const getPraseByTag = (ref: string): {} => {
  if (ref.includes('refs/tags/release/')) {
    const willUse = ref.replace('refs/tags/release/', '')
    return JSON.parse(willUse)
  }
  return {}
}
