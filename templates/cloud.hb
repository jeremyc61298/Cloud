<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{dirName}} - Cloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>{{dirName}}</h1>  
    <ul>
        {{#each files}}
        <li><a href="">{{name}} - {{fileType}}</a></li>
        {{/each}}
    </ul>
</body>
</html>