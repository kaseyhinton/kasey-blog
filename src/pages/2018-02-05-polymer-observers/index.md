---
title: Polymer Observers
date: "2018-02-07"
path: "/polymer-observers/"
---
 
### Observers

Observers in Polymer give developers many options when choosing how to handle state and properties updates on the page. A brief explanation to describe observers is as follows. An observer allows you to watch a property, be notified, and execute code everytime that properties value changes. Basically in a way it is a *property stalker*. Ooh scary. There are two types of observers that we will cover simple and complex.

### To Infinity

One thing to keep in mind with observers is that they get called everytime the value you are observing changes. Thus if you update the value you are observing in your observer you will get an infinite loop..


### Simple Observer Example

Let's say we have an input on the page that is bound to value. We have two properties that we want to keep in sync with each other `value` and `total. We want total to get updated and displayed everytime value changes but formatted to look like currency ie `$14.95`. We write an observer that will fire everytime value changes and update total accordingly.

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

### Real World Example

A real world example that would be a component I worked on for work called [titanium-date-input](https://github.com/LssPolymerElements/titanium-date-input). This functions as a [paper-input](https://www.webcomponents.org/element/PolymerElements/paper-input) with the exception that as the user types an observer fires and automatically adds slashes appropriately to the input matching the specified pattern ie `mm/dd/yyyy`.

Observers get called usually once with `undefined` so it usually helps to check straight away whether or not the newValue is truthy.

Your observer also passes another value into the callback to provide additional utility. The parameters for the observer callback look like this `(newValue, oldValue)`. With this information we can be smarter and not do expensive updates if the old value is the same as the new one.
 
```javascript
_valueChanged(newValue, oldValue) {
    if (!newValue)
        return;

    if (newValue === oldValue)
        return;

```

### Complex Observer Example

Complex observers are declared in the observer array. This provides additional functionality that we can use. With these observers we can watch multiple properties and execute the observer when any of the properties are updated. The Polymer team refers to the properties being watched as the `observer's dependencies`. With complex observers you also have the ability to watch sub properties. An example might be you have a shared state object but don't necessarily care about updates to everything on the whole object. Or perhaps executing an observer everytime the state object is modified would hinder performance. Using a complex observer to listen to the specific sub property you care about can be a good solution.


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
                lender: {
                    name: '',
                    phone: ''
                },
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

[Read the full docs from the Polymer team on observers here](https://www.polymer-project.org/2.0/docs/devguide/observers)


**kaseyjameshinton@gmail.com**