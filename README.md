# Build a live streaming application using AWS Amplify and Amazon Interactive Video Service. 


### Level

This is a level 200 lab with some experience with command line interface would be useful. 

### Learning outcome

In this lab, you will learn step-by-step instruction to build engaging, interactive, low-latency live streaming platform with Amazon IVS using AWS Amplify and plugins. You will get a chance to create a single page web application to view the playback video. 

### Time for this lab 

This lab will take about 15 mins to complete

---
### Let’s get started

Here are the steps you will need for this lab

1. Create a simple react app
2. Use Amplify and it’s plugins to set up a live streaming source
3. Update the front-end to show playback video
4. Setup OBS for live streaming
5. Test your app 
6. Cleanup 

---
### Step 0. Setup

This lab assume that it's being executed in an AWS Cloud9 (https://aws.amazon.com/cloud9/) instance provided by the lab co-ordinator.

#### Workshop environment

* Go to to AWS Console
* Check to see that you are in US West (Oregon) in the top right-hand corner.
* [Go to Cloud9 environment](https://console.aws.amazon.com/cloud9/)
* Go to **Your Environments**.
* Find the workspace named DevLab-IVSAmplify and click Open IDE:
![cloud9 setup](/src/images/cloud9-setup.png)

When you open the DevLab-IVSAmplify workspace, you'll be presented with a welcome screen that looks something like this:
![cloud9 welcome](/src/images/cloud9-welcome.png)

#### Prerequisite
* This lab assume that resizie.sh from this repository is cloned into this Cloud9 environment. Now you are in Cloud9 environment, open a new terminal. Run the following command to resize the Amazon EBS volume: 

		bash resize.sh 30

* Before you go further, you will need **AccessKey** & **SecretKey** to deploy application. These information can be found in AWS Management console. 

	This instruction is only for AWS led event. 
	* Go to "CloudFormation" and choose the stack deployed for this Cloud9 environment. (If you don't know where to find, please ask the lab support)
	* Go to "Outputs" tab
	* Keep this tab open or copy **Access Key** and **SecretKey** in safe place. 
	![cfn keys](/src/images/cfn-keys.png)		

### Step 1. Create a simple react app

**Let's start installing packages for the project.**

* [Install node js](https://nodejs.org/en/download/) (already installed in the cloud9 environment)
* [Install NPM](https://docs.npmjs.com/getting-started)  (already installed in the cloud9 environment)

*  Let's create a new React app with create-react-app, a CLI tool used to bootstrap a React app with current best practices 
		
		npx create-react-app <project-name>

* Let's move inside the project folder with the following command:

   		cd <project-name> 

* Install the Amplify CLI

		npm i -g @aws-amplify/cli

* Install dependency using this command:

		npm i --save @aws-amplify/ui-react hls.js maplibre-gl-js-amplify 
* Now, you can test this React app by starting a development server from the project root folder:

		npm start

You can see a preview of the running app by leveraging the preview runnng application feature in Cloud9.
	![cloud9 preview](/src/images/cloud9-preview.png)	


### Step 2. Use Amplify and it’s plugins to set up a live streaming source

 * Now that you have a running React app, you can setup Amplify by runing the amplify init command from the root of the project.

 Open up a new teminal by clicking on '+' on Cloud9 environment and run this command:

		cd <project-name> 
		amplify init

* The Amplify CLI will prompt to fill up about the app:

	* For authentication method, choose "AWS access keys". Use the **Access Key** and **SecretKey** from the output of CloudFormation in [prerequisite step](https://gitlab.aws.dev/maykyaw/build-live-streaming-app-with-amplify-and-ivs#prerequisite)

	* For region, choose **"us-west-2"**

	![amplify init](/src/images/amplify-init.png)	


This will initialise a new project inside your **React project** and you will see a new folder: **/amplify**. 

* Next, install **amplify-category-video plugin** to easily incorporate video streaming into your mobile and web applications live streaming.

		npm i amplify-category-video --save
		
* Once it is installed, take a note of the absolute path of the plugin by running the command below:

		realpath "`pwd`/node_modules/amplify-category-video"
		
	It should be something similar like this: ./home/ec2-user/environment/<your-project-name>/node_modules/amplify-category-video

* Run below command to explicitly add a plugin package to the Amplify CLI and provide **the absolute path to the plugin** from the previous step and press enter.

		amplify plugin add video --save
	![amplify video path](/src/images/amplify-video-path-find.png)	

* Add a live streaming resource to your project. Follow the prompts to create an Amazon IVS channel. 

		amplify video add	
	![Amplify video add example](/src/images/amplify-video-add.png)

* Push the changes to AWS environment, and follow the prompt.

		amplify push
This will take a little while, so you can go to Step 3 and come back go this when the deployment is finished. 
	
### Step 2.1 CloudFormation output	
Once it’s successful, you will see the following outputs and **take a copy of them**. We will use them to set up obs software and the app. 

    * Input url
    * Stream keys
    * Output url
![Amplify output](/src/images/amplify-output.png)


### Step 3. Update the front-end to show playback video

While Cloudformation is preparing the deployment, let's update the front-end app.
Copy
* [<project>/src/App.js](https://github.com/maykyaw/amazon-ivs-with-amplify/blob/main/src/App.js) 
* [<project>/src/index.js](https://github.com/maykyaw/amazon-ivs-with-amplify/blob/main/src/index.js) 
* [<project>/public/index.html](https://github.com/maykyaw/amazon-ivs-with-amplify/blob/main/public/index.html) in this lab to **your project**. If a file doesn't already exist in your project, please create them.

**Note these will overwrite the existing files generated by create-react-app earlier.**

* To update playback url in App.js, open up **App.js** in your project and update **line 14** with the **Output url** from [Step 2.1](https://gitlab.aws.dev/maykyaw/build-live-streaming-app-with-amplify-and-ivs#step-21-cloudformation-output). 

	
![Playback url update](/src/images/playback.png)

Now you are all done and see the changes in preview.
![cloud9 preview](/src/images/cloud9-preview.png)
	
### Step 4. Setup OBS for live streaming

To manually set up

* Open up “OBS” software and click on “Settings”
* Under Stream, update “Server” and “Stream Key” as shown in Figure B with “Input url” and “Stream Keys” from CloudFormation output in the [Step 2.1](https://gitlab.aws.dev/maykyaw/build-live-streaming-app-with-amplify-and-ivs#step-21-cloudformation-output). 
* Then click **Ok** 
* Now you can click on **Start Streaming**

![OBS setup](/src/images/obs-settings.png)
![OBS update](/src/images/obs-update.png)

* (Optional) For a quick test, copy the “output url” from the [Step 2.1](https://gitlab.aws.dev/maykyaw/build-live-streaming-app-with-amplify-and-ivs#step-21-cloudformation-output) and go to [hlsPlayer.net](https://www.hlsplayer.net/) and paste the "output url" as shown below

![hls test](/src/images/hls-test.png)

### Step 5. Test your app
	
Now go back to Cloud9 environement. You can see a preview of the running app as below
![output](/src/images/final.png)

### Step 6. Clean up resources
To clean up resources, you will need to go to the root directory of your project and follow this command:

		amplify delete

### Useful resources
[EBS resize] (https://docs.aws.amazon.com/cloud9/latest/user-guide/move-environment.html#move-environment-resize)

### Feedback

Please give us the feedback on what you think of the project
https://eventbox.dev/survey/TDRFNHD

![Feedback](/src/images/qrcode.png)