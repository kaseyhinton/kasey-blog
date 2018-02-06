---
title: Polymer Routing
date: "2018-02-05"
path: "/polymer-routing/"
---
 
### Route With Me

Today I am going to go over some of the important parts of routing. Specifically I will cover how to leverage polymers app-location and app-route components to get shit done. The examples here will be in Polymer 3 but the concepts are the same with the components in any version of Polymer.

### Basics

Let's get imported! The two components we will need initially is app-route and app-location. App-location is what gives us our `{{route}}` variable. There are a few ways to do this. You can either import app-location and set it up on each view so you can access `{{route}}` or you can set it up once in your top level component "my-app" and bind it into the children who need access to it. Here is the basics of what it looks like.

```html
<script>
    import '../node_modules/@polymer/app-route/app-location.js';
</script>

<app-location route="{{route}}"></app-location>
```

This provides us with a variable that we can bind into the second part of our routing.. the router! App-route provides an extremely useful api. The full documentation can be accessed [here](https://www.webcomponents.org/element/PolymerElements/app-route). For us however we only need to use just a small part of the component to get our routing dreams started.

```html
<script>
    import '../node_modules/@polymer/app-route/app-location.js';
    import '../node_modules/@polymer/app-route/app-route.js';
</script>

<app-location route="{{route}}"></app-location>
<app-route route="{{route}}"></app-route>

```


In this example we have added in our app-route to our app-location code. They both have route two way bound into each other. This allows either of the components to modify the `route` variable. An additional property we have passed into app-route is the pattern property. This tells app-route that this route(whatever component we have this code in) becomes active when the URL matches the pattern specified.

### Active

Unlike some other frameworks like React or Preact that trigger component lifecycle methods when routes change Polymer does not do that. We have `ready` and `connectedCallback` which happen once when the component is initially rendered. You may often need to run some code when certain views become active. We can leverage app-route's active property to gain this functionality.

```javascript
// my-app.js
import {Element} from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';

const html = (template) => template.toString();

export class MyApp extends Element {
    static get template() {
        return html`
        <app-location route="{{route}}"></app-location>
        <app-route pattern="/" route="{{route}}" active="{{isActive}}"></app-route>
        `;
    }

     static get observers() {
        return ['_isActiveChanged(isActive)'];
    }

    static get properties() {
        return { isActive: { type: Boolean } }
    }

    _isActiveChanged(isActive){
        if (!isActive)
            return;
        // Route Is Active
    }
}
customElements.define('my-app', MyApp);
```

With very little code we can make this happen. All it takes is binding app-route's active property to the class property you would like to use and then observing it. With Polymer's observers, everytime `isActive` is changed our method `_isActiveChanged` will be invoked with the updated value passed in as the parameter. In this method we check to see if we are active. If we are not active, the route is deactivating. If we are active, the route is activating. One thing to be aware of is that with property observers such as this is that it will get called once with `undefined` passed into it.

### Variables Stored In The URL

Another common use of app-route is to store variables in the URL for use in different views. To accomplish this we need to add two things. First a variable definition in the pattern like this `pattern="/:page"`. The second thing we need is a property called `routeData`.

```html
<app-route
    route="{{route}}"
    pattern="/:page"
    data="{{routeData}}">
</app-route>
```

This is all the html changes we need. We are two way binding a property we will make shortly called routeData into app-route's data attribute. App-route will subsequently modify our `routeData` variable and store the variable we told it about in the pattern as a property on the `routeData` object. You can access it via `routeData.page`.

```javascript
// my-app.js
import {Element} from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/app-route/app-location.js';
import '../node_modules/@polymer/app-route/app-route.js';

const html = (template) => template.toString();

export class MyApp extends Element {
    static get template() {
        return html`
        <app-location route="{{route}}"></app-location>
        <app-route route="{{route}}" active="{{isActive}}" data="{{routeData}}"></app-route>
        `;
    }

     static get observers() {
        return [
            '_isActiveChanged(isActive)',
            '_routePageChanged(routeData.page)'
            ];
    }

    static get properties() {
        return {
            isActive: { type: Boolean },
            page: { type: String, reflectToAttribute: true},
            routeData: { type: Object }
        }
    }

    _routePageChanged(page) {
        this.page = page || '/'; // default to home route if undefined
    }

    _isActiveChanged(isActive){
        if (!isActive)
            return;
        // Route Is Active
    }
}
customElements.define('my-app', MyApp);
```

This is a very small overview of what is possible using app-route and it's components. It requires very little boilerplate for how much value it provides. The code here is available from a starter kit hosted on my [github](https://github.com/kaseyhinton/learn-polymer-starter-kit). This will provide an entry point for someone new to polymer to get started experimenting with Polymer's goodness.

**kaseyjameshinton@gmail.com**