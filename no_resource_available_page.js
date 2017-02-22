module.exports = `
<!DOCTYPE html>
<html>

<head>
    <title>暂无可用资源</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        html, body {
            height: 100vh;
            display: flex;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }

        #no-resource-available {
            position: fixed;
            text-align: center;
            font-family: 'Raleway';
            font-weight: 100;
            align-items: center;
            display: flex;
            justify-content: center;
            height: 100vh;
            width: 100%;
        }

        #no-resource-available > .content {
            position: relative;
            line-height: 72px;
            color: #C2185B;
        }

        #no-resource-available > .content > .major {
            font-size: 42px;
        }

        #no-resource-available > .content > .minor {
            font-size: 20px;
        }

        #no-resource-available > .content > .copyright {
            color: #505050;
            font-size: 14px;
            font-weight: 300;
        }
    </style>
</head>

<body>
    <div id="no-resource-available">
        <div class="content">
            <div class="major">请稍后再试</div>
            <div class="minor">目前我们的网络中暂无可处理该请求的资源。</div><br />
            <div class="copyright">&copy; 2017 hydrocloud.net.</div>
        </div>
    </div>

    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css" />
</body>

</html>
`;
