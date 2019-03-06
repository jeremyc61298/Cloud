<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cloud-HU</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
    <script>
        // Event listener for the file name on the upload files
        window.addEventListener("DOMContentLoaded", ()=> {
            let file = document.querySelector("#userfile");
            file.addEventListener("change", function(){
                document.querySelector("#filename").innerHTML = file.files[0].name;
            });
        });
    </script>
</head>
<body>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <nav class="panel">
                    <p class= "panel-heading">{{dirName}}</p>
                    {{#each files}}
                        <label class="panel-block">
                            <a href="{{downloadPath}}">
                                <figure class="image is-24x24">
                                    <img src="{{imgPath}}" alt="">
                                </figure>
                            </a>
                            <a href="{{path}}">
                                {{name}}
                            </a>
                        </label>
                    {{/each}}
                    <form method="POST" enctype="multipart/form-data" action="/cloud">
                        <div class="field is-grouped-centered">
                            <div class="file is-centered is-info has-name">
                                <label class="file-label">
                                    <div class="control is-expanded">
                                        <input class="file-input" type="file" id="userfile" name="userfile" required>
                                    </div>
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                            Upload to Cloud-HU
                                        </span>
                                    </span>
                                    <span class="file-name" id="filename">
                                        Select a file
                                    </span>
                                </label>
                            </div>
                            <div class="control">
                                <input class="button is-primary" type="submit" name="submitUpload" value="Submit">
                            </div>
                            <input type="hidden" value="{{dirName}}" name="currentDir">
                        </div>
                    </form>
                </nav>
            </div>
        </div>
    </section>
</body>
</html>