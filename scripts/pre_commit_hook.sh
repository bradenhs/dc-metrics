echo "Formatting Staged Files..."
git diff --staged --diff-filter=dx --name-only HEAD | grep "^src\/.*[.]tsx\?$" | xargs -I % sh -c 'prettier --write --no-semi --single-quote --jsx-single-quote --space-before-function-paren %; git add %'
printf "Done\n"