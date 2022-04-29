import fs from 'fs'
import { join } from 'path'
import { options } from './contentful/options'
import * as contentful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const postsDirectory = join(process.cwd(), '_posts')

const client = contentful.createClient({
  space: (process.env.CONTENTFUL_SPACE as string),
  environment: (process.env.CONTENTFUL_ENVIRONMENT as string), // defaults to 'master' if not set
  accessToken: (process.env.CONTENTFUL_ACCESS_TOKEN as string),
});

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export async function getPostById(id: string) {
  const post: any = await client.getEntry(id)

  return {
    id: post.sys.id,
    title: post.fields.title,
    categories: post.fields.categories,
    introduction: post.fields.introduction,
    body: documentToHtmlString(post.fields.body, options),
    publishedAt: post.sys.createdAt
  }
}

export async function getAllPosts(fields: string[] = []) {
  const entries = await client.getEntries({
    content_type: 'post',
  })

  return decoratePosts(entries)
}

function decoratePosts(data: any) {
  const posts = data.items.map((post: any) => (
    {
      id: post.sys.id,
      title: post.fields.title,
      categories: post.fields.categories,
      introduction: post.fields.introduction,
      body: documentToHtmlString(post.fields.body),
    }
  ));

  return posts;
}
