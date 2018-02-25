import remark from 'remark'
import github from 'remark-github'

const resolveOptions = (options = {}) => {
  return {
    mentionStrong: options.strong || false,
    repository: options.repository || ''
  }
}

// This function is supposed to be used on "web" platform only.
// This can be used to read a markdown string or source code in a text editor and then add references to that string.
const linkify = (source, options = {}) => {
  let output = ''

  remark()
    .use(github, resolveOptions(options))
    .process(String(source), (err, contents) => {
      if (err) {
        // This is thrown by remark-github
        throw err
      }

      output = String(contents)
    })

  return output
}

export { linkify }
