import { useRouter } from 'next/router'
import { getAllExistingDocPathSegments, getDocumentByUriSegments } from '../../lib/markdownService'
import ErrorPage from 'next/error'
import DocViewModel from '../../interfaces/docViewModel'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Header from '../../components/header'
import PostTitle from '../../components/post-title'
import PostBody from '../../components/post-body'
import { Head } from 'next/document'
import PostHeader from '../../components/post-header'

type Props = {
  doc: DocViewModel
  preview?: boolean
}

export default function Doc({doc, preview}: Props) {
  const router = useRouter()
  const { params = [] } = router.query

  if (!doc) {
    return <ErrorPage statusCode={404} />
  }

  return(
    <Layout preview={preview}>
    <Container>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32">
            {/* <Head>
              <title>{title}</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            /> */}
            <PostBody content={doc.content} />
          </article>
        </>
      )}
    </Container>
  </Layout>
  );

  return <h1>Docs Home Page</h1>
}

export async function getStaticProps(params) {
  var segments = params['params']['params'] as string[];

  var docViewModel = await getDocumentByUriSegments(segments);

  return {
    props: {
      doc: docViewModel,
    },
  }
}

export async function getStaticPaths() {
  const docs = getAllExistingDocPathSegments();

  return {
    paths: docs.map((doc) => {
      return {
        params: {
          params: doc,
        },
      }
    }),
    fallback: false,
  }
}

