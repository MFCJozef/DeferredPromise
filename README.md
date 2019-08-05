# promised-deferred
Joins @Medikoo's Deffered Library with something the default Promise library from NodeJS can read and interact with

## Install
Get the library in your project by doing `npm install promised-deferred`
## Usage
The point of Promised Deferred is that you are able to create regular Node.JS promises, as well as use the functionality of Medikoo's Deferred library, being able to resolve a promise from **outside** a method or function. An example of an outside resolve _(possible through just using the Deferred library)_:
```js
const PromisedDeferred = require('promised-deferred');

var pd = new PromisedDeferred();

function DoSomething() {
    // Your code here
    return pd.Promise();
}

function DoSomethingElseAfterDoSomething() {
    // Your code here
}

var do = DoSomething();

do.then(() => {
  DoSomethingElseAfterDoSomething();
});
```

An example of an inside resolve _(possible through the default Promise library)_:
```js
const PromisedDeferred = require('promised-deferred');

var pd = new PromisedDeferred();

DoSomeAsyncCall() {
   AsyncCall((result) =>  {
      pd.Resolve(result);
   }
   return pd.Promise()
}

var do = DoAsyncCall();

do.then((value) => {
    // your code here
});
```

As stated above, you can still use Promised Deferred as you would a normal Promise() or Deferred(). However, Promise() comes with a nifty thing called `.all()` which can be beyond useful if your code has to wait until everything is done before continuing, regardless on whether or not it's a normal Async Call like `.get()` or if it's a custom code that may or may not have a delay.

This is how you do this in Promised Deferred, giving you the best of both worlds:
Script1.js:
```js
const PromisedDeferred = require('promised-deferred');
var pd = new PromisedDeferred();

function DoSomething(value) {
    // Your code here
    return pd.Promise();
}
```
Script2.js:
```js
const PromisedDeferred = require('promised-deferred');

var pd = new PromisedDeferred();

DoSomeAsyncCall() {
   AsyncCall((result) =>  {
      pd.Resolve(result);
   }
   return pd.Promise()
}
```
index.js:
```js
var promises = [];

promises.push(DoSomething());
promises.push(DoSomeAsyncCall());

Promise.all(promises).then((values) => {
    values.forEach((value, index) => {
        console.log(`${index}: ${value}`);
    }
}
```

## Alternative Use: medikoo's Deferred lib
you can still choose to use the default medikoo's library with all it's functionality:
```js
const PromisedDeferred = require('promised-deferred');
const Deffered = PromisedDeferred.Deferred();

var deferred = new Deferred();
```
