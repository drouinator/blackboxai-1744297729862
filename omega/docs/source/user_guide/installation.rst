Installation Guide
=================

System Requirements
------------------

* Python 3.8 or higher
* 4GB RAM or more
* 10GB free disk space
* Network connectivity
* Compatible with: macOS, Linux, Windows 10+

Basic Installation
----------------

1. Clone the Omega repository:

   .. code-block:: bash

      git clone https://github.com/louis-etiennedrouin/omega.git
      cd omega

2. Create a virtual environment:

   .. code-block:: bash

      python -m venv .venv
      source .venv/bin/activate  # On Windows: .venv\Scripts\activate

3. Install the required dependencies:

   .. code-block:: bash

      pip install -r requirements.txt

4. Verify the installation:

   .. code-block:: bash

      python -m omega.verify

Advanced Setup
------------

Network Configuration
^^^^^^^^^^^^^^^^^^^^

Configure your network to support the Omega project's cross-device communication:

.. code-block:: bash

   # Example network configuration for dedicated subnet
   sudo ip addr add 192.168.40.1/24 dev eth0

Device Registration
^^^^^^^^^^^^^^^^^^^^^^^^

Register additional devices with the Omega network:

1. On each device, install the Omega agent:

   .. code-block:: bash

      wget https://omega-project.org/download/agent.sh
      chmod +x agent.sh
      ./agent.sh install

2. Register the device with the main Omega server:

   .. code-block:: bash

      omega-agent register --server 192.168.40.1 --name "DeviceName"

Troubleshooting
--------------

Common Issues
^^^^^^^^^^^^

* **Network Connectivity Problems**: Ensure all devices are on the same subnet (192.168.40.x).
* **Missing Dependencies**: Run `pip install -r requirements.txt` again to ensure all dependencies are installed.
* **Permission Errors**: Some features require admin/root privileges. Use sudo when necessary.

Getting Help
^^^^^^^^^^^

If you encounter issues not covered in this guide:

* Check our `GitHub Issues <https://github.com/louis-etiennedrouin/omega/issues>`_
* Join our community on Discord: https://discord.gg/omega-project
* Email support: support@omega-project.org

