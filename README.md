# Cloud-HU
### Author: Jeremy Campbell

### Resources
* [Bulma.io](https://bulma.io/documentation/) for my css. I used their documentation to structure my webpage and and make it look pretty.
* [Error Handling](https://wanago.io/2018/12/17/typescript-express-error-handling-validation/) - My error handling middleware was not working well for me, but this site helped me see what I was doing wrong. commom.ts:18 is where I used the technique found at the link: create a class that extends error and use that class whenever I "throw" an error for a middleware function to handle. 

### Troubles
* Parent Directories

    I was having trouble disallowing the user to make requests with `/../`. I tried to handle it with a middleware function that accepted all requests and check if the url had the string `/../` in it. I placed this at the top of my app/index.ts file. However, everytime a request was made with `..` in the url, by the time it got to my middleware it had already been translated to the actual parent directory. For instance, I would request `/cloud/../`, but in my middleware, which was only preceded by morgan, would read the url to be `/cloud`. 

* Trailing slash

    I was struggling to figure out how to add a trailing slash to the end of `/cloud`, because express sees this the same as `/cloud/`. In fact, if req.originalUrl is `/cloud`, the req.path is `/`. So my basic fix for all other paths, which was to add a slash to the end of req.path if it didn't have one, was not going to work. Eventually I figured it out. If req.path is equal to 1, and req.originalUrl was not `/cloud/`, then I could add a `/` to the end of req.baseUrl and redirect there. However, my approach has a weakness, which is that any query string that was in the request is lost. It would require a bit more effort to reappend, but my display-dir middleware does not use the query string, so I let it slide.  