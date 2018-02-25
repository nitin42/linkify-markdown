const vfile = require("to-vfile")
const remark = require("remark")
const parser = require("remark-github")
const { resolve } = require("path")
const { blue, yellow } = require("chalk")

const read = (file) => vfile.readSync(file)

const write = (data) => vfile.writeSync(data)

// Adds references to a markdown file provided a repository field in package.json or via the option param.
const linkify = (filename, options = {}) => {
	let isEmpty = false

	remark()
		.use(parser, options)
		.process(read(filename), (err, data) => {
			if (err) {
				throw err
			}

			if (String(data).length === 1) {
				isEmpty = true
			} else if (String(data).length > 1) {
				// We overwrite the markdown file (just update the content which we are interested in)
				write({ path: filename, contents: String(data) })
				isEmpty = false
			}
		})

	// This flag is also used for micro-optimisation (displaying messages)
	return isEmpty
}

module.exports = linkify
