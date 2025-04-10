===========
Utility API
===========

Overview
========

The utility module provides common helper functions and tools used throughout
the Omega application.

.. contents:: Contents
   :local:
   :depth: 2

Core Utilities
=============

.. automodule:: omega.core.utils
   :members:
   :undoc-members:
   :show-inheritance:

File Operations
==============

Functions for handling files and directories.

.. code-block:: python

   # Example file operations
   def ensure_directory(path):
       """Ensure directory exists, create if necessary."""
       pass
   
   def read_json_file(file_path):
       """Read and parse JSON file."""
       pass
   
   def write_json_file(file_path, data):
       """Write data to JSON file."""
       pass

String Manipulation
==================

Utilities for string processing and formatting.

.. code-block:: python

   # Example string utilities
   def slugify(text):
       """Convert text to slug format."""
       pass
   
   def truncate(text, max_length=100):
       """Truncate text to specified length."""
       pass

Date and Time Utilities
======================

Functions for handling date and time operations.

.. code-block:: python

   # Example date/time utilities
   def format_timestamp(timestamp, format="%Y-%m-%d %H:%M:%S"):
       """Format timestamp to string."""
       pass
   
   def parse_date_string(date_string, format="%Y-%m-%d"):
       """Parse date string to datetime object."""
       pass

Usage Examples
=============

.. code-block:: python

   from omega.core.utils import ensure_directory, read_json_file
   
   # Ensure data directory exists
   ensure_directory('/path/to/data')
   
   # Read configuration
   config = read_json_file('/path/to/config.json')

