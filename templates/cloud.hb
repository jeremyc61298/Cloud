<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cloud-HU</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
    <script>
        // Event listener for the file name on the upload files
        // Changes the name on the upload button to whatever file the user has selected
        window.addEventListener("DOMContentLoaded", ()=> {
            let file = document.querySelector("#userfile");
            file.addEventListener("change", function(){
                document.querySelector("#filename").innerHTML = file.files[0].name;
            });
        });
    </script>
    <style> 
        .dir-entry-link {
            padding-left: 5px;
        }

        /* Simply to place the footer at the bottom of the page */
        footer {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-half">
                <nav class="panel">
                    <p class= "panel-heading">{{dirName}}</p>
                    {{#each files}}
                        <label class="panel-block">
                            <a href="{{downloadPath}}">
                                <figure class="image is-24x24">
                                    <img src="{{imgPath}}" alt="">
                                </figure>
                            </a>
                            <a href="{{path}}" class="dir-entry-link">
                                {{name}}
                            </a>
                        </label>
                    {{/each}}
                    
                </nav>
            </div>
        </div>
            <form method="POST" enctype="multipart/form-data" action="/cloud">
                <div class="field is-grouped is-grouped-centered is-horizontal">
                    <div class="control">
                        <div class="file is-info has-name is-right is-fullwidth">
                            <label class="file-label">
                                <input class="file-input" type="file" id="userfile" name="userfile" required>
                                <span class="file-cta">
                                    <span class="file-label">
                                        Choose a File
                                    </span>
                                </span>
                                <span class="file-name" id="filename">
                                    No File Chosen
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="control">
                        <input class="button is-primary" type="submit" name="submitUpload" value="Upload to Cloud-HU">
                    </div>
                    <input type="hidden" value="{{dirName}}" name="currentDir">
                </div>
            </form>
    </section>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                Icons made by 
                <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>
                from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
                is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
            </p>
        </div>
    </footer>
</body>
</html>