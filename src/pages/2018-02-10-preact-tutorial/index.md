---
title: Preact Tutorial
date: "2018-02-10"
path: "/preact-tutorial/"
---

In this tutorial we are going to build a simple preact application.

### Let's Get Started

We first need to set up our environment. We are going to use `preact-cli` to generate our starter files.

```bash
npm install -g preact-cli
```

Now that we have the preact command line installed we can use one of their templates to generate a starter project. You can find a list of all the supported templates [here](https://github.com/preactjs-templates/).

```bash
preact create preactjs-templates/simple preact-tutorial
cd preact-tutorial
npm run start
```

Now you can open up a browser and navigate to `http://localhost:8080` to see the application in action.

![preact](./hello-world.jpg)

It may not look like much but we have been gifted with a beautiful and lightweight canvas!

Now lets crack open the project in your favorite code editor. I use visual studio code. You can download it for free [here](https://code.visualstudio.com/). Once you have the project opened navigate to `index.js`. It should look something like this.

```javascript
import './style';
import { Component } from 'preact';

export default class App extends Component {

	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
			</div>
		);
	}
}
```

Lets first start by initializing our state.

```javascript
	state = {
		count: 0
	}
```

Now that we have the state set with an initial value of zero lets display it on the screen. Preact gives us a super nice way to deal with props and state by passing them into the render method as arguments. This makes it really easy for us to destructure our state into easy to work with variables.

```javascript
	render(props, {count}) {
		return (
			<div>
				<h1>{count}</h1>
			</div>
		);
	}
```

Next we will need a way to modify the state of our component. Let's add a button, click handler, and method to take care of all of that!

```javascript
	
	increment = (event) => {
		this.setState({count: count += 1});
	}
	
	<button onClick={this.increment}>Increment</button>
```



**kaseyjameshinton@gmail.com**