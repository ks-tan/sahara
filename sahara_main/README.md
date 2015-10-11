## Inspiration
As the cook of the house, I often have a hard time trying to figure out who is coming back for dinner, how much to cook for dinner and what to cook for dinner. This resulted in food wastage, or unsatisfied house mates when you don't cook enough or cook something they would prefer. This is a problem that all housewives, party/event organizers, and even overseas students staying with housemates (like me) will always face!

## What it does
This app solves all of the above mentioned problems. All you have to do is to follow the simple steps below:
1. Easy log in via your Facebook account
2. Choose from a set of recommended recipes, which is based on your current ingredient list. Ingredients closer to expiry will have priority.
3. Include the chosen recipe into a meal plan - set a time, and send a message to your house mates through Facebook
4. Check the RSVP list for your meal plan at the end of the day, and have an EASY time cooking your next big meal!

## How I built it
This was built through 

## Challenges I ran into
1. It was hard to find a free and suitable recipe API to retrieve the recipes data. Most of them has a limit to the amount of API calls we can make to it. We exceeded the limit for one of them, and are forced to find alternatives.
2. This is one of our first times trying Meteor.js, but Meteor.js is surprisingly easy to pick up.
3. Trying to split up the job between the front-end and back-end developers. This is because of the tight relationship between the front end UI and the logic/back-end aspect of the application through handlebars and etc features of Meteor, and also due to our inexperience in setting up a proper project structure in Meteor.

## Accomplishments that I'm proud of
1. That we built a pretty prototype for Sahara.
2. We learnt a lot about Meteor, and probably will not go back to using other web development tools again haha.

## What I learned
1. Meteor.js development is made much easier with the iron:router package. And other packages that exist to ease development on both front-end and back (i.e. Semantics:UI, webtempest:animate, and many others).
2. Atmosphere.js has lots of gems. Use it.
3. Do not judge packages by its install rates. Just try everything that fits your needs.
4. Setting up stubs for both front-end and back-end development. To standardise the template names to be used, one person should set up the page routes as soon as possible.

## What's next for Sahara
We will continue developing it. We may even publish it on app stores. And we will share this good stuff with our mums, all the housewives out there and the cooks of their households.