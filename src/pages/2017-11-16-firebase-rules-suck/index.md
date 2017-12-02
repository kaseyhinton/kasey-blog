---
title: Firebase Rules Suck
date: "2017-11-16"
path: "/firebase-rules-suck/"
---

To the dark places of firebase we go.. 

### Firebase Rules

Let me first preface my complaints with my overall opinion of Firebase. I think it is an excellent choice for simple apps. Any apps with complicated structures should avoid Firebase. I found Firebase to be really sweet and useful for my story time with friends app, however my one major complaint is the rules language!
I made the mistake of leaving my rules on the default while developing. I was running with the assumption that the rules were flexible and I would be able to
make them fit my needs after the app was built.

```javascript
    {
        "rules": {
            ".read": true,
            ".write": true
        }
    }
```

The first thing to be aware of when it comes to rules is that shallow rules will override deeper rules. The second thing is that the rules are atomic. Basically
if you dont have an explicit rule for the path it will get rejected. This is problematic in my case mainly because of how my data was structured. My main query in story time with friends is a query for ``` /stories ``` where it contains my userId(uid). I was able to write a specific rule in Firebase to only allow reads/writes on stories where my uid was present on the story. However, when querying for all the stories it is a different atomic node that I am querying and needs its own rule. The rule I put on this level overrides my specific rules on the individual story level ``` /stories/$storyId ```. If you are using Firebase in non trivial applications you have to be aware of these limitations and find solutions before you begin preferably. One solution would be to structure your data so that everything is underneath each user object, although this doesn't help keep your db structure flat. The structure I tried had a separate ``` /users ``` document at the same top level as ``` /stories ```. I tied stories to users by placing their uid on the story. Looking back I should have placed each story under users (making the rulesets stupid simple). The one downside would be that I would need a cloud function to then write to update each user's story that is a participant in the updated story. A downside of this is that it would also lead to duplicating more data.

> kaseyjameshinton@gmail.com