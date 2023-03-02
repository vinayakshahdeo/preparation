const reactRules = {
	// One JSX Element Per Line
	// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
	'react/jsx-one-expression-per-line': 'off',
	// only .jsx files may have JSX
	// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
	'react/jsx-filename-extension': 'off',
	'react/jsx-props-no-spreading': 'off',
	// trailing comma rule
	// https://eslint.org/docs/rules/comma-dangle
	'comma-dangle': ['error', 'never'],
	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
	'react/function-component-definition': [
		2,
		{
			namedComponents: 'arrow-function',
			unnamedComponents: 'arrow-function',
		},
	],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
	'react/button-has-type': 'off',
	'react/jsx-no-script-url': 'off',
	'jsx-a11y/anchor-is-valid': 'off',
	'jsx-a11y/no-noninteractive-element-interactions': 'off',
	'react/no-array-index-key': 'off',
	'react/prop-types': 'off',
	'react/destructuring-assignment': 'off',
	'jsx-a11y/click-events-have-key-events': 'off',
	'jsx-a11y/no-static-element-interactions': 'off',
	'react/react-in-jsx-scope': 'off',
};

const importRules = {
	// Ensure consistent use of file extension within the import path
	// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
	'import/extensions': 'off',
	// https://typescript-eslint.io/rules/no-var-requires/
	'@typescript-eslint/no-var-requires': 'off',
	'unused-imports/no-unused-imports': 'error',
};

const miscRules = {
	'max-len': ['off', { code: 120 }],
	indent: ['off'],
	'no-underscore-dangle': 'off',
	'object-curly-newline': ['error', { multiline: true }],
	'consistent-return': 'off',
	'default-param-last': 'off',
	'prefer-promise-reject-errors': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
	'no-shadow': 'off',
	'linebreak-style': 0,
	'no-plusplus': 'off',
	'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
	'react/jsx-wrap-multilines': [
		'error',
		{ arrow: 'parens', declaration: 'parens', return: true },
	],
	'no-param-reassign': ['error', { props: false }],
	'import/prefer-default-export': 'off',
	'class-methods-use-this': 'off',
	'no-nested-ternary': 'off',
	'no-unsafe-optional-chaining': 'warn',
	'react/jsx-no-bind': 'off',
	'no-console': ['warn', { allow: ['warn', 'error'] }],
	'@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
};

module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'unused-imports'],
	rules: {
		strict: 'error',
		...reactRules,
		...importRules,
		...miscRules,
	},
	settings: { 'import/resolver': { typescript: {} } },
};
