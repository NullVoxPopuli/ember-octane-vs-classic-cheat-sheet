<GuideSection @id='template' as |Section|>
  <Section @id='grammar'>

```typescript
type Value = string | number | null | undefined | object | Value[];
type Helper = Function | EmberHelper | EmberModifier;
type NamedArgs = Key + '=' + SExpression
type SExpression =
  | Value
  | `(` + Helper + `)`
  | `(` + Helper + ...SExpression + `)`
  | `(` + Helper + ...SExpression + ...NamedArgs + `)`

type Moustache = `{{` + SExpression + `}}`
```

  <p>{{t 'template.grammar.plain-function' htmlSafe=true}}</p>

```hbs
<div>
    {{a b c d=e}}
{{!-- │ │ │ │ └─── value / s-expression
      │ │ │ └─── named argument key
      │ │ └─── positional argument
      │ └─── positional argument
      └─── helper --}}
</div>
```

  <p>{{t 'template.grammar.expression-breakdown' htmlSafe=true}}</p>

  </Section>

  <Section @id='notation'>

```hbs
{{or argA (not argB)}}

{{functionA argA argB argC=(functionB argD)}}
```

  <p>{{t 'template.notation.js-equiv'}}</p>

```js
argA || !argB;

functionA(argA, argB, { argC: functionB(argD) });
```

  <p>{{t 'template.notation.notes' htmlSafe=true}}</p>

  </Section>

  <Section @id='syntax'>

```hbs
<div {{modifierName a b=(helperName c)}}>
  {{yield to="default"}}
</div>
```

  <p>{{t 'template.syntax.with-this' htmlSafe=true}}</p>

```hbs
<div {{this.modifierName a b=(this.helperName c)}}>
{{!--  │                 │ │  │               └─── positional argument
       │                 │ │  └─── helper
       │                 │ └─── named argument key
       │                 └─── positional argument
       └─── modifier --}}
  {{yield to="default"}}
{{!--  │  │   └─── value
       │  └─── named argument key
       └─── helper --}}
</div>

<div {{@modifierName a b=(@helperName c)}}>
{{!--  │             │ │  │           └─── positional argument
       │             │ │  └─── helper
       │             │ └─── named argument key
       │             └─── positional argument
       └─── modifier --}}
  {{yield to="default"}}
{{!--  │  │   └─── value
       │  └─── named argument key
       └─── helper --}}
</div>
```

  </Section>
</GuideSection>

<GuideSection @id="templates-how-to" as |Section|>
  <Section @id="iterate">
    <Editable @path="templates-how-to/iterate/code/index.gjs" />
    <Editable @path="templates-how-to/iterate/code/array.gjs" />
    <Editable @path="templates-how-to/iterate/code/keyed.gjs" />
  </Section>

  <Section @id="invoke-function">

```hbs
{{(this.myFunction)}}
{{(this.myFunction a b)}}
```

```hbs
{{this.myFunction a b}}
```

  </Section>

  <Section @id="access-properties">

```hbs
{{@argumentA}}
```

```hbs
{{get @argObject 'property-name'}}
{{get @argObject this.dynamicProperty}}
```

  </Section>

  <Section @id="access-array-indices">

```hbs
{{get @someArray 0}}
```

  </Section>

  <Section @id="conditions">

```hbs
{{#if this.condition}}
  ...
{{else}}
  ...
{{/if}}
```

```hbs
{{#unless this.condition}}
  ...
{{else}}
  ...
{{/unless}}
```

```hbs
{{#if (eq @a @b)}}
{{else}}
{{/if}}
```

```hbs
{{#if (or (eq @a @b) (gt @c 0))}}
{{else}}
{{/if}}
```

```hbs
{{if (eq @a b) "is true" "is false"}}
{{unless (eq @a b) "is negated true" "is negated false"}}
```

{{t 'component.guide-section.references'}}
 - https://github.com/emberjs/rfcs/pull/562
 - https://github.com/emberjs/rfcs/pull/560


  </Section>

  <Section @id="define-variables" as |t|>

```hbs
{{#let (array 1 2 3) as |list|}}
  {{#each list as |number|}}
    {{number}}
  {{/each}}
{{/let}}
```

{{t 'templates-how-to.define-variables.example'}}


<Ref::List as |x|>
  <x.api @to="classes/Ember.Templates.helpers/methods/let?anchor=let">
    {{t 'refs.let'}}
  </x.api>
  <x.api @to="classes/Ember.Templates.helpers/methods/array?anchor=array">
    {{t 'refs.array'}}
  </x.api>
</Ref::List>

  </Section>

  <Section @id="math">

<Ref::List as |x|>
  <x.rfc @id="561" />
</Ref::List>

  </Section>

</GuideSection>
