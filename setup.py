try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup
import io
from os import path

here = path.abspath(path.dirname(__file__))

# Get the long description from the relevant file
with io.open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

install_requires = [
    'notebook>=5.0.0',
]

setup(
    name='brythonmagic',
    version='0.3.0dev',
    description='Magics to use brython in Jupyter notebook.',
    long_description=long_description,
    url='https://github.com/kikocorreoso/brythonmagic',

    # Author details
    author='Kikocorreoso',
    author_email='',

    # Choose your license
    license='MIT',

    # See https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        'Topic :: Text Processing :: Markup :: HTML',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
    ],

    # What does your project relate to?
    keywords='brython jupyter notebook javascript browser',

    py_modules=['brythonmagic'],
    install_requires=install_requires,
)
