/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'
import Layout from '../components/common/layout'
import PostTags from '../components/blog/postTags'

const pageLayout = ({ data }) => {
  const { title, date, tags, slug } = data.markdownRemark.frontmatter
  const short = process.env.GATSBY_DISQUS_NAME

  const disqusConfig = {
    shortname: short,
    config: { identifier: slug, title },
  }

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <PostTags tags={tags} />
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html,
        }}
      />
      <DiscussionEmbed {...disqusConfig} />
    </Layout>
  )
}

pageLayout.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        tags: PropTypes.object.isRequired,
      }),
    }),
  }),
}

export default pageLayout

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        tags
      }
    }
  }
`
