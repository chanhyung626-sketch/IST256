// This script should be included in all pages.
// This script inserts sitewide components that should be present in all pages in order
// to simplify the HTML of pages.
// See assets/template.html for a base HTML document that includes this script and shows
// it's implementation.

$(function () {
    $('#navbar').load('/components/navbar.html');
    $('#footer').load('/components/footer.html');
});
