# Contributing to Leftover Love

Thank you for your interest in contributing to Leftover Love! We welcome contributions from the community and appreciate your help in making this project better.

## 🤝 How to Contribute

### 1. Fork the Repository
- Fork the project on GitHub
- Clone your fork locally:
  ```bash
  git clone https://github.com/yourusername/leftover-love.git
  cd leftover-love
  ```

### 2. Set Up Development Environment
- Follow the setup instructions in [README.md](README.md)
- Make sure both backend and frontend are running correctly
- Run the tests to ensure everything is working

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Write clean, readable code
- Follow the existing code style and conventions
- Add comments and documentation where needed
- Write tests for new functionality

### 5. Test Your Changes
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend/nowastewebapp
npm test
```

### 6. Commit Your Changes
- Use clear, descriptive commit messages
- Follow conventional commit format:
  ```
  feat: add user profile picture upload
  fix: resolve authentication token expiry issue
  docs: update API documentation
  style: improve responsive design on mobile
  ```

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
- Create a pull request with a clear title and description
- Link any related issues
- Add screenshots if applicable

## 📋 Development Guidelines

### Code Style
- **Backend (Python)**: Follow PEP 8 guidelines
- **Frontend (JavaScript/React)**: Use ESLint and Prettier configurations
- Use meaningful variable and function names
- Keep functions small and focused
- Add docstrings to functions and classes

### Commit Guidelines
- Make atomic commits (one logical change per commit)
- Write clear commit messages in present tense
- Reference issue numbers when applicable

### Documentation
- Update README.md if needed
- Add comments for complex logic
- Update API documentation for new endpoints
- Include JSDoc comments for React components

## 🐛 Bug Reports

When filing a bug report, please include:
- Operating system and version
- Node.js and Python versions
- Browser and version (for frontend issues)
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Error messages or console logs

## 💡 Feature Requests

For feature requests, please:
- Check if the feature already exists
- Describe the problem you're trying to solve
- Explain how the feature would work
- Consider backward compatibility
- Provide mockups or examples if helpful

## 🏗️ Project Structure

```
leftover-love/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── schemas/        # Pydantic schemas
│   │   └── ...
│   ├── tests/              # Backend tests
│   └── ...
├── frontend/               # Next.js frontend
│   └── nowastewebapp/
│       ├── src/
│       │   ├── app/        # App Router pages
│       │   ├── components/ # React components
│       │   └── ...
│       └── ...
└── docs/                   # Additional documentation
```

## 🧪 Testing

### Backend Testing
- Use pytest for testing
- Write unit tests for models and services
- Add integration tests for API endpoints
- Aim for good test coverage

### Frontend Testing
- Use Jest and React Testing Library
- Test components and user interactions
- Add end-to-end tests for critical flows

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

## 🆘 Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Issues with "question" label
- Review the README.md for setup instructions

## 📄 Code of Conduct

Please be respectful and inclusive in all interactions. We want this to be a welcoming community for everyone.

---

Thank you for contributing to Leftover Love! Together, we're turning waste into warmth and surplus into smiles! 🌟
