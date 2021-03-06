<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [MatrixBuilder](./vector.matrixbuilder.md) &gt; [zeros](./vector.matrixbuilder.zeros.md)

## MatrixBuilder.zeros() method

Constructs a matrix of the specified dimensions, consisting of all zeros

<b>Signature:</b>

```typescript
zeros(shape: MatrixShape): M;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  shape | <code>MatrixShape</code> | the shape of the matrix as a tuple |

<b>Returns:</b>

`M`

The new matrix

## Example


```
const allZeros = matrixBuilder.zeros([2, 3]);

// [ 0 0 0 ]
// [ 0 0 0 ]

```

