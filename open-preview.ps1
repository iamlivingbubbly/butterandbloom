$port = 8317
$listening = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $listening) {
  Start-Process -FilePath "node" -ArgumentList "preview-server.js" -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
  Start-Sleep -Seconds 2
}

$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe" }
if (Test-Path $edge) {
  Start-Process -FilePath $edge -ArgumentList "--app=http://localhost:$port", "--window-size=1360,880"
} else {
  Start-Process "http://localhost:$port"
}