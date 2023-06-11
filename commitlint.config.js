module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2, // Level  0 disable、1 warning、2 error
            'always', // always|never
            ['upd', 'feat', 'fix',  'docs','style',  'refactor', 'perf', 'test',  'build', 'ci', 'chore','revert',]
        ]
    }
}