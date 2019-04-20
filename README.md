# GitLab Reviewer

UI to see all GitLab merge requests of your team in one place.

## Requirements

* [GitLab](https://about.gitlab.com/)

## Installation

### Clone the project

```shell
$ git clone https://github.com/TheGrowingPlant/gitlab-reviewer.git
$ cd gitlab-reviewer
```

### Install dependencies

```shell
$ yarn
```

### Configure

Copy `.env` to `.env.local` and set your url and token.

## Run the server

After configuration, you have to build the code and launch the server.

```shell
$ yarn start
```

Then open `http://localhost:3000` in your browser.

### Inspiration

Thanks :
* [TheRedDot/MergeRequestsCI](https://github.com/TheRedDot/MergeRequestsCI)
* [M6Web](https://tech.m6web.fr/) ([Github Team Reviewer](https://github.com/M6Web/GithubTeamReviewer))

## License

[gitlab-reviewer](https://github.com/TheGrowingPlant/gitlab-reviewer) is licensed under the [MIT license](LICENSE).
