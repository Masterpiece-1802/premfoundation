@echo off
:: Initialize Empty GitHub Repo Batch File
:: Save as 'init_repo.bat' in F:\premfoundation

title PremFoundation Initial Setup
color 0A

echo #########################################
echo #   Initializing premfoundation Repo     #
echo #########################################

:: Navigate to project folder
cd /d "F:\premfoundation"

:: Step 1: Initialize Git
echo.
echo [1/6] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git initialization failed!
    pause
    exit /b
)

:: Step 2: Create basic structure (if not exists)
echo.
echo [2/6] Creating folder structure...
mkdir css 2>nul
mkdir js 2>nul
mkdir images 2>nul

:: Step 3: Create empty files (if not exists)
echo.
echo [3/6] Creating base files...
type nul > index.html 2>nul
type nul > css\style.css 2>nul
type nul > js\main.js 2>nul

:: Step 4: Add remote origin
echo.
echo [4/6] Connecting to GitHub...
git remote add origin https://github.com/Masterpiece-1802/premfoundation.git
if %errorlevel% neq 0 (
    echo ERROR: Remote setup failed!
    pause
    exit /b
)

:: Step 5: Stage and commit initial files
echo.
echo [5/6] Committing initial structure...
git add .
git commit -m "Initial project structure"

:: Step 6: Push to GitHub
echo.
echo [6/6] Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Push failed! Did you create the repo on GitHub?
    echo Create it at: https://github.com/new
    pause
    exit /b
)

echo.
echo SUCCESS! Your repo is now initialized with:
dir /b /s

echo.
echo GitHub URL: https://github.com/Masterpiece-1802/premfoundation
pause