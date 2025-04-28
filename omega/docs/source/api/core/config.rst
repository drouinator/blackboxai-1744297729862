=============
Configuration
=============

Overview
========

The configuration module provides utilities for loading, validating, and accessing
configuration settings throughout the Omega application.

.. contents:: Contents
   :local:
   :depth: 2

Core Configuration API
=====================

.. automodule:: omega.core.config
   :members:
   :undoc-members:
   :show-inheritance:

Configuration Schema
===================

The configuration schema defines the structure and validation rules for Omega configuration files.

.. code-block:: python

   # Example configuration schema
   schema = {
       "app": {
           "name": str,
           "version": str,
           "debug": bool
       },
       "database": {
           "host": str,
           "port": int,
           "username": str,
           "password": str
       }
   }

Usage Examples
=============

Loading Configuration
--------------------

.. code-block:: python

   from omega.core.config import load_config
   
   # Load configuration from default location
   config = load_config()
   
   # Load configuration from specific file
   config = load_config('/path/to/config.yaml')
   
   # Access configuration values
   debug_mode = config.app.debug
   db_host = config.database.host

Environment Variables
--------------------

Configuration values can be overridden using environment variables:

.. code-block:: bash

   # Override database host
   export OMEGA_DATABASE_HOST=localhost
   
   # Override debug mode
   export OMEGA_APP_DEBUG=true

