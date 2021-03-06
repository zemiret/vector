<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [MatrixBuilder](./vector.matrixbuilder.md) &gt; [augment](./vector.matrixbuilder.augment.md)

## MatrixBuilder.augment() method

Constructs a new matrix consisting of `left` and `right` next to one another. Throws an error of `left` and `right` do not have the same number of rows.

<b>Signature:</b>

```typescript
augment(left: Matrix<S>, right: Matrix<S>): M;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  left | <code>Matrix&lt;S&gt;</code> | The matrix that will form the left-side of the augmented matrix |
|  right | <code>Matrix&lt;S&gt;</code> | The matrix that will form the right-side of the augmented matrix |

<b>Returns:</b>

`M`

The new augmented matrix

## Example


```
const left = matrixBuilder.ones(2);
const right = matrixBuilder.zeros(2, 3);

matrixBuilder.augment(left, right);

// [ 1 1 0 0 0 ]
// [ 1 1 0 0 0 ]

```

