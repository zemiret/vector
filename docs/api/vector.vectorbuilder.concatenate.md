<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [VectorBuilder](./vector.vectorbuilder.md) &gt; [concatenate](./vector.vectorbuilder.concatenate.md)

## VectorBuilder.concatenate() method

Constructs a vector consisting of two vectors end-to-end

<b>Signature:</b>

```typescript
concatenate(first: Vector<S>, second: Vector<S>): V;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  first | <code>Vector&lt;S&gt;</code> | The vector which will be used for the entries starting with index 0 |
|  second | <code>Vector&lt;S&gt;</code> | The vector which will be used for the entries starting with <code>first.getDimension()</code> |

<b>Returns:</b>

`V`

The new vector

## Example


```
const first = vectorBuilder.ones(3);
const second = vectorBuilder.zeros(2);

vectorBuilder.concatenate(first, second); // [ 1 1 1 0 0 ]

```
