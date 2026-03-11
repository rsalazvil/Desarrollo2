// manual mock for react-router-dom to simplify tests
const React = require('react');

module.exports = {
  __esModule: true,
  Routes: ({ children }) => React.createElement(React.Fragment, null, children),
  Route: () => null,
  Navigate: () => null,
  useNavigate: () => jest.fn(),
};
