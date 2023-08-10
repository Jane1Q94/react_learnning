### props with children
- using `react.FC`
```typescript
const Parent: React.FC<{text: string}> = ({children, ...props}) 
```
- using `React.propsWithChildren`
```typescript
const Parent: React.propsWithChildren<{text: string}>
```
- define the children prop manualyy
```typescript
type ColumnProps = {
    text: string;
    children?: React.ReactNode
}
```
### type intersection
```typescript
type ColumnProps = {
    text: string
} & {
    children?: React.ReactNode
}
``` 
is same as 
```typescript
type ColumnProps = {
    text: string;
    children?: React.ReactNode
}
```

### type union
```typescript
type action = {type: "increment"} | {type: "decrement" }
```