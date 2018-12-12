# Gist Lister
Github gist search and list users gists by their github api key.

## Motivation
I kind of use frequently the gists from github to store snippets that i frequently use or might need in the future or even to give to someone when they ask for something similar. My problem is that you can't search your own gists (public or private).

So tired of using the navigation to search for something that i knew i had done (sometimes in duplicates) i created this to help me search thru my gists.

## Implementation

It uses your github api key to search and store your gists information in a localfile (php) to make it pretty fast after the first update.

The load and manipulation is made by vanilla javascript after that.

## Improvements (TODO)

Got some points of improvement (feel free to make a pull request):
  * make it load using js only (my option is to cache it locally with php and update on request);
  * js search fuzzy;
  * load only 10 (maxresults) latest with option to load more - i don't have that many at this moment to be a DOM problem;
  * ...
  
 
## Live version

(no php version option to store/update, i use an json for example)
