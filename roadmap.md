## Roadmap

### Tech
- Support scss-sass? React team advises us to use Component composition instead and just use css.
- flexbox
- BEM methology or CSS Modules
- code splitting
- Add moment for dates? var timeAgo = moment(this.props.message.createdAt).fromNow()

### Features
- 1st version will support only browser rendering and will save to localstorage or indexedDB
- ~~First we will add sidebar that supports only the notes and after folders tags etc.~~
- Resizable sidebars(https://github.com/tomkp/react-split-pane, https://github.com/DanFessler/react-panelgroup)
- ~~Add Main Editor~~
- ~~Add actions at the TopBar(New, Edit, Delete)~~
- Add Search on the current Note
- Add Search on all notes
- Add keyboard navigation on notes list up, down
- Add General shortcuts
- ~~Support to rename the default title that will occur from the plain text of the copytext~~
- Support pinned notes on list
- Add an HTML editor(CKEditor) or play with contentEditable="true" in a div(XSS heaven!!!)
- Support to switch between editors if we have more than one html editors.
- ~~Fonts (https://fontawesome.com)~~
- Add animation on the list items when an item is deleted
- Support history on all action(basically on delete list items)
- When all notes folder is selected, show folder icon and name at the bottom of the note item
- Support tags?