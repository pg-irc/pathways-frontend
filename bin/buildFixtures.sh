#!/bin/sh

if ls src/fixtures/newcomers_guide/tasks.ts 1> /dev/null 2>&1; then
    echo "bin/buildFixtures.sh: Using Newcomers Guide fixtures"
    cp bin/buildFixtures-newcomers-guide src/fixtures/buildFixtures.ts
else
    echo "bin/buildFixtures.sh: Using hard-coded fixtures"
    cp bin/buildFixtures-hard-coded src/fixtures/buildFixtures.ts
fi
