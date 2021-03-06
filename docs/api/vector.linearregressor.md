<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@josh-brown/vector](./vector.md) &gt; [LinearRegressor](./vector.linearregressor.md)

## LinearRegressor class

A [Regressor](./vector.regressor.md) model which uses an ordinary least squares model with regularization to predict a continuous target. The optimal set of parameters is computed with gradient descent.

<b>Signature:</b>

```typescript
export declare class LinearRegressor implements Regressor<LinearRegressorHyperparams> 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(hyperParameters)](./vector.linearregressor._constructor_.md) |  | Constructs a new instance of the <code>LinearRegressor</code> class |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [getHyperParameters()](./vector.linearregressor.gethyperparameters.md) |  | Return the full set of hyperparameters used to train the model, including defaults. |
|  [getParameters()](./vector.linearregressor.getparameters.md) |  | Get the coefficients of the trained linear regression model, or <code>undefined</code> if the model has not been trained. |
|  [predict(data)](./vector.linearregressor.predict.md) |  | Uses the learned parameters to make predictions based on a set of input data. |
|  [train(data, target)](./vector.linearregressor.train.md) |  | Learns the optimal set of parameters for the model. |

