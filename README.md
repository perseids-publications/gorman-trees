# Gorman Trees

Set of treebanks published by Vanessa Gorman at the University of Nebraska-Lincoln.

Based on the template [here](https://github.com/perseids-publications/treebank-template).

## Try it Out

[https://perseids-publications.github.io/gorman-trees/](https://perseids-publications.github.io/gorman-trees/)

## Get started with your own treebanks

* Getting Started: [https://perseids-publications.github.io/treebank-template/instructions/getting-started/](https://perseids-publications.github.io/treebank-template/instructions/getting-started/)
* Registering a DOI: [https://perseids-publications.github.io/treebank-template/instructions/doi](https://perseids-publications.github.io/treebank-template/instructions/doi)
* Updating: [https://perseids-publications.github.io/treebank-template/instructions/updating](https://perseids-publications.github.io/treebank-template/instructions/updating)
* Alpheios Integration: [https://perseids-publications.github.io/treebank-template/examples/alpheios-integration](https://perseids-publications.github.io/treebank-template/examples/alpheios-integration)

## Technical details

### How to get started using the command line

The *Getting Started* instructions above use the GitHub web interface.
To create an instance of the Treebank Template with your own trees using the command line,
follow the steps below:

```
git clone git@github.com:perseids-publications/treebank-template.git my-trees
cd my-trees
git remote rename origin source
git remote add origin <my-trees origin>
git push -u origin master
```

* Copy all your trees into `public/xml`
* Update the `src/config.json` file
* Update `name` and `homepage` in `package.json`
* Set the version in `package.json` to `1.0.0`
* Update the information in `.env`

### Configuration

See [docs/CONFIG.md](docs/CONFIG.md) for more information about the format of `src/config.json`.

### Updating

The easiest way to update the Treebank Template code is to follow the instructions
in the *Updating* link above.
Alternatively, you can use Git's built in merging functionality.
A typical update may involve the following steps:

* `git pull source master --no-commit` (if there is no `source` repository, then run
  `git remote add source https://github.com/perseids-publications/treebank-template.git`
  then `git pull source master --no-commit`)
* Fix merge conflicts:
```bash
git checkout --theirs .
git checkout --ours public/xml
git checkout --ours .env
git checkout --ours README.md
git checkout --ours src/config.json
```
* Run `git status`. In some cases there may be files that are marked as `deleted by them`.
  For each of these, do `git rm <path-to-file>`
* The `package.json` needs to be edited manually. The `name`, `version,` and `homepage` fields should reflect
  `origin`, while all other values should reflect `source`
* `git add .`
* `git commit`
* `git push origin master`

### Installation

`yarn install`

### Running the development server

`yarn start`

### Building for deployment

Before creating a production build you need to know the path where it will be accessed.
Then run the command `PUBLIC_URL='./path/of/app' yarn build`.
This will generate a set of static files in the `build/` directory that you can serve.

For example, if you want to deploy it at `www.example.com/` then run `PUBLIC_URL='./' yarn build`.
If you want to deploy it at `www.example.com/lexica/lsj` then run
`PUBLIC_URL='./lexica/lsj' yarn build`.

### Deploying a new version to github.io

`yarn deploy`

### Zenodo DOI

The easiest way to register a DOI and add it to your collection of treebanks is to follow
the instructions in the *Registering a DOI* link above.
The instructions below explain an alternative method that is more complicated but more configurarable.

#### Zenodo

* Visit [Zenodo](https://zenodo.org/deposit/new), log in, and create a new upload
* Click the "Reserve DOI" button in the "Basic information" section
* Keeping the window open, open your command line/console and navigate to the repository

#### Git

* In `src/config.json`, add or update the `doi` field to the DOI generated in the above step (preceded by `https://dx.doi.org/`)
* Update the version in `package.json` (try to use [SemVer](https://semver.org/))
* Push the code to `master`
* Keeping the Zenodo window open, in another tab or window open the repository on GitHub

#### GitHub

* Make a new release titled "Release vA.B.C" where "A.b.C" is the version in `package.json` and use the same string ("vA.B.C") in the "Tag Version" field
* Enter a description then click "Publish release"
* Download the release as a `tar.gz` file
* Go back to the Zenodo window or tab

#### Zenodo

* Add the `tar.gz` file to the upload
* Fill in the following fields:
  * Communities: add the `perseids-project` community and any others that may be relevant
  * Upload type: Dataset
  * Basic information:
    * Title: the title of the treebank collection
    * Authors: the author(s) who contributed to the treebanks
    * Description: a description of the dataset
    * Version: the version in `package.json`
  * License:
    * Access right: Open Access
    * License: Creative Commons Attribution 4.0 International
  * Fill in any other fields that are relevant
* Click "Publish"

## Licenses

The code is licensed under the MIT license (see `LICENSE` file).
The treebanks are licensed under the CC0 1.0 license (see `TREEBANK_LICENSE` file).
