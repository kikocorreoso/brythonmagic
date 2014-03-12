# -*- coding: utf-8 -*-
"""
===========
brythonmagic
===========

Magics for interacting with JS and the DOM via brython.

.. note::

The ``brython`` javascript scripts need to be installed separately and
can be obtained from https://bitbucket.org/olemis/brython/overview

You only need brython.js and py_VFS.js or brython_dist.js to located in
[IPYTHON_DIR]/static/custom/brython

Usage
=====

To enable the magics below, execute ``%load_ext brythonmagic``.

``%brython``

{BRYTHON_DOC}

"""

#-----------------------------------------------------------------------------
# Copyright (C) 2014 Kiko Correoso and the Brython team
#
# Distributed under the terms of the MIT License. The full license is in
# the file LICENSE, distributed as part of this software.
#-----------------------------------------------------------------------------

import json
from random import randint

from IPython.core.magic import (Magics, magics_class, 
                                line_cell_magic, needs_local_scope)
from IPython.testing.skipdoctest import skip_doctest
from IPython.core.magic_arguments import (argument, magic_arguments, 
                                          parse_argstring)
from IPython.utils.py3compat import unicode_to_str
from IPython.utils.text import dedent
from IPython.display import display, HTML

class BrythonMagicError(Exception):
    pass

@magics_class
class BrythonMagics(Magics):
    """
A set of magics useful for interactive work with the DOM API and
javascript using Brython.

"""
    
    def __init__(self, shell):
        """
Parameters
----------
shell : IPython shell

"""
        super(BrythonMagics, self).__init__(shell)
        
    @skip_doctest
    @magic_arguments()
    @argument(
        '-i', '--input', action='append',
        help='Names of input variables to be pushed to be available by the Brython script'
             'Multiple variables are accepted and can be passed, separated by commas with no whitespace.'
             'Lists, Tuples, Dicts and Strings are converted to the same type in Brython.'
        )
    @argument(
        '-c', '--container', action='append',
        help='Name of html DIV container to be used to show the Brython output.'
             'Only one name is accepted.'
        )
    @argument(
        '-l', '--libs', action='append',
        help='url of javascript libraries you want to include in your brython script.'
             'Urls are separated by comma.'
        )
    @argument(
        '-p', '--print', action='store_true',
        help='If selected, the generated HTML code will be shown'
             'Arguments are not accepted'
        )
    
    #@needs_local_scope
    @argument(
        'code',
        nargs='*',
        )
    @line_cell_magic
    def brython(self, line, cell=None, local_ns=None):
        '''
Execute code in Brython, and show the results in a DIV container
if necessary::

As a cell, this will run a block of Brython code, returning results
in a DIV if defined::

In [10]: %%brython -c 'output_123'
....: from browser import doc, html
....: doc['output_123'] <= html.P('Hello World!!')

[You will see <div id="output_123"><p>Hello World!!</p></div> as output]

Objects can be passed back from IPython to Brython via the -i flag in line::

In [1]: Z = [1, 4, 5, 10]

In [2]: %%brython -i Z 
....: print(Z)

[You will see the list printed in the browser console]

'''
        args = parse_argstring(self.brython, line)
        
        params = {'input': {}}
        script_id = str(randint(0,999999))

        # arguments 'code' in line are prepended to the cell lines
        if cell is None:
            code = ''
            return_output = True
        else:
            code = cell
            return_output = False

        code = ' '.join(args.code) + code
        
        if args.input:
            for input in ','.join(args.input).split(','):
                input = unicode_to_str(input)
                try:
                    if isinstance(input, (list, tuple, dict, str)):
                        try:
                            if isinstance(params['input'][input], tuple):
                                val = 'tuple(' + json.dumps(params['input'][input]) + ')'
                            else:
                                val = json.dumps(params['input'][input])
                        except KeyError:
                            if isinstance(self.shell.user_ns[input], tuple):
                                val = 'tuple(' + json.dumps(self.shell.user_ns[input]) + ')'
                            else:
                                val = json.dumps(self.shell.user_ns[input])
                except ValueError:
                    print('{} not accepted'.format(input))
                    print("Only Python lists, tuples, dicts and strings are accepted")
                params['input'][input] = val

        if args.container is not None:
            try:
                val = unicode_to_str(args.container)[0]
                if isinstance(val, str):
                    params['container'] = val
            except ValueError:
                print('Only a string is accepted')
        else:
            params['container'] = "brython_container_" + str(script_id)
        
        # we pass all the input variables to the brython script
        js_libs = ""
        if args.libs:
            js_libs += "<!-- third party js libs -->\n"
            js_libs += """<script type="text/javascript">\n"""
            for url in ','.join(args.libs).split(','):
                #js_libs += """<script type="text/javascript" src="{}"></script>\n""".format(url)
                js_libs += """$.getScript("{}")\n""".format(url)
            js_libs += "</script>\n"
            js_libs += "<!-- End of 3rd party js libs -->\n"

        pre_call = """
<script id="{}" type="text/python">
## Variables defined in the IPython namespace
""".format(script_id)
        for key in params['input'].keys():
            pre_call += "{0} = {1}\n".format(key, params['input'][key])
        pre_call += "## End of variables defined in the IPython namespace\n\n"
        
        options = "{debug:1, py_id:'" + script_id + "'}"
        post_call ="""
</script>
<script type="text/javascript">brython({0});</script>
<div id="{1}"></div>
""".format(options, str(params['container']))

        code = ''.join((js_libs, pre_call, code, post_call))
        try:
            display(HTML(code))
            if args.print:
                print(code)
        except:
            print("Something went wrong.")
            print("Please, see your browser javascript console for more details.")

__doc__ = __doc__.format(
    BRYTHON_DOC = dedent(BrythonMagics.brython.__doc__)
    )


def load_ipython_extension(ip):
    """Load the extension in IPython."""
    ip.register_magics(BrythonMagics)
