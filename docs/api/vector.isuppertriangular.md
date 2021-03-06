<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [isUpperTriangular](./vector.isuppertriangular.md)

## isUpperTriangular() function

Tests if a matrix is upper-triangular.

<b>Signature:</b>

```typescript
export declare function isUpperTriangular<S>(matrix: Matrix<S>): boolean;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  matrix | <code>Matrix&lt;S&gt;</code> |  |

<b>Returns:</b>

`boolean`

`true` if the matrix is upper-triangular

## Remarks

A matrix is upper-triangular if all entries below the primary diagonal (those where `i > j`<!-- -->) are zero.

