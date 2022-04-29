import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import PostType from '../types/post'
import styles from './post-header.module.scss';

type Props = {
  post: PostType
}

const PostHeader = ({ post }: Props) => {
  const { title, introduction, categories, publishedAt  } = post;
  return (
    <div className={`${styles.border} max-w-2xl mx-auto`}>
      <PostTitle>{title}</PostTitle>
      <p className='mt-10 leading-7'>{introduction}</p>
      <div className="mt-10 mb-6 text-lg flex justify-between">
        <div>
          {categories.map(category => (
            <span
              key={category}
              className="inline-block py-1 px-2 mr-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
              {category}
            </span>
          ))}
        </div>
        <div>
          <span>公開日:</span>
          <DateFormatter dateString={publishedAt} />
        </div>
      </div>
    </div>
  )
}

export default PostHeader
