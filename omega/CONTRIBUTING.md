# Contributing to Omega

Thank you for your interest in contributing to the Omega project! This document provides guidelines and standards to follow when contributing to this repository.

## Code Style and Standards

### Python
- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use 4 spaces for indentation (no tabs)
- Maximum line length of 88 characters
- Use type hints where appropriate
- Document functions, classes, and modules with docstrings

### JavaScript/TypeScript
- Use ESLint with the project's `.eslintrc` configuration
- Use 2 spaces for indentation
- Prefer arrow functions when appropriate
- Use const/let instead of var
- Use semicolons consistently

### Shell Scripts
- Use 2 spaces for indentation
- Include a shebang line (e.g., `#!/bin/bash`)
- Add comments for non-obvious code
- Use meaningful variable names

## Branch Naming Conventions

Branches should follow this naming format:
```
<type>/<issue-number>-<short-description>
```

Where `<type>` is one of:
- `feature`: New features or enhancements
- `bugfix`: Bug fixes
- `hotfix`: Critical fixes for production
- `docs`: Documentation changes only
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or improving tests
- `chore`: Maintenance tasks, dependencies, etc.

Examples:
- `feature/42-add-camera-integration`
- `bugfix/78-fix-memory-leak`
- `docs/23-update-readme`

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to build process, dependencies, etc.

Example:
```
feat(camera): add support for Foil Coach integration

This adds the necessary classes to interface with Foil Coach cameras.

Closes #42
```

## Pull Request Process

1. **Create an Issue**: Before starting work, create an issue describing the bug or feature.
2. **Fork and Branch**: Create a branch following the naming convention above.
3. **Development**:
   - Write code according to the style guidelines
   - Include tests for new functionality
   - Ensure all existing tests pass
   - Update documentation as needed
4. **Pull Request**:
   - Fill out the PR template completely
   - Link to related issues
   - Request at least one reviewer
   - Ensure CI checks pass
5. **Review Process**:
   - Address all review comments
   - Rebase or merge with main if needed
   - Maintain a clean commit history
6. **Merging**:
   - Wait for approval from at least one maintainer
   - Ensure all CI checks pass
   - Use "Squash and merge" for feature/bugfix branches
   - Use "Merge commit" for larger, complex changes

## Testing Requirements

1. **Unit Tests**:
   - All new functionality must have unit tests
   - Use pytest for Python code
   - Use Jest for JavaScript/TypeScript
   - Aim for at least 80% code coverage

2. **Integration Tests**:
   - Add integration tests for APIs and system interfaces
   - Tests should verify end-to-end functionality

3. **Test Environment**:
   - Tests should be runnable locally
   - Avoid dependencies on specific hardware when possible
   - Use mocks for external services when appropriate

4. **Running Tests**:
   - Run `pytest` for Python tests
   - Run `npm test` for JavaScript tests
   - All tests must pass before submitting a PR

## Code Review Guidelines

When reviewing code, focus on:
- Functionality: Does the code work as expected?
- Architecture: Is the design appropriate?
- Style: Does the code follow our style guidelines?
- Tests: Are there sufficient tests for the changes?
- Security: Are there any security concerns?
- Performance: Will the code perform well at scale?
- Documentation: Is the code well-documented?

## Questions?

If you have any questions about contributing, please reach out to the project maintainers or open an issue for clarification.

