import { BLOCKS, MARKS } from '@contentful/rich-text-types'

export const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
      const src = "https:" + node.data.target.fields.file.url
      const height = node.data.target.fields.file.details.height
      const width = node.data.target.fields.file.details.width
      return `<img src=${src} width=${width} height=${height} />`
    }
  }
}
