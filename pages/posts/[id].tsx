import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostById, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import Header from '../../components/header'
import { CMS_NAME } from '../../lib/constants'
import PostType from '../../types/post'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="my-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
              </Head>
              <PostHeader
                post={post}
              />
              <PostBody content={post.body} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostById(params.id)

  return {
    props: {
      post: {
        ...post,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          id: post.id,
        },
      }
    }),
    fallback: false,
  }
}
