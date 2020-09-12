Brythonmagic
============

Brython magic for the Jupyter notebook.

The brythonmagic provides you a cell magic, `%%brython`, to run brython 
code and show the results in a html `div` tag below the code cell. Best 
way to start with Brython is to check [the Brython docs in their home 
page](http://brython.info/doc/en/index.html).

Tested on
=========

The master branch of brythonmagic extension has been tested on:

* Jupyter notebook >= 6.1.4

* Python version >= 3.6

* Brython versions <= 3.6.x

Installation
============

You should have Jupyter (notebook) already installed in order to use 
Brythonmagic. In case you don't have Jupyter installed you can follow 
the instructions on the [Jupyter official 
page](http://jupyter.readthedocs.org/en/latest/index.html).

Method 1) - Download this repo and on the brythonmagic downloaded folder type:

```python
python setup.py install
```

Method 2) - Use pip (you will need to install git):

```python
python -m pip install git+https://github.com/kikocorreoso/brythonmagic.git

Then, load the extension in the notebook:

```python
%load_ext brythonmagic
```

And, finally, load a stable brython js lib in the notebook using the 
following code:

```python
from brythonmagic import load_brython_stable
load_brython_stable()
```

If you have any problem with the installation, please, open an 
[issue](https://github.com/kikocorreoso/brythonmagic/issues).

WARNING
=======

In order to load javascript libraries in a safety way you should try to
use https instead of http when possible (read more 
[here](http://mail.scipy.org/pipermail/ipython-dev/2014-July/014572.html)). 
If you don't trust the source and/or the source cannot be loaded using 
https then you could download the javascript library and load it from a 
local location.

Brythonmagic doesn't load any javascript library and the user should
take care about the security and should use trusted sources.

You can load third party javascript libraries using the following code:

```python
from brythonmagic import load_js_lib
load_js_lib("https://url/to/your/lib.js")
```

Usage
=====

example:

```python
%%brython -c zone
# First of all, the import of some libraries
from browser import document, html

# All the elements will be inserted in the div with the "zone" id
zone = document['zone']

# We create a new div element
newdiv = html.DIV(Id = "new-div")
# Now we add some style
newdiv.style = {"padding": "5px", 
           "backgroundColor": "#ADD8E6"}

# We create a new link and add the link to a string
blink = html.A('brython',href="http://brython.info")
text = "Brython is really cool, look at "+ blink + " for more"

# Now we add the text to the div with id="new-div"
newdiv <= html.DIV(text)

# Finally, we add the newdiv to the outer div with id="zone"
zone <= newdiv
```    

You can use several options:

* -p, --print: will show you the generated html code below the results 
obtained from the brython code.


* -c, --container: you can define the name of the `div` container in 
case you want to 'play' with it in other cell. If you don't define an 
output the `div` will have an `id` with the following format 
'brython-container-[random number between 0 and 999999]'. Just one 
container name is accepted. If you pass more than one only the first 
one will be used and a warning will raise.


* -i, --input: you can pass variables defined in the Python namespace 
separated by whitespaces. If you pass a python list it will be converted 
to a brython list, a python tuple will be converted to a brython tuple, 
a python dict will be converted to a brython dict, a python string will 
be converted to a brython string.


* -h, --html: you can pass a string with html markup code. This html 
code will be inserted inside the div container. In this way you can 
avoid the generation of HTML markup code via a Brython script so you 
can separate the layout from the 'action'. Just one html markup code 
string name is accepted. If you pass more than one only the first one 
will be used and a warning will raise.


* -s, --script: Use this option to provide an id to the script defined 
in the Brython code cell. Also, this value could be used to run the 
code of this cell in other brython cells. Just one script name is 
accepted. If you pass more than one only the first one will be used and 
a warning will raise.


* -S, --scripts: Use this option to run code previously defined in 
other Brython code cells. The values should be the provided values in 
the -s/--script option in other Brython code cells.

[WARNING] This options may change as the brythonmagic depending the 
development of Brython and/or Jupyter. 

To see some examples download the notebooks available in the repository 
and run it locally or see it in the 
[nbviewer](http://nbviewer.jupyter.org/urls/raw.githubusercontent.com/kikocorreoso/brythonmagic/master/notebooks/Brython%20usage%20in%20the%20IPython%20notebook.ipynb?create=1) 
(you will loose the interactivity if you choose the second option). 
Also, you can take a look on the following video: 
http://youtu.be/adQzjuUX0kw

Example notebooks (some options will not work due to changes in APIs)
=================

* [General usage of Brythonmagic](http://nbviewer.jupyter.org/github/kikocorreoso/brythonmagic/blob/master/notebooks/Brython%20usage%20in%20the%20IPython%20notebook.ipynb).

* [An Openlayers tutorial](http://nbviewer.jupyter.org/github/kikocorreoso/brythonmagic/blob/master/notebooks/OpenLayers%20(python)%20tutorial.ipynb).

* [A Highcharts tutorial](http://nbviewer.jupyter.org/github/kikocorreoso/brythonmagic/blob/master/notebooks/Highcharts%20(python)%20tutorial.ipynb)

Support
=======

If you need Brython support, please, ask here: 
https://groups.google.com/forum/?fromgroups=#!forum/brython

If you need IPython support, please, ask here: 
http://mail.scipy.org/mailman/listinfo/ipython-dev

If you find a bug or want to propose a new feature open a new issue 
here: https://github.com/kikocorreoso/brythonmagic/issues

If you want to improve the code, fork, commit and send a PR ;·D

IDEAS
=====

Add an option to include *.py scripts? These *.py scripts should be 
Brython compatible. &#10004; (this could be made via imports with the 
py script in the same folder as the notebook)

Add an option to include a HTML structure so you don't have to create 
the structure via Brython code? &#10004; (did it)

Add an option to run more than one Brython script in a code cell? Right 
now, if you run a Brython code cell, the code in other cells will not 
work anymore. &#10004;  (did it)

Make it python 2.7 compatible. &#10004;  (did it)

Create a setup.py to make it available via pip. &#10004;  (did it)


CONTRIBUTORS
============

* Kikocorreoso ([pybonacci blog](http://pybonacci.wordpress.com), [twitter](https://twitter.com/pybonacci))
* baoboa ([github](https://github.com/baoboa)) for some insightful 
comments and code.
* Roger Veciana ([github](https://github.com/rveciana), 
[twitter](https://twitter.com/rveciana)) for the review of the 
Openlayers tutorial.
* Pierre Quentel and all the Brython committers for their work and 
their invaluable suggestions and help.
