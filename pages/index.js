import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';

const Index = ({ stories, page }) => {
  if (!stories.length) return <Error statusCode={503} />;

  return (
    <Layout
      title="Hacker Next"
      description="A Hacker News clone made with Next.js"
    >
      <StoryList stories={stories} />

      <footer>
        <Link href={`/?page=${page + 1}`}>
          <a>Next page ({page + 1})</a>
        </Link>
      </footer>

      <style jsx>{`
        footer {
          padding: 1em;
        }

        footer a {
          font-weight: bold;
          color: black;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async (context) => {
  const { req, res, query } = context;
  let stories;
  let page;

  try {
    page = Number(query.page) || 1;
    const res = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    );
    stories = await res.json();
  } catch (e) {
    console.log(e);
    stories = [];
  }

  return { stories, page };
};

export default Index;
