<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cloud-HU</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
</head>
<body>
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
                        <div class="file is-centered is-info">
                            <label class="file-label">
                                <input class="file-input" type="file" name="userfile">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Upload to Cloud-HU
                                    </span>
                                </span>
                            </label>
                        </div>
                        <input type="hidden" value="{{dirName}}" name="currentDir">
                        <input class="button is-primary" type="submit" value="Submit">
                    </div>
                </form>
            </nav>
        </div>
    </div>
</body>
</html>