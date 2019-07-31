Dim objShell
Set objShell = WScript.CreateObject( "WScript.Shell" )
objShell.Run("""C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe""")
Set objShell = Nothing



