<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [rowSumSupremumNorm](./vector.rowsumsupremumnorm.md)

## rowSumSupremumNorm() function

Calculates the Infinity-Norm of a matrix `A`

<b>Signature:</b>

```typescript
export declare function rowSumSupremumNorm<S>(A: Matrix<S>): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  A | <code>Matrix&lt;S&gt;</code> | The matrix for which to calculate the norm |

<b>Returns:</b>

`number`

## Example


```
const A = matrixBuilder.fromArray([[1, 2], [3, 4]]);
const norm = rowSumSupremumNorm(A); // 7

```
