ARTICLE_FOLDER_PATH = 'C:/Users/cjbas/Desktop/jamenwalz.github.io/articles/'


import os

#this is a test

html = '''
<!DOCTYPE html>
<html lang="">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CCV6EQGLRH"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-CCV6EQGLRH");
    </script>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="URL_PLACEHOLDER" />
    <meta name="twitter:title" content="TITLE_PLACEHOLDER" />
    <meta name="twitter:description" content="DESCRIPTION_PLACEHOLDER" />
    <meta name="twitter:image" content="IMAGE_PLACEHOLDER" />
    <link rel="icon" href="/favicon.ico" />
    <script src="https://kit.fontawesome.com/6b953dceaa.js" crossorigin="anonymous"></script>
    <link rel="icon" href="/favicon.ico" />
    <script src="https://kit.fontawesome.com/6b953dceaa.js" crossorigin="anonymous"></script>
    <link href="../app.css" rel="preload" as="style" />
    <link href="../app.js" rel="preload" as="script" />
    <link href="../chunk-vendors.js" rel="preload" as="script" />
    <link href="../app.css" rel="stylesheet" />
</head>

<body>
    <noscript><strong
        >We're sorry but Nati King doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      ></noscript
    >
    <div id="app"></div>
    <script src="../chunk-vendors.js"></script>
    <script src="../app.js"></script>
  </body>
</html>'''

defaultImg = 'https://natiking.com/img/default.b05ec853.png'

url = input("Enter the url to generate meta tags for: ")
articleID = url.split('/')[-1]
html = html.replace('URL_PLACEHOLDER', url)

title = input("Enter the title: ")
html = html.replace('TITLE_PLACEHOLDER', title)

desc = input("Enter desc (just paste a lot of words, twitter auto adds the ...): ")
html = html.replace('DESCRIPTION_PLACEHOLDER', desc)

img = input("Enter an image url (leave blank for default): ")
if img == '':
    html = html.replace("IMAGE_PLACEHOLDER", defaultImg)
else:
    img = img + '?34598734987' #makes a unique url so that twitter will be sure to find the img
    html = html.replace("IMAGE_PLACEHOLDER", img)

f = open(f'{ARTICLE_FOLDER_PATH}{articleID}.html', 'w')
f.write(html)
f.close()

os.system(f'cd {ARTICLE_FOLDER_PATH} && git pull && git add * && git commit -m "added metadata tags" && git push')