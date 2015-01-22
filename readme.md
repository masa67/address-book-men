
# To Do

* Change the session secret for online.
* Captcha for register form missing.
* Support for HTTPS missing.
* Need to cross-check that pages cannot be accessed without proper auth.
* Handling of birthday.
* Redundant code for rendering.
* Option to add an image of a contact.

# Versions

* vx.x (not released yet): Button click handling moved away from HTML. The REST principles applied to URL paths and HTTP methods.
* v2.0: SPA. Hrefs and form actions replaced with Ajax calls to keep the application on the same page all the time.
`layout.jade` (HTML `head`) is loaded only once to improve performance. The redirect problem resolved (no redirects any
more).
* v1.0: The 1st version.