<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [ArrayMatrix](./vector.arraymatrix.md)

## ArrayMatrix class

Implements [Matrix](./vector.matrix.md) with a 2-dimensional array of values.

<b>Signature:</b>

```typescript
export declare abstract class ArrayMatrix<S> implements Matrix<S> 
```

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [add(other)](./vector.arraymatrix.add.md) |  | Implements matrix addition |
|  [adjoint()](./vector.arraymatrix.adjoint.md) |  | Returns the adjoint of the matrix |
|  [apply(vector)](./vector.arraymatrix.apply.md) |  | Applies the matrix as a linear transformation to the given vector. Implements matrix-vector multiplication. |
|  [builder()](./vector.arraymatrix.builder.md) |  | Returns a [MatrixBuilder](./vector.matrixbuilder.md) which will build new matrices of the same type |
|  [equals(other)](./vector.arraymatrix.equals.md) |  | Tests if two matrices are equal |
|  [forEachEntry(cb)](./vector.arraymatrix.foreachentry.md) |  | Executes the <code>callback</code> function for each entry in the matrix. |
|  [getColumn(j)](./vector.arraymatrix.getcolumn.md) |  | Returns a vector corresponding to the column at index <code>columnIndex</code> |
|  [getColumnVectors()](./vector.arraymatrix.getcolumnvectors.md) |  | An array of vectors corresponding to the columns of the matrix |
|  [getDiagonal()](./vector.arraymatrix.getdiagonal.md) |  | Returns a vector containing the elements of the main diagonal of the matrix |
|  [getEntry(i, j)](./vector.arraymatrix.getentry.md) |  | Returns the entry of the matrix at the specified indices <code>i</code> and <code>j</code> |
|  [getNumberOfColumns()](./vector.arraymatrix.getnumberofcolumns.md) |  | Returns the number of columns in the matrix |
|  [getNumberOfRows()](./vector.arraymatrix.getnumberofrows.md) |  | Returns the number of rows in the matrix |
|  [getRow(i)](./vector.arraymatrix.getrow.md) |  | Returns a vector corresponding to the row at index <code>rowIndex</code> |
|  [getRowVectors()](./vector.arraymatrix.getrowvectors.md) |  | Returns an array of vectors corresponding to the rows of the matrix |
|  [getSparseData()](./vector.arraymatrix.getsparsedata.md) |  | Returns the contents of the matrix as a nested map of rowIndex to columnIndex to nonzero value |
|  [multiply(other)](./vector.arraymatrix.multiply.md) |  | Implements matrix multiplication |
|  [ops()](./vector.arraymatrix.ops.md) |  | Returns a [ScalarOperations](./vector.scalaroperations.md) object which will allow consumers to work generically with the scalars contained in the vector. |
|  [scalarMultiply(scalar)](./vector.arraymatrix.scalarmultiply.md) |  | Implements multiplication of a matrix by a scalar |
|  [set(i, j, value)](./vector.arraymatrix.set.md) |  | Returns a new matrix equal to the old one, except with the entry at <code>(i, j)</code> replaced with <code>value</code> |
|  [toArray()](./vector.arraymatrix.toarray.md) |  | Returns the contents of the matrix as a 2-D array. |
|  [trace()](./vector.arraymatrix.trace.md) |  | Returns the trace of the matrix |
|  [transpose()](./vector.arraymatrix.transpose.md) |  | Returns the transpose of the matrix |
|  [vectorBuilder()](./vector.arraymatrix.vectorbuilder.md) |  | Returns a [VectorBuilder](./vector.vectorbuilder.md) which will build new vectors of a compatible type |

## Remarks

Subclasses must specify the usual scalar operations on their contents.

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `ArrayMatrix` class.
