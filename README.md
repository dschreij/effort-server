# effort-server

 EFFORT experiment server to be run with the companion OpenSesame experiment.

## Installation

1. Open a command prompt or powershell with administrator privileges. An easy way to do this is to open Windows search (or simply press the windows key on your keyboard) and type `cmd` or `powershell`. Right-click on command prompt or powershell icon and choose 'Run as Administrator' from the drop-down menu.
2. Install chocolatey following the [instructions on its webpage](https://chocolatey.org/install).
3. Install Meteor with the command `cinst meteor -y`.
4. Close the administrator terminal and open a new one, but this time not as administrator.
5. Clone this repository to your local machine using git, or download it using the green download button at the top right of this page.
6. In your command prompt/powershell, navigate to the folder to which you just cloned or extracted the repository.
7. Execute the command `meteor npm ci` to install dependency packages.

## Starting the server

From the folder in which the repository is located, type `run.bat`, or click on this file in an explorer window. The first run can take a while to begin, but after that startup should be swift. You can then watch the server in action by opening a browser and navigating to [http://localhost:3000](http://localhost:3000).
