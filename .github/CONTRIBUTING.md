# Lovit Contributing Guide

Hi! We're happy you're interested in helping with Lovit! Before you contribute, please read the guide below.

After you're set up, check the relevant `README.md` file based on what you want to work on.
For example, if you want to work on the website, read the README in the `site` folder.
If you want to work on the demo, check the README in the `demo` folder.

## Issue Tracker

To help keep things organized, we use the [issue tracker](https://github.com/lovit-dev/lovit/issues) for tracking **bugs**, requesting **features**, and managing **pull requests**. Please follow these simple rules:

- **No support requests**: The issue tracker isn't for personal troubleshooting. For help, join our [`Discord server`](https://discord.gg/kkx5zYKZwR) or use [`GitHub Discussions`](https://github.com/lovit-dev/lovit/discussions).

- **Avoid duplicates**: Before opening a new issue, please [search](https://github.com/lovit-dev/lovit/issues?utf8=%E2%9C%93&q=is%3Aissue) to see if it’s already been reported.

- **Follow guidelines**: When submitting issues or pull requests, please make sure to follow the project's contribution rules.

## Response Time

We’ll check the open issues, review them, and let you know what to do next. Before sending a pull request, make sure the issue has been talked about and is ready to work on. We don’t want to waste your time.

We might not reply right away, but we’ll get back to you as soon as we can. If you don’t hear from us quickly, it doesn’t mean we’re ignoring you. We’ll respond as soon as possible.

## How to Find Something to Contribute

Not sure where to start? See the [WAYS_TO_CONTRIBUTE.md](https://github.com/lovit-dev/lovit/blob/main/.github/WAYS_TO_CONTRIBUTE.md) guide for tips on finding tasks and getting involved.

## Labels

Our bug tracker uses several labels to help organize and identify issues. Here's what they mean:

- `accessibility` - Issues related to making the project accessible to a wider range of users.
- `browser bug` - Issues that are reported but are actually due to browser-specific bugs.
- `bug` - Issues that represent bugs or errors in the library or on the site.
- `compatibility` - Issues related to compatibility with other libraries, tools, or environments (e.g., Node.js, browsers).
- `dependencies` - Issues that are related to external libraries or tools that the project relies on.
- `docs` - Issues for improving or updating our documentation.
- `duplicate` - Issues that have already been reported.
- `enhancement` - Suggestions to improve or optimize the library or site.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified.
- `good first issue` - Issues that are suitable for first-time contributors.
- `help wanted` - Issues for which we need or would appreciate help from the community to resolve.
- `in progress` - Issues or pull requests that are currently being worked on.
- `invalid` - Issues that do not meet the criteria or are out of scope.
- `meta` - Issues with the project itself or our GitHub repository.
- `needs documentation` - Issues that require additional documentation or clarifications in the project documentation.
- `needs test` - Issues that require tests to be added.
- `performance` - Issues related to the performance.
- `refactoring` - Issues or pull requests focused on improving the structure, readability, or maintainability of the codebase without changing its functionality.
- `test` - Issues related to writing or improving tests.

## Bug reports

A bug is an issue with the code. Giving clear bug reports helps us fix them faster.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Isolate the problem** &mdash; Reproduce the problem in a simplified environment. If possible, create a live demo using platforms like CodePen or StackBlitz to clearly illustrate the issue.

3. **Indicate whether it’s a regression** &mdash; If the bug started after a recent update or code change, please mention it.

A good bug report should provide all the necessary information upfront, such as your environment (browser, OS, etc.), the steps to reproduce the issue, whether the bug appears differently on other browsers, and the expected outcome. Being detailed will help others quickly understand and fix the issue.

## Feature requests

Feature requests are welcome! Before submitting one, please check if your idea aligns with the project's goals. It's up to _you_ to clearly explain why the feature would be valuable. The more context and detail you provide, the better.

## Pull requests

Pull requests are super helpful—whether it’s a fix, improvement, or new feature. Try to keep your PR focused on one thing and avoid including unrelated changes.

**Please ask first** before starting a big change (like adding a major feature or refactoring). We don’t want you to spend time on something we might not merge. For small fixes or quick improvements, feel free to open a PR right away.

Keeping your pull requests focused and well-documented makes it easier for reviewers and increases the chance of it being merged quickly.

Following these steps will give your contribution the best chance of being accepted into the project:

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # 1. Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/lovit.git

   # 2. Navigate to the newly cloned directory
   cd lovit

   # 3. Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/lovit-dev/lovit.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout main
   git pull upstream main
   ```

3. Install project dependencies with npm:

   ```bash
   npm install
   ```

4. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

5. Ensure your changes follow the project's guidelines by running the following checks:

   ```bash
   npm run test
   npm run lint
   ```

6. Commit your changes in clear, logical chunks. Follow these [Git commit message guidelines](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) — well-written commits make it easier to review and increase the chances of your code being merged.

7. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

8. [Open a pull request](https://help.github.com/articles/about-pull-requests/)
   with a clear title and description against the `main` branch.

## Code guidelines

Please follow the project's ESLint and Prettier rules. These tools help keep the code clean and consistent. Don’t ignore their warnings or errors—they're part of the coding standards we follow.

If you get a Prettier warning or error, simply press **Ctrl + S** to save the file, and it will automatically format according to Prettier.

## License

By contributing your code, you agree to license your contribution under the [MIT License](../LICENSE). By contributing to the documentation, you agree to license your contribution under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0).
