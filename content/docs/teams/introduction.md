---
title: Introduction
id: /docs/teams/introduction
prev: null
next: /docs/teams/cli/introduction
---
Tina Teams allows you and your team to edit content in a cloud-hosted environment. Tina Teams is currently in [closed beta](/teams "Tina Teams Signup"). However, if you would like to set up a private hosting environment, feel free to utilize the `tina serve` command — read more on that [here](/docs/teams/cli/commands#tina-serve-options--tina-server-options).

Interaction with Teams' environments is done through the Tina CLI.

Once a site is deployed, any user with access can log in through the live environment's URL, and start making edits to the branch.

## Limitations

Any Gatsby site which will be making commits on a Tina Team environment will currently need to have a `defaultCommitMessage`, `defaultCommitName`, `defaultCommitEmail` set in its [config](/docs/gatsby/configure-git-plugin "git config"). Eventually, these values will be pulled from the logged-in user.
