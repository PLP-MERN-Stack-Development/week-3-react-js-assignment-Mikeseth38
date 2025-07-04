import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Task Manager App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;