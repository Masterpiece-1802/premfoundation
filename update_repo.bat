@echo off
:: premfoundation Git Automation Script
:: Save this as update_repo.bat in your project root

title PremFoundation Git Updater
color 0A

echo #########################################
echo #   Updating premfoundation Repository   #
echo #########################################

:: Navigate to project root (change if needed)
cd /d "F:\premfoundation"

:: Step 1: Pull latest changes from GitHub
echo.
echo [1/4] Pulling latest changes from GitHub...
git pull origin main
if %errorlevel% neq 0 (
    echo ERROR: Pull failed!
    pause
    exit /b
)

:: Step 2: Show current changes
echo.
echo [2/4] Current changes:
git status

:: Step 3: Add all files
echo.
echo [3/4] Adding all changes...
git add --all
if %errorlevel% neq 0 (
    echo ERROR: Add failed!
    pause
    exit /b
)

:: Step 4: Commit with timestamp
echo.
echo [4/4] Committing changes...
set timestamp=%date% %time%
git commit -m "Auto-update: %timestamp%"

:: Step 5: Push to GitHub
echo.
echo [5/5] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Push failed!
    pause
    exit /b
)

echo.
echo SUCCESS: Repository updated!
echo Files processed:
dir /b /s index.html css\*.css js\*.js images\*.*
pause