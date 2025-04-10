API Reference
============

This section provides detailed API documentation for the Omega project modules and components.

Core Modules
-----------

.. toctree::
   :maxdepth: 2
   
   core/config
   core/utils
   core/data_models

AI Components
-----------

.. toctree::
   :maxdepth: 2
   
   ai/agent
   ai/models
   ai/training

Camera Integration
----------------

.. toctree::
   :maxdepth: 2
   
   camera/feed
   camera/recording
   camera/processing

Entertainment System
-----------------

.. toctree::
   :maxdepth: 2
   
   gaming/retroarch
   gaming/controller
   gaming/library

Web Dashboard
-----------

.. toctree::
   :maxdepth: 2
   
   dashboard/views
   dashboard/templates
   dashboard/api

Using the API
-----------

Code Examples
^^^^^^^^^^^

Configuring the System
"""""""""""""""""""""

.. code-block:: python

   from omega.core import config
   
   # Load configuration
   cfg = config.load_config('/path/to/config.yaml')
   
   # Update a setting
   cfg.update_setting('network.subnet', '192.168.40.0/24')
   
   # Save configuration
   cfg.save()

Working with Cameras
"""""""""""""""""""

.. code-block:: python

   from omega.camera import feed
   
   # Connect to a camera
   cam = feed.connect('rtsp://192.168.40.20:8080/live')
   
   # Start recording
   rec = cam.start_recording('/path/to/save/video.mp4')
   
   # Process frames
   for frame in cam.get_frames():
       processed = feed.apply_filter(frame, 'enhance')
       # Do something with the processed frame
   
   # Stop recording
   rec.stop()

AI Processing
""""""""""""

.. code-block:: python

   from omega.ai import agent
   
   # Initialize AI agent
   ai = agent.Agent(model='omega_v1')
   
   # Process data
   result = ai.process_data(my_data)
   
   # Get recommendations
   recommendations = ai.get_recommendations(context)

API Status Codes
^^^^^^^^^^^^^^

Common status codes returned by the API:

* **200**: Success
* **400**: Bad request or invalid parameters
* **401**: Authentication required
* **403**: Permission denied
* **404**: Resource not found
* **500**: Server error

Authentication
^^^^^^^^^^^^

Most API endpoints require authentication:

.. code-block:: python

   import requests
   
   # Get auth token
   auth_response = requests.post(
       'https://api.omega-project.org/auth',
       json={'username': 'user', 'password': 'pass'}
   )
   token = auth_response.json()['token']
   
   # Use token in requests
   headers = {'Authorization': f'Bearer {token}'}
   response = requests.get(
       'https://api.omega-project.org/cameras',
       headers=headers
   )

