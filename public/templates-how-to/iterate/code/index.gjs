let anObject = { foo: '2', bar: '3', baz: '4' };

<template>
  {{#each-in anObject as |key value|}}
    {{key}} : {{value}} <br>
  {{/each-in}}
</template>
