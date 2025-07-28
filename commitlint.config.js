module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // new feature
        'fix',      // bug fix
        'docs',     // documentation
        'style',    // formatting, missing semi-colons, etc
        'refactor', // code change that neither fixes a bug nor adds a feature
        'perf',     // performance improvement
        'test',     // adding tests
        'chore',    // updating build tasks, package manager configs, etc
        'ci',       // continuous integration
        'build',    // build system or external dependencies
        'revert',   // revert a previous commit
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
}; 