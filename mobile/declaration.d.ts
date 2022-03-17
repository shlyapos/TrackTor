declare module '*.module.css' {
    const content: IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps> & Readonly<{ children?: ReactNode; }>;
    export default content;
}