# How to get it working?:
There are two ways to run this app. The first option is to use docker. The second option requires manually downloading the dependencies. Please contact me at james.gomatos@sas.com if you have any trouble getting this application to run


# First Option: Docker 

## Step 1: Install Docker Desktop
download docker desktop from this url: https://www.docker.com/products/docker-desktop


## Step 2: Creating a new directory or folder where you want the files to be downloaded:
Navigate to the folder using the command line or command prompt in windows (aka use the cd command)
### Example: `cd C/Users/Jagoma/Desktop/FSBU`
This above command is just an example and will not work for you. Call me if you need help and I can 
walk you through working the command prompt.


## Step 3: cloning the repo
using the command shown below should automatically download the files into the directory you created:
### Run this command: `git clone https://github.com/JamesGomatos/FSBU.git`


## Step 4: Build and run dockerfile
You should now see the project was downloaded into the folder you created. 
Use the `cd` command in your command prompt to change into the directory that was created.

### Run this command: `docker build . `
In the command line you should see the following output: Successfully built <container-id>

### Run this command if you are on Mac or linux: `docker run -it -p 3000:3000 <container-id>`

### Run this command if windows or gitbash: `winpty docker run -it -p 3000:3000 <container-id>`

## Step 5: Navigate to Webpage
Navigate to the following URL in your web browser: http://localhost:3000


# Second Option: Manually Install Dependecies 

## Step 1: Install Node 
Which you can get here: https://nodejs.org/en/

## Step 2: Install Yarn 
Which you can get here: https://classic.yarnpkg.com/en/docs/install/#windows-stable

## Step 3: Install Git
Which you can get here: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
## Creating a new directory or folder where you want the file to be downloaded:
Navigate to the folder using the command line or command prompt in windows (aka use the cd command)
### Example: `cd C/Users/Jagoma/Desktop/FSBU`
This above command is just an example and will not work for you. Contact me if you need help and I can 
walk you through working the command prompt.

## Step 4: cloning the repo
using the command shown below should automatically download the files into the directory you created:
### Run this command: `git clone https://github.com/JamesGomatos/FSBU.git`
#### Note: You may also need to create an account on this website ---> Github.com

# After you have all these pieces of software you can now download and run the web app by:

## Creating a new directory or folder where you want the file to be downloaded:
Navigate to the folder using the command line or command prompt in windows (aka use the cd command)
### Example: `cd C/Users/Jagoma/Desktop/FSBU`
This above command is just an example and will not work for you. Contact me if you need help and I can 
walk you through working the command prompt.


## Step 5: Download Dependencies
You should now see the project was downloaded into the folder you created. 
Use the `cd` command in your command prompt to change into the directory that was created.

#### Example: `cd FSBU`
If you type the command ls you should see a package.json file listed

## Now you have to download the dependencies I used to create the project in the command prompt.
#### Run this command: `yarn install`

## Step 6: Start the Project
#### Run this command: `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

