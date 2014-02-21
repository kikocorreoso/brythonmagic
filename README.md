brythonmagic
============

Brython magic for the IPython notebook.

The brythonmagic extension has been tested on:

* IPython versions (1, 2, 0, '') and (1, 1, 0, '')

* Python version 3.3.1

* Brython version [2,0,0,'final',2]

Installation
============

Brython version used is [2,0,0,'final',2].

To use a working Brython version you should download the following files:

* https://raw.github.com/kikocorreoso/brythonmagic/master/brython/brython.js
* https://raw.github.com/kikocorreoso/brythonmagic/master/brython/py_VFS.js

to the brython folder.

First, you should create the 'brython' folder in the 'static/custom/' folder located on:

    import IPython
    
    IPython.utils.path.locate_profile() # + '/static/custom/brython'

Once the brython javascript files are in the correct place we should install and load the extension:

    %install_ext https://raw.github.com/kikocorreoso/brythonmagic/master/brythonmagic.py

    %load_ext brythonmagic
    
Once all is in the correct place we could just load the brython javascript using the following code:

    %%HTML

    <script type="text/javascript" src="http://127.0.0.1:8888/static/custom/brython/brython.js"></script>

    <script type="text/javascript" src="http://127.0.0.1:8888/static/custom/brython/py_VFS.js"></script>

Or use the link below to load the brython javascript in all your sessions:

http://nbviewer.ipython.org/github/ipython/ipython-in-depth/blob/master/notebooks/05%20-%20Notebook%20and%20javascript%20extension.ipynb#custom.js

Usage
=====

The brythonmagic provides you a cell magic, `%%brython`, to run brython code on show the results in a html `div` tag below the code cell.

You can use several options:

* -p, --print: will show you the generated html code below the results obtained from the brython code.


* -o, --output: you can define de name of the `div` container in case you want to 'play' with it in other cell. If you don't define an output the `div` will have and `id` with the following format 'brython-container-[random number between 0 and 999999]'


* -i, --input: you can pass variables defined in the Python namespace separated by commas. If you pass a python list it will be converted to a brython list, a python tuple will be converted to a brython tuple, a python dict will be converted to a brython dict, a python string will be converted to a brython string.


* -l, --libs: you can include external javascript libraries so Brython could have access to their functionality. You can pass the url of several several libraries separated by commas.

To see some examples download the notebook available in the repository and run it locally or see it in the nbviewer (not all the examples will run if you choose the second option)

Support
=======

If you need Brython support, please, ask here: https://groups.google.com/forum/?fromgroups=#!forum/brython

If you need IPython support, please, ask here: http://mail.scipy.org/mailman/listinfo/ipython-dev

If you find a bug or want to propose a new feature open a new issue here: https://github.com/kikocorreoso/brythonmagic/issues

If you want to improve the code, fork, commit and PR ;.)
