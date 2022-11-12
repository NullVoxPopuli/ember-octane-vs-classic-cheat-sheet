const anArray = [1, 2, 3, 4];

<template>
  {{#each anArray as |item|}}
    Item: {{item}} <br>
  {{/each}}
</template>
