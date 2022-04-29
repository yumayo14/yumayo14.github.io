import Container from '../components/container'
import PostCard from '../components/post'
import Header from '../components/header'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Header />
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-12">
                {allPosts.map(post => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    categories={post.categories}
                    introduction={post.introduction}
                  />
                ))}
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: { allPosts },
  }
}
