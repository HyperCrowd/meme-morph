import { normalizeReddit } from "../normalize/reddit"

export function redditToText (posts) {
  posts = normalizeReddit(posts)

  let submissions = `SUBMISSIONS
===========
`
  let comments = `COMMENTS
========
`

  for (const submission of posts.submissions) {
    submissions += `ID: ${submission.id}
Comment Count: ${submission.commentCount}
Crosspost Count: ${submission.crosspostCount}
Score: ${submission.score}
Subreddit Subscription Count: ${submission.subredditSubscribersCount}
Award Count: ${submission.awardsCount}
Upvote Ratio: ${submission.upvoteRatio}
Created On: ${submission.createdOn}
Is Ad?: ${submission.isAd}
Subreddit: ${submission.subreddit}
URL: ${submission.url}
Media URL: ${submission.media.url}
Media Author URL: ${submission.media.authorUrl}
Media Author: ${submission.media.author}
Author: ${submission.author}
Title: ${submission.title}
Body: ${submission.body}
\n`
  }

  for (const comment of posts.comments) {
    comments += `ID: ${comment.id}
Score: ${comment.score}
Award Count: ${comment.awardsCount}
Created On: ${comment.createdOn}
Subreddit: ${comment.subreddit}
Is Stickied?: ${comment.isStickied}
URL: ${comment.url}
Author: ${comment.author}
Body: ${comment.body}
\n\n`
  }
 
  return `${submissions}
${comments}`
}
