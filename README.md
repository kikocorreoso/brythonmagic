brythonmagic
============

Brython magic for the IPython notebook.

The brythonmagic extension has been tested on:

* IPython versions (2, 0, 0, 'dev'), (1, 2, 0, '') and (1, 1, 0, '')

* Python version 3.3.1

* Brython version [2,0,0,'final',2]

Installation
============

**If you want to use the brythonmagic offline:**

First, you should create the 'brython' folder in the 'static/custom/' folder located on:
```python
import IPython
IPython.utils.path.locate_profile() # + '/static/custom/brython'
```
Brython files used are a slightly modified version of Brython [2,0,0,'final',2].

So you should download the Brython version available on this repository:

* https://raw.github.com/kikocorreoso/brythonmagic/master/brython/brython.js
* https://raw.github.com/kikocorreoso/brythonmagic/master/brython/py_VFS.js

to the brython folder recently created.

Once the brython javascript files are in the correct place we should install and load the brythonmagic extension:
```python
%install_ext https://raw.github.com/kikocorreoso/brythonmagic/master/brythonmagic.py
%load_ext brythonmagic
```    
Once all is in the correct place we could just load the brython javascript files executing the following code in a code cell:
```python
%%HTML
<script type="text/javascript" src="http://127.0.0.1:8888/static/custom/brython/brython.js"></script>
<script type="text/javascript" src="http://127.0.0.1:8888/static/custom/brython/py_VFS.js"></script>
```    
    

Or use the link below to load the brython javascript in all your sessions:

http://nbviewer.ipython.org/github/ipython/ipython-in-depth/blob/master/notebooks/05%20-%20Notebook%20and%20javascript%20extension.ipynb#custom.js

**If you have an internet connection and want to use the brythonmagic online:**

Just type the following:
```python
%install_ext https://raw.github.com/kikocorreoso/brythonmagic/master/brythonmagic.py
%load_ext brythonmagic
```
And load the brython js libs in the notebook:
```python
%%HTML
<script type="text/javascript" src="https://rawgithub.com/kikocorreoso/brythonmagic/master/brython/brython.js"></script>
<script type="text/javascript" src="https://rawgithub.com/kikocorreoso/brythonmagic/master/brython/py_VFS.js"></script>
```

Usage
=====

The brythonmagic provides you a cell magic, `%%brython`, to run brython code and show the results in a html `div` tag below the code cell. Best way to start with Brython is to check [the Brython docs in their home page](http://brython.info/doc/en/index.html).

example:
```python
%%brython -c zone
# First of all, the import of some libraries
from browser import doc, html

# All the elements will be inserted in the div with the "zone" id
zone = doc['zone']

# We create a new div element
newdiv = html.DIV(Id = "new-div")
# Now we add some style
newdiv.style = {"padding": "5px", 
           "backgroundColor": "#ADD8E6"}

# We create a new link and add the link to a string
blink = html.A('brython',href="http://brython.info")
text = "Brython is really cool, look at "+ blink+ " for more"

# Now we add the text to the div with id="new-div"
# the line below is equivalent to newdiv <= html.DIV(text,"banner")
newdiv.append(html.DIV(text,"banner"))

# Finally, we add the newdiv to the outer div with id="zone"
# zone <= newdiv is equivalent to zone.append(newdiv)
zone <= newdiv
```    
You can use several options:

* -p, --print: will show you the generated html code below the results obtained from the brython code.


* -c, --container: you can define the name of the `div` container in case you want to 'play' with it in other cell. If you don't define an output the `div` will have and `id` with the following format 'brython-container-[random number between 0 and 999999]'


* -i, --input: you can pass variables defined in the Python namespace separated by commas. If you pass a python list it will be converted to a brython list, a python tuple will be converted to a brython tuple, a python dict will be converted to a brython dict, a python string will be converted to a brython string.


[WARNING] This options may change as the brythonmagic is in active development. 

To see some examples download the notebook available in the repository and run it locally or see it in the [nbviewer](http://nbviewer.ipython.org/github/kikocorreoso/brythonmagic/blob/master/Brython%20usage%20in%20the%20IPython%20notebook.ipynb?create=1) (you will loose the interactivity if you choose the second option). Also, you can take a look on the following video: http://youtu.be/adQzjuUX0kw

Support
=======

If you need Brython support, please, ask here: https://groups.google.com/forum/?fromgroups=#!forum/brython

If you need IPython support, please, ask here: http://mail.scipy.org/mailman/listinfo/ipython-dev

If you find a bug or want to propose a new feature open a new issue here: https://github.com/kikocorreoso/brythonmagic/issues

If you want to improve the code, fork, commit and PR ;·D

IDEAS
=====

Add an option to include *.py scripts? These *.py scripts should be Brython compatible.

Add an option to include a HTML structure so you don't have to create the structure via Brython code?

Add an option to run more than one Brython script in a code cell? Right now, if you run a Brython code cell, the code in other cells will not work anymore (i.e., __BRYTHON__.scope.__main__ will be overwritten).
