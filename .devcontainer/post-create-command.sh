HAS_GIT_PATH="/workspace/.git/"
if ! [ -d "$HAS_GIT_PATH" ]; then
  git init
fi

git config --global user.name "Lorran Aguiar" 
git config --global user.email "lorransouzaaguiar2010@gmail.com" 
git config --global alias.s "!git status -s" 
git config --global alias.c "!git commit"
git config --global alias.l "!git log --pretty=format:'%C(blue)%h %C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'"
yarn add commitizen -g && yarn add husky@4 -g && yarn


 