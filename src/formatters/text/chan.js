let contents = 'num,timestamp,email,name,comment,poster_hash,poster_country,reply_count,image_count,exif,media_filename,media_width,media_height,media_link\n'

export function chanToText (posts) {
  let contents = ''

  for (const post of posts) {
    contents += `
Number: ${post.num}
Timestamp: ${post.timestamp}
Email: ${post.email}
Name: ${post.name}
Poster Hash: ${post.poster_hash}
Poster Country: ${post.poster_country}
Reply Count: ${post.nreplies}
Image Count: ${post.nimages}
EXIF: ${post.media.exif}
Media Filename: ${post.media.media_filename}
Media Width: ${post.media.media_w}
Media Height: ${post.media.media_h}
Media Link: ${post.media.media_link}
Comment: ${post.comment}
\n`
  }

  return contents
}
