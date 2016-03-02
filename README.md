# Handsontable unicode

A custom handsontable cell type allow insert unicode character to cell.

## Installation

```bash
bower install --save handsontable-unicode
```

## Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Handsontable Unicode</title>
    <link rel="stylesheet"
      media="screen"
      href="bower_components/handsontable/dist/handsontable.full.css">
    <link rel="stylesheet" href="path/to/handsontable-unicode.css"/>

    <script src="bower_components/handsontable/dist/handsontable.full.js"></script>
    <script src="path/to/handsontable-unicode.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <button id="button" onclick="getData()">Get data</button>
    <script>
      var data = [
        ['Key', 'Value'],
        ['one', ''],
        ['two', ''],
        ['three', '']
      ];

      var columns = [
        {},
        {
          type: 'unicode',
          form: true, // true to show form, false to hide form, default true
          characters: [
            {
              name: 'Group 1',
              characters: ['&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278']
            },
            {
              name: 'Group 2',
              characters: ['&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278']
            },
            {
              name: 'Group 3',
              characters: ['&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278', '&#x0278']
            }
          ]
        }
      ];

      var container = document.getElementById('example');
      var hot = new Handsontable(container, {
        data: data,
        columns: columns
      });

      var getData = function () {
        console.log(hot.getData());
      }
    </script>
  </body>
</html>
```

Press `Ctrl + Space` to open unicode character picker.

## Example

```bash
git clone https://github.com/vn38minhtran/handsontable-unicode.git
cd handsontable-unicode
npm install && bower install
npm start
```
