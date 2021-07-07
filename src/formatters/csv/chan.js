const quoteRegex = /"/g

/**
 * 
 */
function escape (text = '') {
  return `"${(text.toString() || '').replace(quoteRegex, '\"')}"`
}

/**
 * 
 */
export function chanToCsv (posts) {
  let contents = 'num,timestamp,email,name,comment,poster_hash,poster_country,reply_count,image_count,exif,media_filename,media_width,media_height,media_link\n'

  for (const post of posts) {
    contents += `${escape(post.num)},${escape(post.timestamp)},${escape(post.email)},${escape(post.name)},${escape(post.comment)},${escape(post.poster_hash)},${escape(post.poster_country)},${escape(post.nreplies)},${escape(post.nimages)},${escape(post.media.exif)},${escape(post.media.media_filename)},${escape(post.media.media_w)},${escape(post.media.media_h)},${escape(post.media.media_link)}\n`
  }

  return contents
}
