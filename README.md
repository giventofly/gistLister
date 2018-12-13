# Gist Lister

A simple php site to get and search through your Github gists using your github api key.

## Motivation

I use the gists from github to store snippets that i frequently use, might need in the future or even to give some short code to someone when they ask for something. My problem was that i coudln't search/filter my own gists (public or private).

So i was tired of using the navigation to search for something that i knew i had done (sometimes in duplicates) i created this to help me search through my gists and decided to share the final result for anyone that wants a starting point or a somewhat fine to use service.

## Implementation

It uses your github API key to search and store your gists information in a local file (with php) to make it pretty fast after the first update.

The load and manipulation is made by JavaScript after that.

    ├── app.js (javascript to deal with the sort/filter/create the gists from json)
    ├── app.min.js (minified)
    ├── cache.json (cache json)
    ├── full.php (full working with php)
    ├── index.html (mockup)
    ├── LICENSE
    ├── README.md
    ├── styles.css 
    └── styles.scss (sass stylesheet)

## Improvements (TODO someday)

Got some points of improvement (feel free to make a pull request):
* make it load using js only (my option is to cache it locally with PHP and update on request);
* js search fuzzy;
* load only the 10 latest gists with option to load more - i don't have that many at this moment to be a DOM problem;
* code optimizations/modular separation
* ...

## Live version

Can check a [mockup version here](https://giventofly.github.io/gistLister/) - not updating or reading from file - no php - just loads an json example to see how it works.
