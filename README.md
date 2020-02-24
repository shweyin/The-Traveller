## Setup
**Requirement**: have [git](https://git-scm.com/) and [nodejs](https://nodejs.org/en/) installed.

First, clone this repo.
```console
git clone https://github.com/SenecaCollegeBTSProjects/Group_06.git
```

Open the `project` folder. Then install dependencies.
```console
npm i
```

Run development mode
```console
npm run dev
```

- The client will be served at http://localhost:1234
- The server will be served at http://localhost:1235 (see [config](project/config/development.json))

## Collaboration Flow
To avoid conflicts during development, please follow these steps:

#### 1. Issues will be created and assigned to collaborators.
#### 2. Create branch for the issue you are assigned (**Never use `master` branch for development**)

First, create a new branch **in your local computer**. Name can be any (suggest: `assigneeName-issueNumber`, for example: `ryan-4`)
```console
git checkout -b ryan-4
```

Now if you type `git branch`, use can see there are `master` and `ryan-4` branches. The `*` before a branch indicates the current branch. You can switch to any branch using `git checkout <branch-name>`.

Next, create the branch on Github (right now the new branch exists **only on your local computer**).
```console
git push -u origin ryan-4
```

Now if you check Github, you can see the new branch. From now on, you can just use `git push`, your local will be pushed to the right branch on Github.

#### 3. Create a `Pull Request` when the issue is fixed.
On Github, open the branch you are working, then press `Create Pull Request`. In the description, type `close #<issue-number>` (the purpose of this is when the `Pull Request` is accepted, the associated issue will be automatically closed).

If you already opened a `Pull Request`, but need to change something in your code, just do as normal, the request will be updated automatically.

#### 4. Review and accept the `Pull Request`. After this the working branch will be merge into `master`.

## Links
- https://react-bootstrap.github.io/
- https://getbootstrap.com/
- https://www.npmjs.com/package/qs
