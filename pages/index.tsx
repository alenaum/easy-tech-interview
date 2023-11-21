import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import { CMS_NAME, PROJECT_NAME } from '../lib/constants'
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
          <title>{PROJECT_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <Card redirectToPath='/docs/intro' />
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

