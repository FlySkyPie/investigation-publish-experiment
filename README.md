# Investigation Publish Experiment

In short, this is an experiment about using Trilium as SSG (Static Site Generation).

## Usage

Using your RSS reader subscribe the feed:

```
https://flyskypie.github.io/investigation-publish-experiment/rss.xml
```

## Background

The long story need to start from project Dregarnuhr.

<div align="center">
  <img  src="docs/00_Dregarnuhr_logo.svg" width="300" alt="Dregarnuhr icon">
  <h1>
    <ruby style="ruby-position: under;">
    Dregarnuhr 
        <rp>
        (</rp><rt>⊹₊˚‧︵‿₊⊱·Side Quest of Agentic Investigator and Reporter·⊰₊‿︵‧˚₊⊹</rt><rp>)
        </rp> 
    </ruby>
  </h1>
  
  <p><strong>Search it, Learn it, Share it</strong></p>
</div>

The concept of project Dregarnuhr is create a Feed flow as alternatives for Oligopolistic microblogs. From comsumer perspective, since RSS (Really Simple Syndication) already exsiting for decades, the techstack should built on top of it.

Most SSG solution already support RSS, but the problem is that most SSG is build static website from text files, it's not design for the case of microblog: highly producing and highly consuming, the performance is limited.

The reason Trilium been selected, because it's using database to store notes, and have export feature can create decent html (static website), expecting it have more optimization on the process.

## Licensing

This project is [REUSE](https://reuse.software)-compliant. Run `reuse lint` to
verify.

Everything authored for this project is licensed `MIT`. The following files are
marked `LicenseRef-StatusUndetermined`; see
[`LICENSES/LicenseRef-StatusUndetermined.txt`](LICENSES/LicenseRef-StatusUndetermined.txt)
for what that means.

- `researches/**`
- `docs/00_Dregarnuhr_logo.svg`
