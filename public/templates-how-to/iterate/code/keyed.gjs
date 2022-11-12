let anIterable = [
  { uuid: '123 .... abc', data: 'a' },
  { uuid: '231 .... abc', data: 'b' },
  { uuid: '321 .... abc', data: 'c' },
];

<template>
  Using keying to change what invalidates the list.

  {{#each anIterable key='uuid' as |item|}}
    Item: {{item.data}} <br>
  {{/each}}
</template>
