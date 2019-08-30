# effort-server

EFFORT experiment server to be run with the companion OpenSesame experiment.

## Server

### Installation

1. Open a command prompt or powershell with administrator privileges. An easy way to do this is to open Windows search (or simply press the windows key on your keyboard) and type `cmd` or `powershell`. Right-click on command prompt or powershell icon and choose 'Run as Administrator' from the drop-down menu.
2. Install chocolatey following the [instructions on its webpage](https://chocolatey.org/install).
3. Install Meteor with the command `cinst meteor -y`.
4. Close the administrator terminal and open a new one, but this time not as administrator.
5. Clone this repository to your local machine using git, or download it using the green download button at the top right of this page.
6. In your command prompt/powershell, navigate to the folder to which you just cloned or extracted the repository.
7. Execute the command `meteor npm ci` to install dependency packages.

### Starting the server

From the folder in which the repository is located, type `run.bat`, or click on this file in an explorer window. The first run can take a while to begin, but after that startup should be swift. You can then watch the server in action by opening a browser and navigating to [http://localhost:3000](http://localhost:3000).

### Installing MongoDB

Sadly, the version of MongoDB that is included with the development version of Meteor by default cannot be accessed from outside the computer that it is running on. We do require this, as the effort experiment needs to communicate with MongoDB directly, and the experiment will be running on a number of other PC's.

To make this work, we thus need to install mongodb separately and configure meteor, or the effort-server to use this mongodb instead of the one it comes bundled with. Installing MongoDB is very easy if you have chocolatey installed:

```powershell
cinst mongodb -y
```

Make sure you run this command from an Administrator powershell.

This should install MongoDB, and also make it run.

## Client

### Connecting OpenSesame to the server

OpenSesame requires some extra modules to be able to interact with the server, but these should be installed automatically on the first run of the experiment. If automatic installation fails for some reason, please also try to see if it succeeds when OpenSesame is run in Administrator mode.

### Configuring connection parameters

In the item `SessionSettings` in the EFFORT experiment, you can enter the IP address and port of both the computer running MongoDB and the meteor app. Usually, this is one and the same computer, unless you have chosen to use a separate installation of MongoDB.

![Example settings](doc/OS_settings.jpg)

In the screenshot above, the IP address `127.0.0.1` is used, which commonly refers to the computer you are working on, or the 'localhost'. If you run meteor on the same computer as you start the experiment on, the default setting work out-of-the-box. More likely, the server runs on a different computer, and you need to adjust the IP addresses (and if necessary to port suffix, which can be found after the colon (:)) to the right ones.

- *mongo_url*: The IP address and port on which the Mongo server is running. The default port (when running the Mongo version that is included with Meteor) is `3001`.
- *db_name*: The name of the database in MongoDB. When Mongo is run from Meteor, this is usually simply called 'meteor'.
- *with_db*: `yes` if the experiment should attempt to connect to the database, `no` if it should run without the database (for testing purposes).
- *toy_server*: The IP address and port on which the toy selection server can be found (which is part of the Meteor app that also displays the sessions and leaderboard). Usually this is the same as the IP address specified in `mongo_url`, only the port is different (`3000`)

If these settings are configured correctly, the EFFORT OpenSesame experiment should automatically connect to the server when it is run.

### Installing ChromeDriver

The EFFORT experiment uses a package called selenium (which is installed automatically at the first start of the experiment) to fire up an instance of Chrome for the toy selection screen. To do so, it requires a correct ChromeDriver to be installed. Download the chrome driver with the version matching your Chrome from [https://chromedriver.chromium.org/](https://chromedriver.chromium.org/). You can check your Chrome version by opening the browser menu through the three vertical dots at the top-right of the browser window, and then selecting the following menu items in Chrome `Help > About Google Chrome`.

Once you have downloaded an appropriate version of the ChromeDriver, you should extract the zip and move or copy the resulting `Chromedriver.exe` to a location in your [system's PATH](https://en.wikipedia.org/wiki/PATH_(variable)). You can find out which folders this are by opening a powershell and executing

```powershell
$env:path -split ";"
```

This will print a list of all the locations that are in your path. It is recommendable to use a path location that is inside your user dir, or home folder (this can be determined by executing the command.

```powershell
$HOME
```

in powershell).