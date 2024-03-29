⚠️ I decided to rework this project using the knowledge I've gained since finishing this app.
Here you can find my second approach to creating oauth provider: https://github.com/Aadameqq/oauth-provider

## Simple oauth2 protocol implementation with Node.js and Typescript
### What is it?
This is a simple application, in which I tried to follow principles and rules from the book "Clean Architecture".
I mainly focused on the architecture, which means I skipped validation or designing a good api.

### Usage

    docker-compose up
    
Or start mongodb, change the database url in the config file and then run those commands in a terminal

    npm i
    npm run dev

    
### Dependency graphs

#### Classes, interfaces and functions dependency graph. 
Because the project contains many classes, functions, and interfaces, a graph including all of them is unreadable, so I made simplified and universal graph for each route.

![img_1.png](img_1.png)

#### Components dependency graph
As you can see, when we set the components so that the least transient is at the top all the arrows are pointing up

![img_2.png](img_2.png)

Black arrow - uses <br>
Red arrow - implements / extends
