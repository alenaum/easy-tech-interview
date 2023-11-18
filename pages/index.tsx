import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import { getAllDocs } from '../lib/markdownService'
import DocViewModel from '../interfaces/docViewModel'
import Card from '../components/card'

type Props = {
  allDocs: DocViewModel[]
}

export default function Index({ allDocs }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Easy Tech Interview</title>
        </Head>
        <Container>
          <Intro />
          <Card redirectToPath='/docs' />
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allDocs = await getAllDocs();
  return {
    props: { allDocs },
  }
}

