<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [VectorBuilder](./vector.vectorbuilder.md) &gt; [shift](./vector.vectorbuilder.shift.md)

## VectorBuilder.shift() method

Constructs a vector whose entries match the input vector, but offset by a given amount

<b>Signature:</b>

```typescript
shift(vector: Vector<S>, offset?: number, reverse?: boolean): V;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  vector | <code>Vector&lt;S&gt;</code> | The vector whose entries to use |
|  offset | <code>number</code> | The amount by which to shift the indices |
|  reverse | <code>boolean</code> | Shift entries backward rather than forward |

<b>Returns:</b>

`V`

## Example


```
const original = vectorBuilder.fromArray([1, 2, 3]);
const rightOne = vectorBuilder.rotate(original); // [2, 3, 1];
const rightTwo = vectorBuilder.rotate(original, 2); // [3, 1, 2];
const leftOne = vectorBuilder.rotate(original, 1, true); // [3, 1, 2];

```

