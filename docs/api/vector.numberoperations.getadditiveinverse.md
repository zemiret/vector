<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [NumberOperations](./vector.numberoperations.md) &gt; [getAdditiveInverse](./vector.numberoperations.getadditiveinverse.md)

## NumberOperations.getAdditiveInverse() method

Returns the unique value that, when added to `x`<!-- -->, returns the additive identity

<b>Signature:</b>

```typescript
getAdditiveInverse(x: number): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  x | <code>number</code> |  |

<b>Returns:</b>

`number`

The additive inverse

## Remarks

In other words, `addScalars(scalar, getAdditiveInverse(scalar)) === getAdditiveIdentity()` is true for `x`

