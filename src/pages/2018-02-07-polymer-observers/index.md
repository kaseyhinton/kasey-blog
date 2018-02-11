---
title: Polymer Observers
date: "2018-02-07"
path: "/polymer-observers/"
---
 
### Observers

Observers in Polymer give developers significant utility when choosing how to handle state and properties updates. A brief explanation to describe observers is as follows. An observer allows you to watch a property and execute code anytime the property's value changes. There are two types of observers that we will cover simple and complex.

### Simple Observers

Let's pretend we have an input on the page that is bound to a property named `value`. We want to keep another property named `total` in sync with our `value` property. Each time `value` is changed we want `total` to change also. We can use an observer that will call our observer method everytime value changes and update total with currency formatting accordingly. This is a simple observer meaning it only has a single dependency (property value). Simple observers are declared with the property as seen below.

```javascript

static get properties() {
    return {
        value: {
            type: String,
            observer: '_valueChanged'
        },
        total: {
            type: String
        }
    }
}

_valueChanged(value) {
    if (!value)
        return;

    this.set('total', `$${value.toFixed(2)}`)
}

```

### A Web Component Example

This is a date input component I helped build at work called [titanium-date-input](https://github.com/LssPolymerElements/titanium-date-input). This functions as a [paper-input](https://www.webcomponents.org/element/PolymerElements/paper-input) with the exception that as the user types an observer fires and automatically adds slashes appropriately to the input matching the specified pattern ie `mm/dd/yyyy`.

Simple observers also pass another value into the observer method to provide additional utility. The parameters for the observer look like this `(newValue, oldValue)`. With this information we can be smarter and not do expensive updates if the old value is the same as the new one.
 
```javascript
_valueChanged(newValue, oldValue) {
    if (!newValue)
        return;

    if (newValue === oldValue)
        return;

```

### Complex Observer

Complex observers are declared in the observer array. This provides additional functionality that we can use. With these observers we can watch multiple properties, sub properties, or paths and execute the observer when any of the dependencies are updated. With complex observers you also have the ability to watch sub properties. An example might be that you have a shared state object bound into your component but don't necessarily care about updates to the the whole object. Or perhaps executing an observer everytime the state object is modified would hinder performance. Using a complex observer to listen to the specific sub property you care about can be a good solution.

In this example we have a car loan application that we can pretend is being used by a form of sorts. In this example for my task I need to make sure that anytime the down payment property is modified to be more than $1000 I am going to query a third party api to see if I can get them a better rate with another lender.

```javascript
static get properties() {
    return {
        carLoanApplication: {
            type: Object,
            value: {
                user: {
                    firstName: '',
                    lastName: '',
                    dob: ''
                },
                loanAmount: 0,
                downPayment: 0,
                lengthOfLoan: 36,
                lenders: [],
                lender: '',
                estimatedSavings: 0
            }
        }
    }
}

static get observers() {
    return ['_downPaymentAmountChanged(carLoanApplication.downPayment)'];
}

async _downPaymentAmountChanged(downPayment) {
    if (!downPayment || Number(downPayment) < 1000)
        return;

    const result = await getLendersFromThirdPartyApi(downPayment);
    const lenders = result.toList();

    this.set('carLoanApplication.lenders', lenders);
}
```

If you noticed when I updated the lenders array I did this
```javascript
this.set('carLoadApplication.lenders', lenders);
```

instead of
```javascript
this.carLoadApplication['lenders'] = lenders;
```

You must use [Polymer's Array Mutation Methods](https://www.polymer-project.org/2.0/docs/devguide/model-data#array-mutation) to ensure that any observers will be notified of property changes when they happen.    

 Another use case for a complex observer is to listen for any mutations in an array by creating a splices observer `friendsListChanged('friends.splices')`. When using a splices observer the observer method should accept a single argument. This argument will be a record of the changes that happened to the array.
 
### Recap

#### Simple Observers
1. Declared with property
2. Can only observe one property value
3. Receives new value and old value as arguments to observer method

#### Complex Observers
1. Declared with observer array
2. Can observe many properties, sub properties, paths, or array mutations
3. Receives only new value for each of the observer's dependencies

[Read the full docs from the Polymer team on observers here](https://www.polymer-project.org/2.0/docs/devguide/observers)

**kaseyjameshinton@gmail.com**