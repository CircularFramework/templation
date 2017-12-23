# @circular/templation

Templation is a javascript template engine that was written to be used within the Circular Framework, however it can also be used as a standalone template engine.

### Installation
_npm install @circular/templation --save_

### How To Use
Templation attempts to make setup and configuration as simple as possible. At a minimum you need to provide an html template and a container to put it in after it has been processed. An object can be passed into the template with values that will be bound to the template and any time a value on that object changes it will rebuild the template and use a simple virtual DOM implementation to rebuild the view. There are four built-in directives that can be leveraged in your template that are listed below. See the example code below or in the example/ sub folder.

##### crFor
The crFor directive can be used as an attribute on an element in your template that will iterate over an array. 
    
    <li crFor="u in users">
        {{u.name}}
    </li>

##### crIf
The crIf directive will decide based on a boolean expression whether or not to display the given element.

    <div crIf="u.isSelected">
        Some content here.
    </div>
    
##### crClass
The crClass directive will take in an object of key/value pairs. The key is the class name you desire to add/remove, and the value is a boolean expression that will evaluate whether the class should be added or removed.

    <h1 crClass="{ 'red': users.length % 2 == 0, 'blue': users.length % 2 !== 0 }">User Count: {{users.length}}</h1>
    
##### crOn:[sub-selector]
The crOn directive takes in a sub selector and will add an event to the given element.
    
    <button crOn:click="testFunc2()">
        Show
    </button>
    
### Example HTML Template
    
    <template id="template">
        <div>
            <h1 title="User Count: {{users.length}}" class="test" crClass="{ 'red': users.length % 2 == 0, 'blue': users.length % 2 !== 0 }">User Count: {{users.length}}</h1>
            <ul>
                <li crFor="u in users">{{u.name}} : {{u.age}} Testing u.
                    <button crOn:click="modifyUser(u)">Modify</button>
                    <button crOn:click="toggleVisibility(u)">Toggle</button>
                    <ul crIf="u.selected">
                        <li crFor="n in u.test">
                            <button crOn:click="testFunc2(n)" class="red">
                                Show {{n}}
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
            <div>{{testFunc('Jack Is Cool')}}</div>
            <div>{{ 2 + 2 }}</div>
            <div>{{ (2 + users[0].age).toString() }}</div>
            <div>{{ users[1].age < 40 }}</div>
            <button crOn:click="addUser('New Kid', 13)">Add A User</button>
            <button crOn:click="changeUsers()">Change Users</button>
        </div>
    </template>
    
### Example Data Object To Be Bound To Template
    
    let data = {
        users: [
            { 'id': 0, 'name': 'John Doe', age: 38, selected: true, test: [1, 2, 3] },
            { 'id': 1, 'name': 'Jane Doe', age: 38, selected: true, test: [4, 5, 6] },
            { 'id': 2, 'name': 'Billy Doe', age: 14, selected: true, test: [7, 8, 9] },
            { 'id': 3, 'name': 'Samantha Doe', age: 12, selected: true, test: [10, 11, 12] },
            { 'id': 4, 'name': 'Jeremiah Doe', age: 11, selected: true, test: [13, 14, 15] },
            { 'id': 5, 'name': 'Susie Doe', age: 9, selected: false, test: [16, 17, 18] },
            { 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21]},
            { 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }
        ],
        testFunc: function(message) {
            return message;
        },
        testFunc2: function(num) {
            alert(num);
        },
        testFunc3: function(message) {
            alert(message);
        },
        addUser: function(name, age) {
            data.users.push({
                id: data.users.length,
                name: name,
                age: age,
                selected: true,
                test: [1, 2, 3]
            });
        },
        modifyUser: function(user) {
            let newName = prompt('What would you like the new name to be?');
            user.name = newName;
        },
        changeUsers: function() {
            data.users = [
                { 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: false, test: [19, 20, 21]},
                { 'id': 7, 'name': 'Molly Doe', age: 6, selected: true, test: [21, 22, 23] }
            ];
        },
        toggleVisibility: function(user) {
            user.selected = !user.selected;
        }
    };
    
### Example Of Binding The Template To the Container
    
    // html container
    <div id="app"></div>
    
    // javascript to initialize and render
    import { Templation } from '@circular/templation';
    import { data } from './data'; // the data object in the example above
    
    /** initialize Templation */
    let templation = new Templation();
    
    // "app" is the id of the div html container above
    // "template" is the id of the html template in the example up above
    let component = templation.compile('app', 'template', data);
    component.render();
    
### Adding Your Own Directive
You can create an add your own directives to the template engine. A Directive is a class within the templation system. You need to define a selector (ex: crFor) and a callback function. The callback function will receive the details of the directive value, the element that the directive was set on, and the data object that has been used to compile and render the view. The details are an object that looks like { value: 'directive-value-here', subSelector: null | 'subselector value').

As a simple example of what a Directive can look like I've put the source for the crIf directive below.

    /** import dependencies */
    import { Directive } from '../classes/directive.class';
    import { using } from '../functions';
    
    /** create the directive */
    const crIfDirective = new Directive('crIf', ifCheck);
    
    /** export the directive */
    export { crIfDirective };
    
    /** define the directive parser function */
    function ifCheck(details, ifElement, data) {
        /** evaluate the expression */
        if (using(data, details.value) === false) {
            ifElement.parentNode.removeChild(ifElement);
        }
    }
    
To add a directive to the template engine you would do the following:
    
    import { Templation } from '@circular/templation';
    import { myDirective } from './wherever/my-directive.directive';
        
    /** initialize Templation */
    let templation = new Templation();
    
    /** add the directive */
    templation.directiveContainer.addDirective(myDirective);
    
##### Additional Directive Configuration

**Pre/Post Processing**  
A directive can be marked as pre, post, or both pre and post for processing. Pre processing means that it is processed before the compiled html is placed in the DOM. Post processing means that it will be processed after the compiled html has been placed in the DOM. An example of post processing directives is the crOn directive. Events can only be added once the actual DOM elements exist in the page.

**Sub Selectors**  
Directives can have sub selectors to add additional information to the directive processing. For example, the crOn directive has many defined sub selectors that match up to event names such as click, mouseover, mouseout, etc. This allows the crOn directive to add any type of DOM event. Sub selectors are specified with a colon between them and the main selector. For example crOn:click="doSomething()".

**Directive Order**  
Directives are processed in the order that is specified by their order property. Using the setOrder method on your directive you can position the directive in the place you'd like it to be processed in the directive chain.

### Functions
A series of functions are available to help you process the html in your template. They can be used in your directives.

* exec(code: string, refs: string[], data: object[], context: object);
  * Execute some code with the data and references inside the given context. Refs are the string names of properties that are used in your string code. The data array are the array of data values that will be used in your code. Context (if given) will set the context that the function will execute in.
  
        // example
        exec('alert(ref1)', ['ref1'], ['I am an alert message'], this);
    
* using(obj: object, code: string, ref: string, refData: object);
  * Very similar to exec, except that it will make all the public properties and public methods of the passed object available inside your code. So if your object has a property called "user", that is available to use inside your code string. This is used most often inside directive parsing functions.
    
        // example
        function ifCheck(details, ifElement, data) {
            /** evaluate the expression */
            if (using(data, details.value) === false) {
              ifElement.parentNode.removeChild(ifElement);
            }
        }
    
* templater(template: html, data: object);
  * This method will do simple handlebars value replacement.
    
        // example
        templater('<div>{{user.name}}</div>', {user: { name: 'Rick Hopkins' }});
    
### Ask if you have questions.
So there is a lot going on in here and I'm just one person without enough time to document it all. Please feel free to ask questions and report bugs or issues. View the example code as well as source code for additional information.

Enjoy!
