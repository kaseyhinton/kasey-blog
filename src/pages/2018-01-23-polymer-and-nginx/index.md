---
title: Polymer & Nginx 
date: "2018-01-23"
path: "/polymer-and-nginx/"
---
 
### VPS

I wanted to write up a little something for people out there who are interested in using NGINX as their http server with Polymer applications. The first step is to get a server! I personally use 
[ovh](https://ovhcloud.com/) for my vps. It is cheap and reliability isn't really an issue for me since I mainly use it to for fun! :D

### LEMP

After acquiring a vps I recommend configuring a [LEMP](https://lemp.io/) stack (Linux, Nginx, MySQL, PHP). I have found that digital ocean has an excellent guide for [getting started](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu-16-04).

### Virtual Host Config

One of the main things Polymer needs to work properly, mainly in regards to routing, is having all routes redirect to "/" on the server. In this case serve up index.html for each URL so the application can handle routing. This isn't necessarily specific to Polymer as most contemporary web frameworks require similar server setup. Here is a sample virtualhost file for nginx.

	
```bash{0-12}
server {
    listen 80;
    listen [::]:80;
        
    root /var/www/example.com/html/es5-bundled/;
    index index.html
    server_name example.com *.example.com;
        
    location / {
        try_files $uri /index.html;
    }
}
```

This most important part of this example is `try_files $uri /index.html; `

This is the line that tells nginx that from my bundle it needs to serve up index.html instead of trying to locate resources at specific URLS like www.example.com/profile.

I hope this helps!

**kaseyjameshinton@gmail.com**