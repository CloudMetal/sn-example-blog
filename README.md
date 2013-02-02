A sample blog application built with Node.js
============================================

How to run the server?
======================

1. Start a local mongodb instance
<pre>
mongod --dbpath=mongodb-2.2-demo/ &
</pre>

2. Run the server
<pre>
node app
</pre>

<http://localhost:3000>
<http://localhost:3000/users>
<http://localhost:3000/blogs>

Customize the configurations
============================

## Configure the MongoDB connection
Update config/config.js
<pre>
exports.creds = {
  mongo: {
    'hostname': 'localhost', // Host name
    'port': 27017, // Port number
    'username': '',
    'password': '',
    'name': '',
    'db': 'sample-blog_development' // DB name
  }
}
</pre>	
