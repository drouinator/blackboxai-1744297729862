Getting Started
===============

This guide will help you get up and running with the Omega project quickly.

Basic Usage
----------

Directory Structure
^^^^^^^^^^^^^^^^^^

After installation, you'll find the following directory structure:

.. code-block:: text

   Omega/
   ├── Code/                  # Source code and scripts
   │   ├── OmegaAI/           # AI components and models
   │   └── Scripts/           # Utility scripts
   ├── Cameras/               # Camera feed storage
   │   ├── foil_coach/        # Foil Coach camera feeds
   │   └── baby_monitor/      # Baby monitor feeds
   ├── Dashboards/            # Visualization dashboards
   ├── Games/                 # Gaming content
   │   ├── ROMs/              # Game ROMs
   │   ├── bios/              # BIOS files for emulators
   │   └── saves/             # Game save data
   └── Archives/              # Data archives

Running Your First Application
-----------------------------

The Omega Main Dashboard
^^^^^^^^^^^^^^^^^^^^^^^

To launch the main dashboard:

.. code-block:: bash

   cd ~/Omega/Code/omega
   python dashboard.py

This will start the web server on http://localhost:8080.

Configuring Camera Feeds
-----------------------

Accessing the Foil Coach Camera
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Connect the camera to your network
2. Configure the camera in the dashboard:

   .. code-block:: bash

      omega-config --add-camera foil --ip 192.168.40.20 --port 8080

3. Access the feed through the dashboard or directly:

   .. code-block:: bash

      vlc rtsp://192.168.40.20:8080/live

Setting Up Baby Monitor
^^^^^^^^^^^^^^^^^^^^^

1. Install the baby monitor app on your mobile device
2. Connect to the same network as your Omega system
3. In the app settings, enable "RTSP Streaming" and note the URL
4. Add the feed to your Omega system:

   .. code-block:: bash

      omega-config --add-camera babymonitor --url rtsp://192.168.40.21:8081/live

Entertainment System
------------------

Starting RetroArch
^^^^^^^^^^^^^^^^^

To launch the RetroArch gaming system:

.. code-block:: bash

   cd ~/Omega/Games
   ./launch_retroarch.sh

Loading Games
^^^^^^^^^^^

1. Navigate to "Load Content" in the RetroArch menu
2. Browse to `~/Omega/Games/ROMs/`
3. Select the game you want to play

Controller Configuration
^^^^^^^^^^^^^^^^^^^^^^

Configure your controller by:

1. Going to Settings → Input → Port 1 Controls
2. Select "Autoconfigure" if using a standard controller
3. For manual configuration, map each button as needed

Next Steps
---------

Now that you're familiar with the basics, consider exploring:

* :doc:`../dev_guide/contributing` to start developing for Omega
* Set up automations with the AI components
* Create custom dashboards for your specific needs

