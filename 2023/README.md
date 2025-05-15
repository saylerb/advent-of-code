# 2023

To use the go solution template:

copy the template
```
cp -r go-template day2
```

Rename the package name for the solution 
```
mv day2/solution day2/cubes
```

Edit the import in the `main.go` file to match the package name
```
sed -i "" -e 's/go-template\/solution/day2\/solution/g' day2/main.go
```

