# The file
During a long hackathon I was trying to get the documentation from Stability to work but it didn't, and I ended up having to change it a fair bit on my own and improve it to get it ready to work. This is a version of Stability's Image -> Image generation that also supports text input. 

# Cool stuff to do
First, I'll just point out that everything is wrapped in an Async function as that is the easiest way to enable asynchronous running. To install packages, you can run the command (in npm) ```npm i node-fetch form-data node:fs colors -s```
From there, you need to fill in some details to make it work for you specifically. Areas noted with a comment of ```<<<<<<``` need to be filled out along with more detailed comments. Replace the full-uppecase words with the info needed. 

