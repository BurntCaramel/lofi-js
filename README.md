# Lofi · JavaScript

## Installation

```
npm install lofi --save
```

## API Docs

### parseElement(input: String)

Element:
- texts: [ String ] · Array of plain text input
- mentions: [ [ String ] ] · Array of key paths
- tags: { String: Boolean | { texts: [ String ] , mentions: [ [ String ] ] } } · Key-value pairs of booleans or strings
- children: [ Element ] · Array of children elements

```js
parseElement('Click me #button #primary')
/* => {
  texts: ['Click me'],
  mentions: [null],
  tags: { button: true, primary: true },
  children: []
} */

parseElement('Hello @first-name, how are you?')
/* => {
  texts: ['Hello ', ', how are you?'],
  mentions: [['first-name'], null],
  tags: {},
  children: []
} */
```

## Demos

- [Interactive demo of parseElement](http://codepen.io/burntcaramel/pen/apaKVL?editors=0010)
