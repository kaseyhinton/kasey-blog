---
title: Software Development Silo
date: "2017-11-17"
path: "/software-development-silo/"
---
 
### Divide and Conquer Without the Conquer

Recently we inherited some technical debt at the company I work for. I was researching to determine whether or not it would be viable to keep the current solution or
if we should rewrite it completely. We had a team completely removed from our company-wide policies and procedures when it comes to programming. They were
immune to process and it hurts. Not only did they build an application in a tech stack that is completely unmaintainable but it isn't even ready for release. Upon reviewing the code base I realized that there was no validation happening on any of the inputs. Imagine holding the enter key down on a comment input and in a matter of 3 seconds creating 56 comments. Yep.. Also there was no error handling on any of the asynchronous work. Did my comment post? Who the hell knows? All my hard work gone.. just like my dreams. The back-end reeked of leaky abstraction! In house frameworks need to be scrutinized thoroughly or else something like this will make its way into production. Zero docs. Tons of limitations. Lots of indirection. Implemented in the name of abstraction for no reason other than to abstract things away and use design patterns because you like them. I wish people would stop trying to be so damn clever. This particular team is infected with **not invented here syndrome**.

 Read More Here [Not Invented Here Syndrome](https://en.wikipedia.org/wiki/Not_invented_here)

 They over complicated basically a blog post application and underdelivered 6 months past the due date. The moral of this story? **DO NOT DEVELOP IN A SILO.** This team had special privileges and affordances that ultimately lead to their demise.

### In Conclusion

Developers need to be held accountable for their work. When developing in a silo things will always be missed or poorly engineered. This is why we preach agile development. If you have a team or persons that developed a project like this do not drop it on one of your good teams. That is a surefire way to kill team morale. Cut your losses and let real engineers solve your problems.

**kaseyjameshinton@gmail.com**