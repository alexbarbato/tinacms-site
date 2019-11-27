---
title: Create New Files
id: /docs/gatsby/create-new-files
prev: /docs/gatsby/json
next: /docs/gatsby/configure-git-plugin
consumes:
  - file: /packages/gatsby-tinacms-remark/src/remark-creator-plugin.ts
    details: Demonstrates use of RemarkCreatorPlugin
  - file: /packages/gatsby-tinacms-json/src/create-json-plugin.ts
    details: Demonstrates use of jsonCreatorPlugin
---

An integral aspect of content management is the ability to create new content. To create new content files with Tina, you will need to configure and register `content-creator` plugins with the cms.

Currently, Tina provides `content-creator` plugins for both markdown and JSON files in **Gatsby projects**. Once registered, actions from these `content-creator` plugins are accessible from the sidebar menu. If you have an idea for a new `content-creator` plugin, [consider contributing!](/docs/contributing/guidelines)

![content-creator-plugin-tinacms](/img/content-creator-ex.jpg)

### General steps
<br>

1. Add a `content-creator` plugin
2. Register the plugin with Tina
3. Configure how content is created by:
   - Formatting the filename & path
   - Providing default data (frontmatter, markdown, or json)

### Prerequisites

- A Gatsby site [configured with Tina](/docs/gatsby/manual-setup)
- Content editing with [markdown](/docs/gatsby/markdown) or [JSON](/docs/gatsby/json) set up

## 1. Add Content-Creator Plugin

There are two `content-creator` plugins to use with Gatsby.

- `RemarkCreatorPlugin`: Constructs a `content-creator` plugin for markdown files.
``` typescript
interface RemarkCreatorPlugin{
  label: string
  fields: Field[]
  filename(form: any): Promise<string>
  frontmatter?(form: any): Promise<any>
  body?(form: any): Promise<string>
}
```
- `JsonCreatorPlugin`: Contstructs a `content-creator` plugin for JSON files.
``` typescript
interface JsonCreatorPlugin {
  label: string
  fields: Field[]
  filename(form: any): Promise<string>
  data?(form: any): Promise<any>
}
```

These classes need to be instantiated with at least these three things:

- `label`: A simple action label displayed when users interact with the + button in the sidebar.
- `filename`: A function whose return value should be the path to the new file.
- `fields`: An array of field objects. Read more on field defitions [here](/docs/concepts/fields).

**Markdown Example**

```javascript
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Add New Post',
  filename: form => {
    return form.filename
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description: 'The full path to the new markdown file, relative to the repository root.',
    },
  ],
})
```
<tip>
Deprecated: `createRemarkButton` is a function that served the same purpose as the `RemarkCreatorPlugin` class. We recommend using `RemarkCreatorPlugin`, however, below is an example of this function in use.
</tip>

```javascript
import { createRemarkButton } from 'gatsby-tinacms-remark'

// Deprecated in favor of RemarkCreatorPlugin class
const CreatePostPlugin = createRemarkButton({
  label: 'Create Post',
  filename: form => {
    return form.filename
  },
  fields: [
   //...
  ],
})
```

**JSON Example**

```javascript
import { JsonCreatorPlugin } from 'gatsby-tinacms-json'

const CreatePostPlugin = new JsonCreatorPlugin({
  label: 'Create New File',
  filename: form => {
    return form.filename
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/data/puppies.json',
      description: 'The full path to the new markdown file, relative to the repository root.',
    },
  ],
})
```

### Where To Add the Plugin

When adding a `content-creator` plugin, you'll have to consider when you want this functionality available to the editor. If the component where you registered the plugin is actively rendered on the site, you will be able to add new content via the plugin.

These are some places you may want to add the plugin:

- The Root component: it will always be available
- A Layout component: it will always available when that Layout is used.
- A Blog Index component: it will only be available when looking at the list of blog posts.

## 2. Register Plugin to Sidebar

Now that we've created the `content-creator` plugin, we need to add it to the sidebar so we can access it. When we register the plugin to the sidebar, a create-icon will show up in the sidebar menu. Keep in mind this icon will only show up when the component that registers it is rendered.

![content-creator-icon](/img/content-creator.png)

### Adding the Button to the Blog Index

In this example, we will add the button to the Tina sidebar when visiting the blog index page. There are 3 steps involved:

1. Import `RemarkCreatorPlugin` and `withPlugin`
2. Create the `content-creator` plugin
3. Add the plugin to the component

_NOTE: No changes need to be made to the_ `_BlogIndex_` _component itself._

**Example: src/pages/index.js**

```jsx
// 1. Import `RemarkCreatorPlugin` and `withPlugin`
import { withPlugin } from 'react-tinacms'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

// Note: this is just an example index component.
function BlogIndex(props) {
  const { data } = props
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

// 2. Create the `content-creator` plugin
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description: 'The full path to the new markdown file, relative to the repository root.',
    },
  ],
  filename: form => {
    return form.filename
  },
})

// 3. Add the plugin to the component
export default withPlugin(BlogIndex, CreatePostPlugin)
```

### Creating Content

With the plugin in place, **open TinaCMS and click the menu button** in the top-left corner. The menu panel will slide into view with the button at the top.

Click the "Create Post" button and a modal will pop up. Enter the path to a new file relative to your repository root (e.g. `content/blog/my-new-post.md`) and then click "create". A moment later the new post will be added to your Blog Index.

## 3. Customizing the Create Form

`RemarkCreatorPlugin` accepts a `fields` option, similar to [Remark Form](/docs/gatsby/markdown#creating-remark-forms). When using a custom create form, all callback functions will receive an object containing all form data.

**Example: Create Posts in Subdirectories**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'section', label: 'Section', component: 'text', required: true },
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    return `content/blog/${form.section}/${form.title}/index.md`
  },
})
```

## 4. Formatting the filename & path

The `RemarkCreatorPlugin` must be given a `filename` function that calculates the path of the new file from the form data.

**Example 1: Hardcoded Content Directory**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => `content/blog/${form.title}.md`,
})
```

**Example 2: Content as index files**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => `content/blog/${form.title}/index.md`,
})
```

**Example 3: Slugify Name**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
})
```

## 5. Providing Default Front Matter

The `RemarkCreatorPlugin` function can be given a `frontmatter` function that returns the default front matter. Like the `filename` function, `frontmatter` receives the state of the form.

**Example: Title + Date**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  frontmatter: form => ({
    title: form.title,
    date: new Date(),
  }),
})
```

## 6. Providing a Default Body

The `RemarkCreatorPlugin` function can be given a `body` function that returns the default markdown body. Like the previous two functions, `body` receives the state of the form.

**Example: Title + Date**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [{ name: 'title', label: 'Title', component: 'text', required: true }],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  body: form => `This is a new blog post. Please write some content.`,
})
```
