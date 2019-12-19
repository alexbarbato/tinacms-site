---
title: How can my editors edit a TinaCMS site?
date: '2019-12-17T20:09:31.626Z'
draft: false
author: James O'Halloran
---

TinaCMS allows you to build live-editing functionality directly into your site. Tina differs from other headless CMS's (e.g [Forestry.io](https://Forestry.io), [NetlifyCMS](https://NetlifyCMS.org), [Contentful](https://contentful.com)) which simply allow you to edit your site's content and are relatively detached from your site's code. Having Tina sit in between your content and your site's template gives editors an amazing real-time editing experience where they can navigate to any area of the site, start making changes, and immediately see these changes reflected within the site.

![tina-diagram](/img/how_tina_works_asset.png)

With most JAMstack sites, there are various transformations happening which transform your editor's source content (e.g markdown) into the generated html on your live site. Because of this, Tina will usually need to be run in a live development environment.

> So, do my editors need to run a local dev server to edit a TinaCMS site?

Nope! You'll be able to setup a **cloud development environment** for your Tina site, and optionally use Tina Teams for some extended collaboration features.

### Hosting Your Cloud Development Environment ☁️

Part of what makes Tina great is that it gives the developer control. It's important for us to extend this control into the Cloud editing experience. For this reason, we've designed it so that you can **host your cloud development environment wherever you like.**

Already have a Gatsby Cloud plan?
Want to host a small site under [Heroku's](https://www.heroku.com) free tier?

The choice is up to you, depending on your needs!

You can fire up a **cloud development environment** using one of these services and have users start making commits.

<tip>If you're using git as your backend, you may choose to host your master branch on the cloud development server (and have all commits deployed to your live site), or you can host a separate staging branch.</tip>

### Tina Teams

Depending on your use-case, hosting might be all that you'll need to have your editors editing on the cloud. Otherwise, you might consider using `Tina Teams` for some additional functionality detailed below...

##### Authorization 👤

Some services (like Gatsby Cloud) will allow you to password protect your environment. If you're hosting somewhere else, you likely don't want strangers accessing your site and making commits. One of the features that `Tina Teams` provides is an **authentication layer over your cloud development environment**. Users will first need to log in before accessing your cloud environment.

##### User Management 👨 👩

With Tina Teams, users can have **custom roles assigned to each user**, which can be referenced within your site.
Maybe you have an external contributor who can only access a specific blog post? An editor who can create, but not delete pages? The implementation is up to you and your site's needs.

##### Commit Authoring 🗣️

Since users will need to authenticate with Tina Teams, we can **tie commits back to the logged-in user**, so you can always find out who put that llama image in your blog post (so you can thank them, of course).
![tinacms-add-new-file-gif](/img/rico-replacement.jpg)

### In Summary

Not all sites fit into the same box, so we're giving the flexibility to manage your **cloud development environment** however makes sense for you. Running a development environment on `Gatsby Cloud` without `Tina Teams` will work for some, and certain users may require deeper user management with `Tina Teams`. We'll soon be posting examples of how to host your cloud development environment on additional services as well.

<br />

We've also got some other "down the road "features planned which will make it much easier to work alongside other team members on your cloud environment: e.g Locking files when being edited by another user. Stay tuned!

<br />

# ✨

<br />

Thanks for reading! If you think Tina Teams might be a fit, you can sign up for our [Tina Teams Beta](http://tinacms.org/teams) to try it out early!
