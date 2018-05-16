$okTick = @{
    Object = [Char]8730
    ForegroundColor = 'Green'
}

$failCross = @{
    Object = [Char]10060
    ForegroundColor = 'Red'
}

$targetPath = "../blazorbits.github.io"

Write-Host "Checking target path [$targetPath] exists..." -NoNewline
if (-not (Test-Path $targetPath)) { 
    Write-Host @failCross
    Write-Error "Path [$targetPath] does not exist."
    exit 1;
}
Write-Host @okTick

dotnet publish BlazorBits.Website/BlazorBits.Website.csproj -c release

Write-Host "Copying files to [$targetPath]..." -NoNewline

$sourcePath = "BlazorBits.Website\bin\release\netstandard2.0\publish\BlazorBits.Website\dist"
Copy-Item "$sourcePath\*" -Destination $targetPath -Recurse -Force

Write-Host @okTick

$version = Get-ChildItem "$sourcePath\_framework\_bin\BlazorBits.Website.dll" | select-object -ExpandProperty VersionInfo |Select-Object ProductVersion | Select-Object -ExpandProperty ProductVersion

# Go to the target path
Push-Location $targetPath

git pull
git status
git commit -a -m "Updated website to version $version"
git push

# Go back to where we were
Pop-Location