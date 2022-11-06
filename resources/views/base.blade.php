<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="{{ asset('images/bookworm_icon.png') }}" type="image/x-icon"/>
        <title>Bookworm</title>
    </head>
    <body class="antialiased">
        <div id="root"></div>
        <script src="{{mix('/js/index.js')}}"></script>
    </body>
</html>
