# Contributing to Airline Booking System

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow best practices

## 📋 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/airline.git
   cd airline
   ```
3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Anmol2046S/airline.git
   ```

## 🔄 Development Workflow

### Creating a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### Making Changes
- Make focused, logical commits
- Write clear commit messages
- Keep commits atomic (one feature per commit)

### Commit Message Format
```
feat: Add new feature description
fix: Fix bug description
docs: Update documentation
style: Format code
refactor: Refactor code structure
test: Add or update tests
```

### Testing Your Changes
- Test locally before pushing
- Verify database functionality
- Check responsive design on mobile
- Validate form submissions

## 📤 Submitting Changes

### Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### Create a Pull Request
1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill in the PR template with:
   - Description of changes
   - Related issues (if any)
   - Testing performed
   - Screenshots (if UI changes)

## ✅ PR Review Checklist

Before submitting, ensure:
- [ ] Code follows project style
- [ ] Changes are tested
- [ ] Documentation is updated
- [ ] No breaking changes
- [ ] Commit messages are clear
- [ ] No sensitive data is exposed

## 🐛 Reporting Bugs

### Before Submitting
- Check existing issues to avoid duplicates
- Test on latest version
- Gather relevant information

### Issue Template
```
**Describe the bug**
Clear description of what went wrong

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error...

**Expected Behavior**
What should have happened

**Actual Behavior**
What actually happened

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome]
- PHP Version: [e.g. 7.4]
- MySQL Version: [e.g. 5.7]

**Screenshots/Logs**
If applicable, add error logs or screenshots
```

## 🎯 Feature Requests

### Submitting Ideas
1. Describe the feature clearly
2. Explain the use case
3. Provide examples or mockups
4. Check if similar features exist

## 📚 Documentation

When contributing:
- Update README if adding features
- Add inline code comments for complex logic
- Update API documentation if modifying endpoints
- Add setup instructions if dependencies change

## 🎨 Code Style Guidelines

### PHP
```php
// Use PSR-12 coding standards
class FlightBooking {
    public function bookFlight($flightId, $passengers) {
        // Implementation
    }
}
```

### JavaScript
```javascript
// Use camelCase for variables and functions
const bookingForm = document.getElementById('booking-form');
function processBooking(data) {
    // Implementation
}
```

### HTML/CSS
```html
<!-- Use semantic HTML -->
<section class="flight-booking">
    <form id="booking-form">
        <!-- Form elements -->
    </form>
</section>
```

## 🚫 Things to Avoid

- Don't commit sensitive data (passwords, API keys)
- Don't make multiple unrelated changes in one PR
- Don't rewrite project history
- Don't use force push on shared branches
- Don't ignore failing tests

## 📞 Getting Help

- Check existing issues and discussions
- Read the documentation
- Ask in pull request comments
- Create a discussion for questions

## 📝 Commit Message Examples

```
feat: Add flight search functionality

fix: Correct booking date validation

docs: Add database setup instructions

style: Format PHP code according to PSR-12

refactor: Extract database queries to separate class

test: Add tests for flight booking API
```

## 🎉 Recognition

All contributors will be:
- Listed in the CONTRIBUTORS file
- Credited in release notes
- Thanked in project README

---

**Thank you for contributing to make this project better! 🚀**