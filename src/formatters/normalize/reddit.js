export function normalizeReddit (posts) {
  const result = {
    submissions: [],
    comments: []
  }

  for (const submission of posts.submissions.data) {
    const media = submission.media && submission.media.oembed
      ? {
        author: submission.media.oembed.author_name || 'N/A',
        authorUrl: submission.media.oembed.author_url || 'N/A',
        url: submission.url
      }
      : {
        author: 'N/A',
        authorUrl: 'N/A',
        url: submission.url
      }

    result.submissions.push({
      id: submission.id,
      commentCount: submission.num_comments,
      crosspostCount: submission.num_crossposts || '?',
      score: submission.score,
      subredditSubscribersCount: submission.subreddit_subscribers || '?',
      awardsCount: submission.total_awards_received || '?',
      upvoteRatio: submission.upvote_ratio || '?',
      author: submission.author,
      createdOn: submission.created_utc,
      subreddit: submission.subreddit,
      isAd: submission.is_created_from_ads_ui || false,
      url: submission.full_link,
      media,
      title: submission.title || '?',
      body: submission.body || 'N/A'
    })
  }

  for (const comment of posts.comments.data) {
    const url = comment.permalink
      ? `https://www.reddit.com${comment.permalink}`
      : 'N/A'
    result.comments.push({
      id: comment.id,
      score: comment.score,
      awardsCount: comment.total_awards_received || '?',
      author: comment.author,
      createdOn: comment.created_utc,
      subreddit: comment.subreddit,
      url,
      body: comment.body,
      isStickied: comment.stickied
    })
  }

  return result
}