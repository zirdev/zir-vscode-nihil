# ZIR NIHIL [![vscode_logo](./themes/icons/vscode_mini.png)](https://marketplace.visualstudio.com/items?itemName=zir.zir-nihil)

## **Visual Studio Code** Theme (dark)

- Syntax adjusted to give more vivid and warmer colours.
- Colouring of folder/file tree pane simplified (using css inject extension).
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) not recommended with this theme as it might be adding to much color sprinkle.

---

Main Window (Java Script syntax coloring):
>![main_window](./themes/images/screenshots/main_window.png)

VSC Settings:
>![settings](./themes/images/screenshots/settings.png)

Python:
>![python](./themes/images/screenshots/python.png)

Java Script:
>![js](./themes/images/screenshots/js.png)

Java Script (module):
>![js_module](./themes/images/screenshots/js_module.png)

Java Script Typescript:
>![js_ts](./themes/images/screenshots/js_ts.png)

Java Script (object):
>![js_object](./themes/images/screenshots/js_object.png)

Java Script React:
>![js_react](./themes/images/screenshots/js_react.png)

Java Script Vue (template):
>![js_vue_template](./themes/images/screenshots/js_vue_template.png)

Java Script Vue (script):
>![js_vue_script](./themes/images/screenshots/js_vue_script.png)

C:
>![c](./themes/images/screenshots/c.png)

C#:
>![cs](./themes/images/screenshots/cs.png)

CSS:
>![css](./themes/images/screenshots/css.png)

CSS (animation):
>![css_animation](./themes/images/screenshots/css_animation.png)

Go:
>![go](./themes/images/screenshots/go.png)

HTML:
>![html](./themes/images/screenshots/html.png)

Java:
>![java](./themes/images/screenshots/java.png)

PHP:
>![php](./themes/images/screenshots/php.png)

Ruby:
>![ruby](./themes/images/screenshots/ruby.png)

Rust:
>![rust](./themes/images/screenshots/rust.png)

Swift:
>![swift](./themes/images/screenshots/swift.png)

XML:
>![xml](./themes/images/screenshots/xml.png)
---
## Settings for some extensions used

1. Icon theme: [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

  > "material-icon-theme.folders.theme": "classic",  
  > "material-icon-theme.folders.color": "#fdd835",  
  > "material-icon-theme.saturation": 0.75,  
  > "material-icon-theme.opacity": 0.9,  

2. Change looks of scrollbars and folder tree labels (or any other element of VSCode):  
 - Install extension: [Custom CSS](https://github.com/be5invis/vscode-custom-css)  
 - Download file: [overrides.css](https://github.com/zirdev/zir-vscode-nihil/blob/master/themes/css/overrides.css)  
 - Add the following to VSCode `settings.json`
  >	"vscode_custom_css.imports": ["file:///C:/path/to/css-file/overrides.css"],  
  >	"vscode_custom_css.policy": true, 
 - Open VSCode `Command Palette` and type in `Reload Custom CSS and JS`(more on how to use your own .css file to change looks of VSCode on [Custom CSS](https://github.com/be5invis/vscode-custom-css) extension page)  
 - You can alter looks of any VSCode window element with CSS (it is just a fancy website running in Electron/Chrome executable) by adding CSS classes to the `overrides.css` file like you would for any other website  

3. Alternate [indent lines](https://github.com/SirTori/indenticator)

  >"indenticator.inner.style": "solid",  
  >"indenticator.style": "solid",  
  >"indenticator.inner.showHighlight": true,  
  >"indenticator.color.dark": "rgb(1, 162, 226)",  
  >"indenticator.inner.color.dark": "#81A1C1",  
4. [Error Lens](https://github.com/phindle/error-lens)

  >"errorLens.delay": 500,  
  >"errorLens.gutterIconsEnabled": true,  

5. Font: [DejaVu Sans Mono - Bront](https://github.com/chrismwendt/bront)

  >  "editor.fontFamily": "'DejaVu Sans Mono - Bront', Input, Menlo, Monaco, Consolas, 'Courier New', monospace",  
---
## Sources

- UI forked from [City Lights](http://citylights.xyz/)
- Syntax schema forked from [Dark Plus Syntax](https://github.com/dunstontc/dark-plus-syntax)
- Code syntax samples forked from [Dark Plus Syntax](https://github.com/dunstontc/dark-plus-syntax)

---
## ToDo

- [ ] Create different colour themes and allow user to switch between palettes  
- [ ] Allow users to assign their own colours to theme elements through VScode [`Settings`] menu and `settings.json`   
- [ ] Python Syntax - missing class(?) decorator
- [ ] Rust Syntax - missing variable decorator
- [ ] Improve bracket pair highlighting
- [x] Consider toning down folder tree CSS color
---
### Feedback welcome on [Github](https://github.com/zirdev/zir-vscode-nihil/issues). 
If you can help adding syntax missing for your favourite language (or you can point to a theme that has the syntax working) or have suggestions for colours that are assigned incorrectly - hit the keyboard!   