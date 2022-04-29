import Link  from 'next/link';

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16">
      <Link href='/'>
        <a className="text-3xl font-bold tracking-tighter leading-tight md:pr-8">
          モア日記
        </a>
      </Link>
    </section>
  )
}

export default Intro
