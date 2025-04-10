Contributing to Omega
====================

Thank you for your interest in contributing to the Omega project! This guide will help you get started as a contributor.

Code of Conduct
--------------

Everyone participating in the Omega project is expected to treat other people with respect and follow our guidelines:

* Be kind and courteous to others
* Respect different viewpoints and experiences
* Give and gracefully accept constructive feedback
* Focus on what's best for the community

Development Setup
---------------

Prerequisites
^^^^^^^^^^^

* Git
* Python 3.8+
* Virtual environment tool (venv, conda, etc.)
* Development tools (specified in requirements-dev.txt)

Setting Up Your Development Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Fork the repository on GitHub
2. Clone your fork locally:

   .. code-block:: bash

      git clone https://github.com/YOUR-USERNAME/omega.git
      cd omega

3. Set up the development environment:

   .. code-block:: bash

      python -m venv .venv
      source .venv/bin/activate  # On Windows: .venv\Scripts\activate
      pip install -r requirements.txt -r requirements-dev.txt
      pre-commit install

Coding Standards
--------------

We follow these standards for code quality:

* **Python**: PEP 8 style guide
* **Documentation**: Google-style docstrings
* **Commit Messages**: Conventional Commits specification
* **Testing**: All code should include appropriate tests

Code Style and Formatting
^^^^^^^^^^^^^^^^^^^^^^^

We use the following tools to maintain code quality:

* **Black**: Code formatting
* **isort**: Import sorting
* **flake8**: Style guide enforcement
* **pylint**: Code analysis
* **mypy**: Type checking

These checks run automatically when you commit using pre-commit hooks.

Git Workflow
----------

Branch Naming Conventions
^^^^^^^^^^^^^^^^^^^^^^^

Use the following format for branch names:

* Feature: ``feature/short-description``
* Bug fix: ``fix/issue-description``
* Documentation: ``docs/what-is-changing``
* Performance: ``perf/what-is-improving``

Commit Message Format
^^^^^^^^^^^^^^^^^^^

Follow the Conventional Commits specification:

.. code-block:: text

   <type>[optional scope]: <description>

   [optional body]

   [optional footer(s)]

Examples:

* ``feat: add camera integration module``
* ``fix(dashboard): correct display issue with camera feeds``
* ``docs: update installation instructions``

Pull Request Process
^^^^^^^^^^^^^^^^^

1. Update the documentation to reflect any changes.
2. Ensure your code passes all CI checks.
3. The PR should focus on a single feature or fix.
4. Get at least one code review from a maintainer.
5. Once approved, a maintainer will merge your PR.

Testing
------

Running Tests
^^^^^^^^^^^

Run the test suite using pytest:

.. code-block:: bash

   python -m pytest

For coverage information:

.. code-block:: bash

   python -m pytest --cov=omega

Writing Tests
^^^^^^^^^^^

* All new features should have tests
* Aim for at least 80% code coverage
* Include both unit and integration tests when appropriate

Documentation
-----------

Building Documentation
^^^^^^^^^^^^^^^^^^^^

Build the documentation locally:

.. code-block:: bash

   cd docs
   make html

The generated documentation will be in ``docs/build/html/``.

Writing Documentation
^^^^^^^^^^^^^^^^^^^

* Use reStructuredText (RST) format
* Include code examples where appropriate
* Keep API documentation up-to-date with code changes
* Follow our style guide for consistency

Contact Information
-----------------

* GitHub Issues: https://github.com/louis-etiennedrouin/omega/issues
* Development Chat: https://discord.gg/omega-dev
* Email: dev@omega-project.org

Thank you for contributing to Omega!

