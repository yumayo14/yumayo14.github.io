import DateFormatter from './date-formatter'
import Link from 'next/link'

type Props = {
  id: string
  title: string
  categories: string[]
  introduction: string
}

const Post = ({
  id,
  title,
  categories,
  introduction,
}: Props) => {
  return (
    <div className="p-12 md:w-1/2 flex flex-col items-start">
      <div className="flex items-center flex-wrap border-b-2 border-gray-100  hover:shadow-md mt-auto w-full">
        <Link as={`/posts/${id}`} href="/posts/[slug]">
        <a className='px-6 py-4'>
          {categories.map(category => (
            <span className="inline-block py-1 px-2 mr-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
              {category}
            </span>
          ))}
          <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{title}</h2>
          <p className="leading-relaxed mb-8">{introduction}</p>
        </a>
        </Link>
      </div>
    </div>
  )
}

export default Post
