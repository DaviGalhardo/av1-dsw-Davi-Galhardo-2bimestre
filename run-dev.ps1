$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $root 'backend'
$frontendPath = Join-Path $root 'frontend'

function Start-NpmProcess {
  param(
    [Parameter(Mandatory = $true)]
    [string]$WorkingDirectory,

    [Parameter(Mandatory = $true)]
    [string]$Arguments
  )

  Start-Process -FilePath 'npm.cmd' -ArgumentList $Arguments -WorkingDirectory $WorkingDirectory
}

Start-NpmProcess -WorkingDirectory $backendPath -Arguments 'run dev'
Start-NpmProcess -WorkingDirectory $frontendPath -Arguments 'run dev'

Write-Host 'Backend:  http://localhost:3000'
Write-Host 'Frontend: http://127.0.0.1:5173'