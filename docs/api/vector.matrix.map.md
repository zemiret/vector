<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [Matrix](./vector.matrix.md) &gt; [map](./vector.matrix.map.md)

## Matrix.map() method

Builds a matrix by transforming the values of the current matrix.

<b>Signature:</b>

```typescript
map(entryFunction: (entry: S, rowIndex: number, columnIndex: number) => S): Matrix<S>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  entryFunction | <code>(entry: S, rowIndex: number, columnIndex: number) =&gt; S</code> | A function which takes an entry of the original matrix and its indices, and returns the corresponding entry of the new matrix |

<b>Returns:</b>

`Matrix<S>`

The new matrix

## Example


```
const original = matrixBuilder.fromArray([
  [ 1, 2, 3 ]
  [ 4, 5, 6 ]
]);

const originalPlusOne = original.map(value => value + 1);

// [ 2 3 4 ]
// [ 5 6 7 ]

const originalPlusIMinusJ = original.map((value, i, j) => value + i - j);

// [ 1 1 1 ]
// [ 5 5 5 ]

```

