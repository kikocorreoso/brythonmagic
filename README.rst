Brythonmagic
============

Brython magic for the IPython notebook.

The brythonmagic provides you a cell magic, ``%%brython``, to run
brython code and show the results in a html ``div`` tag below the code
cell. Best way to start with Brython is to check `the Brython docs in
their home page <http://brython.info/doc/en/index.html>`__.

Tested on
---------

The brythonmagic extension has been tested on:

-  IPython versions >= (1, 1, 0, '')

-  Python version >= 3.3 and == 2.7

-  Brython versions >= (2,0,0) and <= (3,0,0)

Installation
------------

You should have IPython (notebook) already installed in order to use
Brythonmagic. In case you don't have IPython installed you can follow
the instructions on the `IPython official
page <http://ipython.org/install.html>`__.

To install brythonmagic itself just type the following:

.. code:: python

    %install_ext https://raw.github.com/kikocorreoso/brythonmagic/master/brythonmagic.py

or:

.. code:: python

    python setup.py install

Then, load the extension:

.. code:: python

    %load_ext brythonmagic

And, finally, load the brython js lib in the notebook:

.. code:: python

    %%HTML
    <script type="text/javascript" src="http://brython.info/src/brython_dist.js"></script>

If you have any problem with the installation, please, open an
`issue <https://github.com/kikocorreoso/brythonmagic/issues>`__.

WARNING
-------

In order to load javascript libraries in a safety way you should try to
use https instead of http when possible (read more
`here <http://mail.scipy.org/pipermail/ipython-dev/2014-July/014572.html>`__).
If you don't trust the source and/or the source cannot be loaded using
https then you could download the javascript library and load it from a
local location.

Brythonmagic doesn't load any javascript library and the user should
take care about the security and should use trusted sources.

Usage
-----

example:

.. code:: python

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
    # the line below is equivalent to newdiv <= html.DIV(text)
    newdiv.append(html.DIV(text))

    # Finally, we add the newdiv to the outer div with id="zone"
    # zone <= newdiv is equivalent to zone.append(newdiv)
    zone <= newdiv

You can use several options:

-  -p, --print: will show you the generated html code below the results
   obtained from the brython code.

-  -c, --container: you can define the name of the ``div`` container in
   case you want to 'play' with it in other cell. If you don't define an
   output the ``div`` will have an ``id`` with the following format
   'brython-container-[random number between 0 and 999999]'. Just one
   container name is accepted. If you pass more than one only the first
   one will be used and a warning will raise.

-  -i, --input: you can pass variables defined in the Python namespace
   separated by whitespaces. If you pass a python list it will be
   converted to a brython list, a python tuple will be converted to a
   brython tuple, a python dict will be converted to a brython dict, a
   python string will be converted to a brython string.

-  -h, --html: you can pass a string with html markup code. This html
   code will be inserted inside the div container. In this way you can
   avoid the generation of HTML markup code via a Brython script so you
   can separate the layout from the 'action'. Just one html markup code
   string name is accepted. If you pass more than one only the first one
   will be used and a warning will raise.

-  -s, --script: Use this option to provide an id to the script defined
   in the Brython code cell. Also, this value could be used to run the
   code of this cell in other brython cells. Just one script name is
   accepted. If you pass more than one only the first one will be used
   and a warning will raise.

-  -S, --scripts: Use this option to run code previously defined in
   other Brython code cells. The values should be the provided values in
   the -s/--script option in other Brython code cells.

-  -f, --fiddle: With this option, the code in the cell will be
   automatically uploaded to
   `gist.github.com/ <https://gist.github.com/>`__ as an anonymous gist
   with several files in it. This files will be used to create an
   anonymous 'fiddle' on `jsfiddle.net <http://jsfiddle.net>`__.
   Finally, some links will be printed in the output linking to the gist
   and the fiddle. See an example here
   (https://gist.github.com/anonymous/b664e8b4617afc09db6c and
   http://jsfiddle.net/gh/gist/library/pure/b664e8b4617afc09db6c/)

-  -e, --embedfiddle: With this option, the code in the cell will be
   automatically uploaded to
   `gist.github.com/ <https://gist.github.com/>`__ as an anonymous gist
   with several files in it. This files will be used to create an
   anonymous 'fiddle' on `jsfiddle.net <http://jsfiddle.net>`__.
   Finally, some links will be printed in the output linking to the gist
   and the fiddle and an iframe will be created showing the fiddle on
   `jsfiddle.net <http://jsfiddle.net>`__.

`WARNING <#warning>`__ This options may change as the brythonmagic
depending the development of Brython and/or IPython/Jupyter.

To see some examples download the notebooks available in the repository
and run it locally or see it in the
`nbviewer <http://nbviewer.ipython.org/urls/raw.githubusercontent.com/kikocorreoso/brythonmagic/master/notebooks/Brython%20usage%20in%20the%20IPython%20notebook.ipynb?create=1>`__
(you will loose the interactivity if you choose the second option).
Also, you can take a look on the following video:
http://youtu.be/adQzjuUX0kw

Example notebooks
-----------------

-  `General usage of
   Brythonmagic <http://nbviewer.ipython.org/github/kikocorreoso/brythonmagic/blob/master/notebooks/Brython%20usage%20in%20the%20IPython%20notebook.ipynb>`__.

-  `An Openlayers
   tutorial <http://nbviewer.ipython.org/github/kikocorreoso/brythonmagic/blob/master/notebooks/OpenLayers%20(python)%20tutorial.ipynb>`__.

-  `A Highcharts
   tutorial <http://nbviewer.ipython.org/github/kikocorreoso/brythonmagic/blob/master/notebooks/Highcharts%20(python)%20tutorial.ipynb>`__

Support
-------

If you need Brython support, please, ask here:
https://groups.google.com/forum/?fromgroups=#!forum/brython

If you need IPython support, please, ask here:
http://mail.scipy.org/mailman/listinfo/ipython-dev

If you find a bug or want to propose a new feature open a new issue
here: https://github.com/kikocorreoso/brythonmagic/issues

If you want to improve the code, fork, commit and send a PR ;·D
