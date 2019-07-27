<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [Matrix](./vector.matrix.md)

## Matrix interface

A generalized Matrix - one of the core data types

<b>Signature:</b>

```typescript
export interface Matrix<S> extends LinearTransformation<Vector<S>, Vector<S>> 
```

## Methods

|  Method | Description |
|  --- | --- |
|  [add(other)](./vector.matrix.add.md) | Implements matrix addition |
|  [adjoint()](./vector.matrix.adjoint.md) | Returns the adjoint of the matrix |
|  [apply(vector)](./vector.matrix.apply.md) | Applies the matrix as a linear transformation to the given vector. Implements matrix-vector multiplication. |
|  [builder()](./vector.matrix.builder.md) | Returns a [MatrixBuilder](./vector.matrixbuilder.md) which will build new matrices of the same type |
|  [equals(other)](./vector.matrix.equals.md) | Tests if two matrices are equal |
|  [forEachEntry(callback)](./vector.matrix.foreachentry.md) | Executes the <code>callback</code> function for each entry in the matrix. |
|  [getColumn(j)](./vector.matrix.getcolumn.md) | Returns a vector corresponding to the column at index <code>columnIndex</code> |
|  [getColumnVectors()](./vector.matrix.getcolumnvectors.md) | An array of vectors corresponding to the columns of the matrix |
|  [getDiagonal()](./vector.matrix.getdiagonal.md) | Returns a vector containing the elements of the main diagonal of the matrix |
|  [getEntry(i, j)](./vector.matrix.getentry.md) | Returns the entry of the matrix at the specified indices <code>i</code> and <code>j</code> |
|  [getNumberOfColumns()](./vector.matrix.getnumberofcolumns.md) | Returns the number of columns in the matrix |
|  [getNumberOfRows()](./vector.matrix.getnumberofrows.md) | Returns the number of rows in the matrix |
|  [getRow(i)](./vector.matrix.getrow.md) | Returns a vector corresponding to the row at index <code>rowIndex</code> |
|  [getRowVectors()](./vector.matrix.getrowvectors.md) | Returns an array of vectors corresponding to the rows of the matrix |
|  [getSparseData()](./vector.matrix.getsparsedata.md) | Returns the contents of the matrix as a nested map of rowIndex to columnIndex to nonzero value |
|  [multiply(other)](./vector.matrix.multiply.md) | Implements matrix multiplication |
|  [ops()](./vector.matrix.ops.md) | Returns a [ScalarOperations](./vector.scalaroperations.md) object which will allow consumers to work generically with the scalars contained in the vector. |
|  [scalarMultiply(scalar)](./vector.matrix.scalarmultiply.md) | Implements multiplication of a matrix by a scalar |
|  [set(i, j, value)](./vector.matrix.set.md) | Returns a new matrix equal to the old one, except with the entry at <code>(i, j)</code> replaced with <code>value</code> |
|  [toArray()](./vector.matrix.toarray.md) | Returns the contents of the matrix as a 2-D array. |
|  [trace()](./vector.matrix.trace.md) | Returns the trace of the matrix |
|  [transpose()](./vector.matrix.transpose.md) | Returns the transpose of the matrix |
|  [vectorBuilder()](./vector.matrix.vectorbuilder.md) | Returns a [VectorBuilder](./vector.vectorbuilder.md) which will build new vectors of a compatible type |
